import Serie from './Serie';

export default class Exercice {
    id?: number;
    name: string;
    series: Serie[];
    comment: string;

    constructor(name: string) {
        this.name = name;
        this.series = new Array<Serie>();
        this.comment = '';
    }
}
