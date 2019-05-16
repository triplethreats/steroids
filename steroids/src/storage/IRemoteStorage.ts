import Session from '../model/Session';
import Exercice from '../model/Exercice';
import { Observable } from 'rxjs';

export default interface IRemoteStorage {

    getAllSessions(): Observable<Session[]>;
    createSession(session: Session): Observable<Session>;
    getSession(id: string): Observable<Session>;
    deleteSession(id: string): Observable<void>;
    updateSession(session: Session): Observable<Session>;

    getAllExerciceTemplates(): Observable<Exercice[]>;
    createExerciceTemplate(exercice: Exercice): Observable<Exercice>;
    getExerciceTemplate(id: string): Observable<Exercice>;
    deleteExerciceTemplate(id: string): Observable<void>;
    updateExerciceTemplate(exercice: Exercice): Observable<Exercice>;
}
