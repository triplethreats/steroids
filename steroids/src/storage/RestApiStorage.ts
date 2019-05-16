import IRemoteStorage from './IRemoteStorage';
import { Observable, Observer } from 'rxjs';
import Exercice from 'src/model/Exercice';
import Session from 'src/model/Session';
import { HttpClient } from '@angular/common/http';

export default class RestApiStorage implements IRemoteStorage {

    private baseUrl = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }

    isOnline(): Observable<boolean> {
        return Observable.create((observer: Observer<boolean>) => {
            this.http.get(this.baseUrl + 'sessions').subscribe(_ => {
                observer.next(true);
                observer.complete();
            }, _ => {
                observer.next(false);
                observer.complete();
            });
        });
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
