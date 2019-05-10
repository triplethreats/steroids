import Serie from './Serie';

export default class Exercice {
    id: string;
    name: string;
    series: Serie[];
    comment: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.series = new Array<Serie>();
        this.comment = '';
    }
}
