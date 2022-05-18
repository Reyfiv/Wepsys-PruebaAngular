import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonasService } from '../../Services/personas.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styles: [
  ]
})
export class EliminarComponent {

  FormEliminar : FormGroup = this.fb.group({
    id :[''],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.minLength(10)]]
  })

  get Persona(){
    return this.personasService.Persona;
  }


  constructor(private personasService:PersonasService, private fb: FormBuilder,private route:Router) { }

  Eliminar(){
    let valor = this.Persona.id
    this.personasService.DeletePersona(valor);
    this.FormEliminar.reset();
    this.route.navigate(['nuevo']);
  }
}
