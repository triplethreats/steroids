import Session from '../model/Session';
import Exercice from '../model/Exercice';
import Serie from '../model/Serie';
import { Observable } from 'rxjs';

export default interface IStorage {

    getAllSessions(): Observable<Session[]>;
    getSession(id: string): Observable<Session>;
    createSession(name: string): Observable<Session>;

    getAllExerciceTemplates(): Observable<Exercice[]>;
    getExercice(id: string): Observable<Exercice>;
    addExercice(sessionId: string, name: string): Observable<Exercice>;

    addSerie(exerciceId: string, repetition: number, weight: number, rating: number): Observable<Serie>;
}
