import { Injectable, EventEmitter } from '@angular/core';
import Session from 'src/model/Session';
import { Observable, Observer } from 'rxjs';
import IndexedDbStorage from 'src/storage/IndexedDbStorage';
import Exercice from 'src/model/Exercice';
import Series from 'src/model/Series';
import ILocalStorage from 'src/storage/ILocalStorage';
import IRemoteStorage from 'src/storage/IRemoteStorage';

@Injectable({
  providedIn: 'root'
})
export class PersistanceService {

  private localStorage: ILocalStorage;
  private remoteStorage: IRemoteStorage;

  sessionsChanged: EventEmitter<Session[]>;
  exerciceTemplatesChanged: EventEmitter<Exercice[]>;

  constructor() {
    this.localStorage = new IndexedDbStorage();
    this.sessionsChanged = this.localStorage.sessionsChanged;
    this.exerciceTemplatesChanged = this.localStorage.exerciceTemplatesChanged;
  }

  getAllSessions(): Observable<Session[]> {
    return this.localStorage.getAllSessions();
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
    return this.storage.getSerie(id);
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
    return this.storage.updateSession(id, name).subscribe();
  }

  updateExercice(id: string, name: string, comment: string) {
    return this.storage.updateExercice(id, name, comment).subscribe();
  }

  updateSerie(id: string, repetition: number, weight: number, rating: number) {
    return this.storage.updateSerie(id, repetition, weight, rating).subscribe();;
  }
}
