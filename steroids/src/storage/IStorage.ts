import Session from '../model/Session';
import Exercice from '../model/Exercice';
import Serie from '../model/Serie';
import { Observable } from 'rxjs';

export default interface IStorage {
    getAllSessions(): Observable<Session[]>;
    getSession(id: string): Observable<Session>;
    createSession(session: Session): Observable<void>;
    addExercice(exercice: Exercice, session: Session): Observable<void>;
    getExercice(id: string): Observable<Exercice>;
    addSerie(serie: Serie, exercice: Exercice): Observable<void>;
    getAllExerciceTemplates(): Observable<Exercice[]>;
}
