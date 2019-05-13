import { Injectable, EventEmitter } from '@angular/core';
import IStorage from 'src/storage/IStorage';
import Session from 'src/model/Session';
import { Observable, Observer } from 'rxjs';
import Exercice from 'src/model/Exercice';
import IndexedDbStorage from 'src/storage/IndexedDbStorage';
import Serie from 'src/model/Serie';

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

  getSession(id: string): Observable<Session> {
    return this.storage.getSession(id);
  }

  createSession(name: string): Observable<Session> {
    return this.storage.createSession(name);
  }

  getAllExercicesTemplates() {
    return this.storage.getAllExerciceTemplates();
  }

  getExercice(id: string): Observable<Exercice> {
    return this.storage.getExercice(id);
  }

  addExercice(sessionId: string, name: string): Observable<Exercice> {
    return this.storage.addExercice(sessionId, name);
  }

  getSeries(id: string): Observable<Exercice> {
    return this.storage.getExercice(id);
  }

  addSerie(exerciceId: string, repetition: number, weight: number, rating: number): Observable<Serie> {
    return this.storage.addSerie(exerciceId, repetition, weight, rating);
  }
}
