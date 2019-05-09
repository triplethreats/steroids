import { Injectable } from '@angular/core';
import IStorage from 'src/storage/IStorage';
import MockStorage from 'src/storage/MockStorage';
import Session from 'src/model/Session';
import { Observable, Observer } from 'rxjs';
import Exercice from 'src/model/Exercice';
import IndexedDbStorage from 'src/storage/IndexedDbStorage';

@Injectable({
  providedIn: 'root'
})
export class PersistanceService {

  private storage: IStorage;

  constructor() {
    this.storage = new IndexedDbStorage();
  }

  getAllSessions(): Observable<Session[]> {
    return this.storage.getAllSessions();
  }

  getSession(id: number): Observable<Session> {
    return this.storage.getSession(id);
  }
  createSession(session: Session) {
    this.storage.createSession(session).subscribe();
  }

  getAllExercicesTemplates() {
    return this.storage.getAllExerciceTemplates();
  }

  addExercice(exercice: Exercice, session: Session) {
    this.storage.addExercice(exercice, session).subscribe();
  }
}
