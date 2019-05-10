import { Injectable } from '@angular/core';
import IStorage from 'src/storage/IStorage';
import MockStorage from 'src/storage/MockStorage';
import Session from 'src/model/Session';
import { Observable, Observer } from 'rxjs';
import Exercice from 'src/model/Exercice';

@Injectable({
  providedIn: 'root'
})
export class PersistanceService {

  private apiClient: IStorage;

  constructor() {
    this.apiClient = new MockStorage();
  }

  getAllSessions(): Observable<Session[]> {
    return this.apiClient.getAllSessions();
  }

  getSession(id: number): Observable<Session> {
    return this.apiClient.getSession(id);
  }
  createSession(session: Session) {
    this.apiClient.createSession(session).subscribe();
  }

  getAllExercicesTemplates() {
    return this.apiClient.getAllExerciceTemplates();
  }

  addExercice(exercice: Exercice, session: Session) {
    this.apiClient.addExercice(exercice, session).subscribe();
  }

  getSeries(id: number): Observable<Exercice> {
    return this.apiClient.getExercice(id);
  }
}
