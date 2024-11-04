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

const PATH = 'timeline';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  private _firestore = inject(Firestore);

  private _collection = collection(this._firestore, PATH);

  private currentDate: Date = new Date();

  constructor() { }

  getTimelines() {
    return collectionData(this._collection, { idField: 'id' }) as Observable<
      any
    >;
  }
}
