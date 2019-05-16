import Session from '../model/Session';
import Exercice from '../model/Exercice';
import Series from '../model/Series';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

export default interface ILocalStorage {
    sessionsChanged: EventEmitter<Session[]>;
    exerciceTemplatesChanged: EventEmitter<Exercice[]>;

    getAllSessions(): Observable<Session[]>;
    createSession(name: string): Observable<Session>;
    importSession(session: Session): Observable<Session>;
    updateSession(id: string, name: string): Observable<Session>;
    getSession(id: string): Observable<Session>;
    deleteSession(id: string): Observable<void>;

    addExercice(sessionId: string, name: string, comment: string): Observable<Exercice>;
    getExercice(id: string): Observable<Exercice>;
    updateExercice(id: string, name: string, remarque: string): Observable<Exercice>;
    deleteExercice(id: string): Observable<void>;


    addSeries(
        exerciceId: string,
        repetition: number,
        weight: number,
        rating: number): Observable<Series>;
    getSerie(id: string): Observable<Series>;
    deleteSerie(id: string): Observable<void>;
    updateSerie(id: string, repetition: number, weight: number, rating: number): Observable<Series>;

    getAllExerciceTemplates(): Observable<Exercice[]>;

    dropLocalDatabase(): Observable<void>;
}
