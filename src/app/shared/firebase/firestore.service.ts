import { Injectable } from '@angular/core';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  private db = getFirestore();

  async addDocument(collectionName: string, data: any) {
    const colRef = collection(this.db, collectionName);
    await addDoc(colRef, data);
  }
}
