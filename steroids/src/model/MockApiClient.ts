import IApiClient from './IApiClient';
import Session from './Session';
import Exercice from './Exercice';
import Serie from './Serie';

export default class MockApiClient implements IApiClient {

    private nextSessionId = 3;
    private nextExerciceId = 3;
    private nextSerieId = 1;

    private sessions: Session[] =
    [
        {
            id: 1,
            name: 'Pec',
            date: new Date(),
            exercices: [
                {
                id: 1,
                name: 'Développé couché',
                series: [],
                comment: 'RAS'
                }
            ]
        },
        {
            id: 2,
            name: 'Dos',
            date: new Date(),
            exercices: [
                {
                id: 2,
                name: 'Poulie',
                series: [],
                comment: 'Ce n\'était pas aisé...'
                }
            ]
        }
    ];

    getAllSessions(): Session[] {
        return this.sessions;
    }

    getSession(id: number): Session {
        return this.sessions.find(session => session.id === id);
    }

    createSession(session: Session): void {
        session.id = this.nextSessionId++;
        this.sessions.push(session);
    }

    addExercice(exercice: Exercice, session: Session): void {
        exercice.id = this.nextExerciceId++;
        this.getSession(session.id).exercices.push(exercice);
    }

    getExercice(id: number): Exercice {
        this.sessions.forEach(session => {
            const exercice = session.exercices.find(e => e.id === id);
            if (exercice !== undefined) {
                return exercice;
            }
        });
        return undefined;
    }

    addSerie(serie: Serie, exercice: Exercice): void {
        serie.id = this.nextSerieId++;
        this.getExercice(exercice.id).series.push(serie);
    }
}
