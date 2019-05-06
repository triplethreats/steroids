import Session from './Session';
import Exercice from './Exercice';
import Serie from './Serie';

export default interface IApiClient {
    getAllSessions(): Session[];
    getSession(id: number): Session;
    createSession(session: Session): void;
    addExercice(exercice: Exercice, session: Session): void;
    getExercice(id: number): Exercice;
    addSerie(serie: Serie, exercice: Exercice): void;
}
