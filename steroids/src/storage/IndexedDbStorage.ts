import IStorage from './IStorage';
import { Observable, Observer, observable } from 'rxjs';
import Session from 'src/model/Session';
import Exercice from 'src/model/Exercice';
import Series from 'src/model/Series';
import * as uuid from 'uuid/v1';
import { EventEmitter } from '@angular/core';

export default class IndexedDbStorage implements IStorage {

    private version = 2;

    sessionsChanged: EventEmitter<Session[]>;
    exerciceTemplatesChanged: EventEmitter<Exercice[]>;

    constructor() {
        this.sessionsChanged = new EventEmitter<Session[]>();
        this.exerciceTemplatesChanged = new EventEmitter<Exercice[]>();
    }

    private upgradeFunctions: Map<number, ((db: IDBDatabase) => void)> = new Map<number, ((db: IDBDatabase) => void)>([
        [1, (db: IDBDatabase) => {
            db.createObjectStore('sessions', { autoIncrement: true });
        }],
        [2, (db: IDBDatabase) => {
            const exerciceTemplatesStore = db.createObjectStore('exerciceTemplates', { autoIncrement: true });
            this.createExerciceTemplate(exerciceTemplatesStore, 'Poulie');
            this.createExerciceTemplate(exerciceTemplatesStore, 'Développé couché');
            this.createExerciceTemplate(exerciceTemplatesStore, 'Tirage poulie haute');
            this.createExerciceTemplate(exerciceTemplatesStore, 'Butterfly');
        }]
    ]);

    private open(): Observable<IDBDatabase> {
        return Observable.create((observer: Observer<IDBDatabase>) => {
            const request = window.indexedDB.open('steroids', this.version);
            request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const db = request.result;
                this.upgrade(event.oldVersion, event.newVersion, db);
            };
            request.onsuccess = _ => {
                observer.next(request.result);
                observer.complete();
            };
            request.onerror = _ => {
                console.error(request.error);
                observer.error(request.error);
            };
        });
    }

    private upgrade(oldVersion: number, newVersion: number, db: IDBDatabase) {
        while (oldVersion < newVersion) {
            oldVersion++;
            this.upgradeFunctions.get(oldVersion)(db);
        }
    }

    private emitSessionsChanged() {
        this.getAllSessions().subscribe(sessions => {
            this.sessionsChanged.emit(sessions);
        });
    }

    private emitExerciceTemplatesChanged() {
        this.getAllExerciceTemplates().subscribe(templates => {
            this.exerciceTemplatesChanged.emit(templates);
        });
    }

    getAllSessions(): Observable<Session[]> {
        return Observable.create((observer: Observer<Session[]>) => {
            this.open().subscribe((db: IDBDatabase) => {
                const transaction = db.transaction(['sessions'], 'readonly');
                const sessionsObjectStore = transaction.objectStore('sessions');
                const request = sessionsObjectStore.getAll();
                request.onsuccess = _ => {
                    const sessions = request.result as Session[];
                    observer.next(sessions);
                    observer.complete();
                };
                request.onerror = _ => {
                    console.error(request.error);
                    observer.error(request.error);
                };
            });
        });
    }

    createSession(name: string): Observable<Session> {
        return Observable.create((observer: Observer<void>) => {
            this.open().subscribe((db: IDBDatabase) => {
                const id = uuid();
                const session = new Session(id, name);
                const transaction = db.transaction(['sessions'], 'readwrite');
                const sessionsStore = transaction.objectStore('sessions');
                const request = sessionsStore.add(session, id);
                request.onsuccess = _ => {
                    observer.next();
                    observer.complete();
                    this.emitSessionsChanged();
                };
                request.onerror = _ => {
                    console.error(request.error);
                    observer.error(request.error);
                };
            });
        });
    }

    getSession(id: string): Observable<Session> {
        return Observable.create((observer: Observer<Session>) => {
            this.open().subscribe((db: IDBDatabase) => {
                const transaction = db.transaction(['sessions'], 'readwrite');
                const sessionsStore = transaction.objectStore('sessions');
                const request = sessionsStore.get(id);
                request.onsuccess = _ => {
                    observer.next(request.result);
                    observer.complete();
                };
                request.onerror = _ => {
                    console.error(request.error);
                    observer.error(request.error);
                };
            });
        });
    }

    deleteSession(id: string): Observable<void> {
        return Observable.create((observer: Observer<void>) => {
            this.open().subscribe(db => {
                const request = db.transaction(['sessions'], 'readwrite')
                    .objectStore('sessions')
                    .delete(id);
                request.onsuccess = _ => {
                    observer.complete();
                };
                request.onerror = _ => {
                    console.error(request.error);
                    observer.error(request.error);
                };
            });
        });
    }

    addExercice(sessionId: string, name: string, comment: string): Observable<Exercice> {
        return Observable.create((observer: Observer<Exercice>) => {
            this.getSession(sessionId).subscribe(session => {
                const id = uuid();
                const exercice = new Exercice(id, name, comment);
                session.exercices.push(exercice);
                this.open().subscribe(db => {
                    const store = db.transaction(['sessions'], 'readwrite').objectStore('sessions');
                    const request = store.put(session, session.id);
                    request.onsuccess = _ => {
                        observer.next(exercice);
                        observer.complete();
                        this.emitSessionsChanged();
                    };
                    request.onerror = _ => {
                        observer.error(request.error);
                    };
                });
            });
        });
    }

    getExercice(id: string): Observable<Exercice> {
        return Observable.create((observer: Observer<Exercice>) => {
            this.getAllSessions().subscribe(sessions => {
                for (const session of sessions) {
                    for (const exercice of session.exercices) {
                        if (exercice.id === id) {
                            observer.next(exercice);
                            observer.complete();
                            return;
                        }
                    }
                }
                observer.complete();
            });
        });
    }

    getSerie(id: string): Observable<Series> {
        return Observable.create((observer: Observer<Series>) => {
            this.getAllSessions().subscribe(sessions => {
                for (const sessionValue of sessions) {
                    for (const exercice of sessionValue.exercices) {
                        for (const serie of exercice.series) {
                            if (serie.id === id) {
                                observer.next(serie);
                                observer.complete();
                                return;
                            }
                        }
                    }
                }
                observer.complete();
            });
        });
    }


    deleteSerie(id: string): Observable<void> {
        return Observable.create((observer: Observer<void>) => {
            this.getAllSessions().subscribe(sessions => {
                for (const sessionValue of sessions) {
                    for (const exercice of sessionValue.exercices) {
                        for (const serie of exercice.series) {
                            if (serie.id === id) {
                                exercice.series.splice(
                                    exercice.series.indexOf(serie),
                                    1);
                                this.open().subscribe(db => {
                                    const store = db.transaction(['sessions'], 'readwrite').objectStore('sessions');
                                    const request = store.put(sessionValue, sessionValue.id);
                                    request.onsuccess = _ => {
                                        observer.complete();
                                        this.emitSessionsChanged();
                                    };
                                    request.onerror = _ => {
                                        console.log(request.error);
                                        observer.error(request.error);
                                    };
                                });
                                return;

                            }
                        }
                    }
                }

            });
        });
    }

    deleteExercice(id: string): Observable<void> {
        return Observable.create((observer: Observer<void>) => {
            this.getAllSessions().subscribe(sessions => {
                const session = sessions.find(session =>
                    session.exercices.find(exercice =>
                        exercice.id === id) !== undefined);
                if (session === undefined) {
                    observer.error('There is no exercice with ID "' + id + '"');
                    return;
                }
                session.exercices.splice(
                    session.exercices.indexOf(session.exercices.find(exercice =>
                        exercice.id === id)),
                    1);
                this.open().subscribe(db => {
                    const store = db.transaction(['sessions'], 'readwrite').objectStore('sessions');
                    const request = store.put(session, session.id);
                    request.onsuccess = _ => {
                        observer.complete();
                        this.emitSessionsChanged();
                    };
                    request.onerror = _ => {
                        console.log(request.error);
                        observer.error(request.error);
                    };
                });
            });
        });
    }

    addSeries(exerciceId: string, repetition: number, weight: number, rating: number): Observable<Series> {
        return Observable.create((observer: Observer<Series>) => {
            this.getAllSessions().subscribe(sessions => {
                for (const session of sessions) {
                    for (const exercice of session.exercices) {
                        if (exercice.id === exerciceId) {
                            const id = uuid();
                            const series = new Series(id, repetition, weight, rating);
                            exercice.series.push(series);
                            this.open().subscribe(db => {
                                const store = db.transaction(['sessions'], 'readwrite').objectStore('sessions');
                                const request = store.put(session, session.id);
                                request.onsuccess = _ => {
                                    observer.next(series);
                                    observer.complete();
                                    this.emitSessionsChanged();
                                };
                                request.onerror = _ => {
                                    console.error(request.error);
                                    observer.error(request.error);
                                };
                            });
                            return;
                        }
                    }
                }
                observer.error('There is no exercice with ID "' + exerciceId + '"');
            });
        });
    }

    getAllExerciceTemplates(): Observable<Exercice[]> {
        return Observable.create((observer: Observer<Exercice[]>) => {
            this.open().subscribe((db: IDBDatabase) => {
                const transaction = db.transaction(['exerciceTemplates'], 'readonly');
                const exerciceTemplatesStore = transaction.objectStore('exerciceTemplates');
                const request = exerciceTemplatesStore.getAll();
                request.onsuccess = _ => {
                    const templates = request.result;
                    observer.next(templates);
                    observer.complete();
                };
                request.onerror = _ => {
                    console.error(request.error);
                    observer.error(request.error);
                };
            });
        });
    }

    createExerciceTemplate(store: IDBObjectStore, name: string) {
        const id = uuid();
        const exercice = new Exercice(id, name, '');
        const request = store.add(exercice, id);
        request.onsuccess = _ => {
            this.emitExerciceTemplatesChanged();
        };
        request.onerror = _ => {
            console.error(request.error);
        };
    }
}
