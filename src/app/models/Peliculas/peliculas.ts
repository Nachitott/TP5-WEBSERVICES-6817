export class Peliculas {
    title: string;
    description: string;
    image: string;
    year: number;
    genre: string;

    constructor(title: string, description: string, image: string, year: number, genre: string) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.year = year;
        this.genre = genre;
    }
}
