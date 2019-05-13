import { Injectable, EventEmitter } from '@angular/core';
import IStorage from 'src/storage/IStorage';
import Session from 'src/model/Session';
import { Observable, Observer } from 'rxjs';
import IndexedDbStorage from 'src/storage/IndexedDbStorage';
import Exercice from 'src/model/Exercice';
import Series from 'src/model/Series';

@Injectable({
  providedIn: 'root'
})
export class PersistanceService {

  private storage: IStorage;

  sessionsChanged: EventEmitter<Session[]>;
  exerciceTemplatesChanged: EventEmitter<Exercice[]>;

  constructor() {
    this.storage = new IndexedDbStorage();
    this.sessionsChanged = this.storage.sessionsChanged;
    this.exerciceTemplatesChanged = this.storage.exerciceTemplatesChanged;
  }

  getAllSessions(): Observable<Session[]> {
    return this.storage.getAllSessions();
  }

  createSession(name: string): Observable<Session> {
    return this.storage.createSession(name);
  }

  getSession(id: string): Observable<Session> {
    return this.storage.getSession(id);
  }

  deleteSession(id: string): void {
    this.storage.deleteSession(id).subscribe();
  }

  addExercice(sessionId: string, name: string): Observable<Exercice> {
    return this.storage.addExercice(sessionId, name);
  }

  getExercice(id: string): Observable<Exercice> {
    return this.storage.getExercice(id);
  }

  deleteExercice(id: string): void {
    this.storage.deleteExercice(id);
  }

  addSerie(
    exerciceId: string,
    repetition: number,
    weight: number,
    rating: number): Observable<Series>
  {
    return this.storage.addSeries(exerciceId, repetition, weight, rating);
  }

  getAllExercicesTemplates() {
    return this.storage.getAllExerciceTemplates();
  }
}
