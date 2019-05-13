import Series from './Series';

export default class Exercice {
    id: string;
    name: string;
    series: Series[];
    comment: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.series = new Array<Series>();
        this.comment = '';
    }
}
