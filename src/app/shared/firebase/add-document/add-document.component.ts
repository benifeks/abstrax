import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../auth.service';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-add-document',
  standalone: true,
  imports: [],
  templateUrl: './add-document.component.html',
  styleUrl: './add-document.component.scss',
})
export class AddDocumentComponent {
  firestoreService = inject(FirestoreService);
  authService = inject(AuthService);

  collectionName = signal('');
  name = signal('');

  // Публичные методы для Angular template
  handleCollectionInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.collectionName.set(input.value);
  }

  handleNameInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.name.set(input.value);
  }

  async addDocument() {
    const collection = this.collectionName();
    const name = this.name();
    const uid = this.authService.uid();

    if (!collection || !name || !uid) return;

    try {
      await this.firestoreService.addDocument(collection, {
        name,
        createdAt: new Date(),
      });
      this.collectionName.set('');
      this.name.set('');
      console.log('Document added ✅');
    } catch (err) {
      console.error('Error adding document ❌', err);
    }
  }
}
