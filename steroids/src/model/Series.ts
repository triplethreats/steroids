export default class Series {
    id: string;
    repetition: number;
    weight: number;
    rating: number;

    constructor(id: string, repetition: number, weight: number, rating: number) {
        this.id = id;
        this.repetition = repetition;
        this.weight = weight;
        this.rating = rating;
    }
}
