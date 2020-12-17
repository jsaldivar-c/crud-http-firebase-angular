import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class HeroesService {
    private url =
        'https://crud-firebase-angular-9f62f-default-rtdb.firebaseio.com';

    constructor(private http: HttpClient) {}

    crearHeroe(heroe: HeroeModel) {
        return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
            map((resp: any) => {
                heroe.id = resp.name;
            })
        );
    }

    actualizarHeroe(heroe: HeroeModel) {
        // Creamos un objeto temporal y pasamos las propiedades del heroe con la sintaxis SPREAD(...heroe)
        const heroeTemp = {
            ...heroe,
        };

        delete heroeTemp.id; // Eliminamos el ID del heroe temporal para que no seautilizado en FireBase
        return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
    }

    borrarHeroe(id: string) {
        return this.http.delete(`${this.url}/heroes/${id}.json`);
    }

    getHeroe(id: string) {
        return this.http.get(`${this.url}/heroes/${id}.json`);
    }

    getHeroes() {
        return this.http
            .get(`${this.url}/heroes.json`)
            .pipe(map(this.crearArreglo), delay(800));
    }

    private crearArreglo(heroesObj: object) {
        const heroes: HeroeModel[] = [];
        // console.log(heroesObj);
        if (heroesObj === null) {
            return [];
        }
        Object.keys(heroesObj).forEach((key) => {
            const heroe: HeroeModel = heroesObj[key];
            heroe.id = key;
            heroes.push(heroe);
        });
        // console.log(heroes);
        return heroes;
    }
}
