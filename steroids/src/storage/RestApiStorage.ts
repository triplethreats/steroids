import IRemoteStorage from './IRemoteStorage';
import { Observable, Observer } from 'rxjs';
import Exercice from 'src/model/Exercice';
import Session from 'src/model/Session';
import { EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export default class RestApiStorage implements IRemoteStorage {

    private baseUrl = 'http://localhost:3000/';

    sessionsChanged: EventEmitter<Session[]>;
    exerciceTemplatesChanged: EventEmitter<Exercice[]>;

    constructor(private http: HttpClient) {
        this.sessionsChanged = new EventEmitter<Session[]>();
        this.exerciceTemplatesChanged = new EventEmitter<Exercice[]>();
    }

    getAllSessions(): Observable<Session[]> {
        return this.http.get<Session[]>(this.baseUrl + 'sessions');
    }

    createSession(session: Session): Observable<Session> {
        return this.http.post<Session>(this.baseUrl + 'sessions', session);
    }

    getSession(id: string): Observable<Session> {
        return this.http.get<Session>(this.baseUrl + 'sessions/' + id);
    }

    deleteSession(id: string): Observable<void> {
        return this.http.delete<void>(this.baseUrl + 'sessions/' + id);
    }

    updateSession(session: Session): Observable<Session> {
        return this.http.put<Session>(this.baseUrl + 'sessions/' + session.id, session);
    }

    getAllExerciceTemplates(): Observable<Exercice[]> {
        return this.http.get<Exercice[]>(this.baseUrl + 'exerciceTemplates');
    }

    createExerciceTemplate(exercice: Exercice): Observable<Exercice> {
        return this.http.post<Exercice>(this.baseUrl + 'exerciceTemplates', exercice);
    }

    getExerciceTemplate(id: string): Observable<Exercice> {
        return this.http.get<Exercice>(this.baseUrl + 'exerciceTemplates/' + id);
    }

    deleteExerciceTemplate(id: string): Observable<void> {
        return this.http.delete<void>(this.baseUrl + 'exerciceTemplates/' + id);
    }

    updateExerciceTemplate(exercice: Exercice): Observable<Exercice> {
        return this.http.put<Exercice>(this.baseUrl + 'exerciceTemplates/' + exercice.id, exercice);
    }
}
