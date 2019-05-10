import IStorage from './IStorage';
import Session from '../model/Session';
import Exercice from '../model/Exercice';
import Serie from '../model/Serie';
import { Observable, Observer } from 'rxjs';
import { find, first, map } from 'rxjs/operators';
import * as uuid from 'uuid/v1';

export default class MockStorage implements IStorage {

    private sessions: Session[] =
    [
        {
            id: '1',
            name: 'Pec',
            date: new Date(),
            exercices: [
                {
                    id: '1',
                    name: 'Développé couché',
                    series: [],
                    comment: 'RAS'
                }
            ]
        },
        {
            id: '2',
            name: 'Dos',
            date: new Date(),
            exercices: [
                {
                    id: '2',
                    name: 'Poulie',
                    series: [],
                    comment: 'Ce n\'était pas aisé...'
                }
            ]
        }
    ];

    getAllSessions(): Observable<Session[]> {
        return Observable.create((observer: Observer<Session[]>) => {
            observer.next(this.sessions);
            observer.complete();
        });
    }

    getSession(id: string): Observable<Session> {
        return this.getAllSessions().pipe(
            map(sessions => sessions.find(session => session.id === id)));
    }

    createSession(session: Session): Observable<void> {
        return Observable.create((observer: Observer<Session[]>) => {
            session.id = uuid();
            this.sessions.push(session);
            observer.complete();
        });
    }

    addExercice(exercice: Exercice, session: Session): Observable<void> {
        return Observable.create((observer: Observer<Session[]>) => {
            exercice.id = uuid();
            this.getSession(session.id).subscribe(s =>
                s.exercices.push(exercice));
            observer.complete();
        });
    }

    getExercice(id: string): Observable<Exercice> {
        return this.getAllSessions().pipe(
            map(sessions => {
                sessions.forEach(session => {
                    const exercice = session.exercices.find(e => e.id === id);
                    if (exercice !== undefined) {
                        return exercice;
                    }
                });
                return undefined;
            }));
    }

    addSerie(serie: Serie, exercice: Exercice): Observable<void> {
        return Observable.create((observer: Observer<Session[]>) => {
            serie.id = uuid();
            this.getExercice(exercice.id).subscribe(exercice => {
                exercice.series.push(serie);
                observer.complete();
            });
        });
    }

    getAllExerciceTemplates(): Observable<Exercice[]> {
        return this.getAllSessions().pipe(
            map(sessions => sessions.map(session => session.exercices)
                .reduce((ex1, ex2) => ex1.concat(ex2))
                .map(exercice => new Exercice(exercice.id, exercice.name))));
    }
}
