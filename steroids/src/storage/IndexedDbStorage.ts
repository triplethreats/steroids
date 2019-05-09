import IStorage from './IStorage';
import { Observable } from 'rxjs';
import Session from 'src/model/Session';
import Exercice from 'src/model/Exercice';
import Serie from 'src/model/Serie';

export default class IndexedDbStorage implements IStorage {

    open(): IDBOpenDBRequest {
        let request = window.indexedDB.open('steroids', 1);
        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            let db = request.result;
            this.upgrade(event.oldVersion, event.newVersion, db);
        };
        return request;
    }

    upgrade(oldVersion: number, newVersion: number, db: IDBDatabase) {
        while (oldVersion < newVersion) {
            oldVersion++;
            this.upgradeFunctions.get(oldVersion)(db);
        }
    }

    getAllSessions(): Observable<Session[]> {
        let request = this.open();
        request.onsuccess = (event: Event) => {
            let db = request.result;
            var transaction = db.transaction(['sessions'], 'readonly');
            let sessionsObjectStore = transaction.objectStore('sessions');
            sessionsObjectStore.getAll().onsuccess = (event => {
                console.log(event)
            });
        };
        request.onerror = (event: Event) => {
            console.error(request.error);
        };
        throw new Error("Method not implemented.");
    }

    getSession(id: number): Observable<Session> {
        throw new Error("Method not implemented.");
    }
    createSession(session: Session): Observable<void> {
        throw new Error("Method not implemented.");
    }
    addExercice(exercice: Exercice, session: Session): Observable<void> {
        throw new Error("Method not implemented.");
    }
    getExercice(id: number): Observable<Exercice> {
        throw new Error("Method not implemented.");
    }
    addSerie(serie: Serie, exercice: Exercice): Observable<void> {
        throw new Error("Method not implemented.");
    }
    getAllExerciceTemplates(): Observable<Exercice[]> {
        throw new Error("Method not implemented.");
    }

    private upgradeFunctions: Map<number, ((db: IDBDatabase) => void)> = new Map<number, ((db: IDBDatabase) => void)>([
        [1, (db: IDBDatabase) => {
            let sessionsObjectStore = db.createObjectStore('sessions', { autoIncrement: true });
            sessionsObjectStore.createIndex('name', 'name', { unique: false });
        }]
    ]);
}