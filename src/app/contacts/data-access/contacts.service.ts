import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Comercio, ComercioForm } from '../shared/interfaces/comercio.interface';

const PATH = 'contacts';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private _firestore = inject(Firestore);

  private _collection = collection(this._firestore, PATH);

  private currentDate: Date = new Date();

  getContacts() {
    return collectionData(this._collection, { idField: 'id' }) as Observable<
      Comercio[]
    >;
  }

  async getContact(id: string) {
    try {
      const snapshot = await getDoc(this.document(id));
      return snapshot.data() as Comercio;
    } catch (error) {
      //catch error
      return undefined;
    }
  }

  async searchContactByQuery(name: string) {
    const q = query(
      this._collection,
      where('fullName', '>=', name),
      where('fullName', '<=', name + '\uf8ff'),
    );
    const querySnapshot = await getDocs(q);
    let contacts: Comercio[] = [];
    querySnapshot.forEach((doc) => {
      contacts = [...contacts, { id: doc.id, ...doc.data() } as Comercio];
    });
    return contacts;
  }

  createContact(contact: ComercioForm) {
    this.currentDate= new Date();

    const year = this.currentDate.getFullYear(); // Año actual
    const day = this.padZero(this.currentDate.getDate());
    const month = this.padZero(this.currentDate.getMonth() + 1);
/*     const hours = this.currentDate.getHours();
    const minutes = this.currentDate.getMinutes();  */

    console.log('contact que llega ..',contact);
    let contactFormateado = {
      fullName: contact.fullName.toLowerCase(),
      ambiente: contact.ambiente.toLowerCase(),
      agenda: contact.agenda,
      description: contact.description,
      cretedAt:`${year}${month}${day}`,
      updatedAt:`${year}${month}${day}`
    };
    return addDoc(this._collection, contactFormateado);
  }

  updateContact(id: string, contact: ComercioForm) {
    this.currentDate= new Date();
    const year = this.currentDate.getFullYear(); // Año actual
    const day = this.padZero(this.currentDate.getDate());
    const month = this.padZero(this.currentDate.getMonth() + 1);
    const hours = this.currentDate.getHours();
    const minutes = this.currentDate.getMinutes();
    let contactFormateado = {
      fullName: contact.fullName.toLowerCase(),
      ambiente: contact.ambiente.toLowerCase(),
      agenda: contact.agenda,
      description: contact.description,
      updatedAt:`${year}${month}${day} ${hours}:${minutes}`
    };
    return updateDoc(this.document(id), { ...contactFormateado });
  }

  deleteContact(id: string) {
    return deleteDoc(this.document(id));
  }

  private padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }
}
