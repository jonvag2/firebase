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
import { Timeline, TimelineForm } from '../shared/interfaces/timeline.interface';

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

  createTimeline(timeline: any) {

    this.currentDate= new Date();

    const year = this.currentDate.getFullYear(); // Año actual
    const day = this.padZero(this.currentDate.getDate());
    const month = this.padZero(this.currentDate.getMonth() + 1);
    const hours = this.padZero(this.currentDate.getHours());
    const minutes = this.padZero(this.currentDate.getMinutes()); 

    let TimelineFormateado = {
      fecha: `${day}/${month}/${year}`,
      id_comercio: timeline.id_comercio,
      description: timeline.description,
      cretedAt:`${year}${month}${day}${hours}${minutes}`
    };
    
    return addDoc(this._collection, TimelineFormateado);
  }

  getTimelinesComercio(id: string) {
    const q = query(this._collection, where('id_comercio', '==', id));
    return collectionData(q, { idField: 'id' }) as Observable<
      any
    >;
  }

  private padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
