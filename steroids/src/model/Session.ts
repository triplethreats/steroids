import Exercice from './Exercice';

export default class Session {
    id: string;
    name: string;
    date: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    exercices: Exercice[];

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.date = new Date().toISOString();
        this.exercices = new Array<Exercice>();
        this.createdAt = new Date().toISOString();
        this.updatedAt = this.createdAt;
        this.deleted = false;
    }
}
