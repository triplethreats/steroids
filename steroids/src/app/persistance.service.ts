import { Injectable } from '@angular/core';
import IApiClient from 'src/model/IApiClient';
import MockApiClient from 'src/model/MockApiClient';
import Session from 'src/model/Session';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersistanceService {

  private apiClient: IApiClient;

  constructor() {
    this.apiClient = new MockApiClient();
  }

  getAllSessions(): Observable<Session[]> {
    return Observable.create((observer: Observer<Session[]>) => {
      observer.next(this.apiClient.getAllSessions());
      observer.complete();
    });
  }

  createSession(session: Session) {
    this.apiClient.createSession(session);
  }
}
