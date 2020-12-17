import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-heroe',
    templateUrl: './heroe.component.html',
    styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit {
    heroe = new HeroeModel();
    constructor(
        private heroesService: HeroesService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        // console.log(id);
        if (id !== 'nuevo') {
            this.heroesService.getHeroe(id).subscribe((resp: HeroeModel) => {
                console.log(resp);
                this.heroe = resp;
                this.heroe.id = id;
            });
        }
    }

    guardar(form: NgForm) {
        if (form.invalid) {
            console.warn('Formulario no valido');
            return;
        }

        Swal.fire({
            icon: 'info',
            title: 'Espere',
            text: 'Guardando información',
            allowOutsideClick: false,
        });
        Swal.showLoading();
        // console.log(form);
        // console.log(this.heroe);

        let peticion: Observable<any>;

        if (this.heroe.id) {
            peticion = this.heroesService.actualizarHeroe(this.heroe);
        } else {
            peticion = this.heroesService.crearHeroe(this.heroe);
        }

        peticion.subscribe((resp) => {
            Swal.fire({
                title: this.heroe.nombre,
                text: 'Se actualizo correctamente',
                icon: 'success',
            });
        });
    }
}
