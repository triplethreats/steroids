import Exercice from './Exercice';

export default class Session {
    id?: string;
    name: string;
    date: Date;
    exercices: Exercice[];

    constructor(name: string) {
        this.name = name;
        this.date = new Date(Date.now());
        this.exercices = new Array<Exercice>();
    }
}
