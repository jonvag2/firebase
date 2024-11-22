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
  orderBy,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

const PATH = 'certification';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {

  private _firestore = inject(Firestore);

  private _collection = collection(this._firestore, PATH);

  private currentDate: Date = new Date();

  constructor() { }

  getCertification(id:string) {
    const q = query(this._collection, where('id_comercio', '==', id));
    return collectionData(q, { idField: 'id' }) as Observable<
      any
    >;
  }

  createCertification(certification: any) {
    
    return addDoc(this._collection, certification);
  }
}
