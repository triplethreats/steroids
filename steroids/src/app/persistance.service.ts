import { Injectable } from '@angular/core';
import IApiClient from 'src/model/IApiClient';
import MockApiClient from 'src/model/MockApiClient';
import Session from 'src/model/Session';
import { Observable, Observer } from 'rxjs';
import Exercice from 'src/model/Exercice';

@Injectable({
  providedIn: 'root'
})
export class PersistanceService {

  private apiClient: IApiClient;

  constructor() {
    this.apiClient = new MockApiClient();
  }

  getAllSessions(): Observable<Session[]> {
    return this.apiClient.getAllSessions();
  }

  getOneSession(id: number): Observable<Session> {
    return Observable.create((observer: Observer<Session>) => {
      observer.next(this.apiClient.getSession(id));
      observer.complete();
    });
  }
  createSession(session: Session) {
    this.apiClient.createSession(session).subscribe();
  }

  addExercice(exercice: Exercice, session: Session) {
    this.apiClient.addExercice(exercice, session).subscribe();
  }
}
