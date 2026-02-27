import { computed, Injectable, signal } from '@angular/core';
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  User,
} from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = getAuth();
  private userSignal = signal<User | null>(null);

  constructor() {
    signInAnonymously(this.auth).catch((err) => console.error(err));
    onAuthStateChanged(this.auth, (user) => this.userSignal.set(user));
  }

  uid = computed(() => this.userSignal()?.uid ?? null);
}
