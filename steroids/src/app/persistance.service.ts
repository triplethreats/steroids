import { Injectable, EventEmitter } from '@angular/core';
import Session from 'src/model/Session';
import { Observable, Observer, interval, timer } from 'rxjs';
import IndexedDbStorage from 'src/storage/IndexedDbStorage';
import Exercice from 'src/model/Exercice';
import Series from 'src/model/Series';
import ILocalStorage from 'src/storage/ILocalStorage';
import IRemoteStorage from 'src/storage/IRemoteStorage';
import RestApiStorage from 'src/storage/RestApiStorage';
import { HttpClient } from '@angular/common/http';
import { sync } from 'src/storage/synchronization';
import { startWith, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersistanceService {

  private localStorage: ILocalStorage;
  private remoteStorage: IRemoteStorage;

  sessionsChanged: EventEmitter<Session[]>;
  exerciceTemplatesChanged: EventEmitter<Exercice[]>;

  constructor(private http: HttpClient) {
    this.localStorage = new IndexedDbStorage();
    this.remoteStorage = new RestApiStorage(this.http);
    this.sessionsChanged = this.localStorage.sessionsChanged;
    this.exerciceTemplatesChanged = this.localStorage.exerciceTemplatesChanged;

    this.sync();
  }

  private sync(): void {
    this.remoteStorage.isOnline().subscribe(isOnline => {
      if (isOnline) {
        sync(this.localStorage, this.remoteStorage);
      }
    });
  }

  getAllSessions(): Observable<Session[]> {
    return this.localStorage.getAllSessions().pipe(
      map(sessions => sessions.sort((a, b) =>
        Date.parse(a.createdAt) - Date.parse(b.createdAt))
      )
    );
  }

  createSession(name: string): Observable<Session> {
    return this.localStorage.createSession(name);
  }

  getSession(id: string): Observable<Session> {
    return this.localStorage.getSession(id);
  }

  deleteSession(id: string): void {
    this.localStorage.deleteSession(id).subscribe();
  }

  addExercice(sessionId: string, name: string, comment: string): Observable<Exercice> {
    return this.localStorage.addExercice(sessionId, name, comment);
  }

  getExercice(id: string): Observable<Exercice> {
    return this.localStorage.getExercice(id);
  }

  deleteExercice(id: string): void {
    this.localStorage.deleteExercice(id).subscribe();
  }

  getSerie(id: string): Observable<Series> {
    return this.localStorage.getSerie(id);
  }

  deleteSerie(id: string): void {
    this.localStorage.deleteSerie(id).subscribe();
  }

  addSerie(
    exerciceId: string,
    repetition: number,
    weight: number,
    rating: number): Observable<Series> {
    return this.localStorage.addSeries(exerciceId, repetition, weight, rating);
  }

  getAllExercicesTemplates() {
    return this.localStorage.getAllExerciceTemplates();
  }

  dropLocalDatabase() {
    this.localStorage.dropLocalDatabase().subscribe();
  }

  updateSession(id: string, name: string) {
    return this.localStorage.updateSession(id, name).subscribe();
  }

  updateExercice(id: string, name: string, comment: string) {
    return this.localStorage.updateExercice(id, name, comment).subscribe();
  }

  updateSerie(id: string, repetition: number, weight: number, rating: number) {
    return this.localStorage.updateSerie(id, repetition, weight, rating).subscribe();;
  }
}
