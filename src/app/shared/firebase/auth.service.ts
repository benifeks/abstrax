import { Injectable, effect, inject, signal } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  User,
  authState,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';

export interface AppUser {
  uid: string;
  displayName?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  /** Сигнал Firebase user (только Google) */
  public firebaseUser = signal<User | null>(null);

  /** Сигнал AppUser (только Google) */
  public appUser = signal<AppUser | null>(null);

  /** Сигнал UID */
  public uid = signal<string | null>(null);

  /** Сигнал isAdmin */
  public isAdmin = signal(false);

  constructor() {
    // Подписка на смену состояния пользователя
    authState(this.auth).subscribe((user) => {
      this.firebaseUser.set(user);
      this.uid.set(user?.uid ?? null);

      if (user && !user.isAnonymous) {
        const appUser: AppUser = {
          uid: user.uid,
          displayName: user.displayName ?? undefined,
        };
        this.appUser.set(appUser);

        // добавляем пользователя в abstractUsers
        this.addToAbstractUsers(appUser).catch(console.error);
      } else {
        this.appUser.set(null);
      }
    });

    // эффект для проверки, является ли пользователь админом
    effect(() => {
      const user = this.appUser();
      if (!user) {
        this.isAdmin.set(false);
        return;
      }

      const ref = doc(this.firestore, 'admins', user.uid);
      getDoc(ref)
        .then((snap) => this.isAdmin.set(snap.exists()))
        .catch((err) => {
          console.error('Failed to check admin:', err);
          this.isAdmin.set(false);
        });
    });
  }

  /** Вход через Google */
  public async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(this.auth, provider);

    if (credential.user) {
      const appUser: AppUser = {
        uid: credential.user.uid,
        displayName: credential.user.displayName ?? undefined,
      };
      this.appUser.set(appUser);
      this.uid.set(credential.user.uid);
      await this.addToAbstractUsers(appUser);
    }
  }

  /** Выход */
  public async logout(): Promise<void> {
    await signOut(this.auth);
    this.appUser.set(null);
    this.uid.set(null);
    this.isAdmin.set(false);
  }

  /** Добавление пользователя в коллекцию abstractUsers */
  private async addToAbstractUsers(user: AppUser): Promise<void> {
    const ref = doc(collection(this.firestore, 'abstractUsers'), user.uid);
    await setDoc(
      ref,
      { uid: user.uid, displayName: user.displayName ?? null },
      { merge: true },
    );
  }
}
