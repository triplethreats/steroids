import Session from './Session';
import Exercice from './Exercice';
import Serie from './Serie';
import { Observable } from 'rxjs';

export default interface IApiClient {
    getAllSessions(): Observable<Session[]>;
    getSession(id: number): Observable<Session>;
    createSession(session: Session): Observable<void>;
    addExercice(exercice: Exercice, session: Session): Observable<void>;
    getExercice(id: number): Observable<Exercice>;
    addSerie(serie: Serie, exercice: Exercice): Observable<void>;
    getAllExerciceTemplates(): Observable<Exercice[]>;
}
