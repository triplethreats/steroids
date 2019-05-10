import Exercice from './Exercice';

export default class Session {
    id: string;
    name: string;
    date: Date;
    exercices: Exercice[];

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.date = new Date(Date.now());
        this.exercices = new Array<Exercice>();
    }
}
