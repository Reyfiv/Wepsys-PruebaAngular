import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PersonasService } from '../../Services/personas.service';
import { Persona } from '../../Interfaces/Persona.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styles: [
  ]
})
export class EditarComponent  {

  FormEditar : FormGroup = this.fb.group({
    id :[''],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.minLength(10)]]
  })

  get Persona(){
    return this.personasService.Persona;
  }

  get Personas(){
    return this.personasService.Personas;
  }


  constructor(private personasService:PersonasService, private fb: FormBuilder,private route:Router, private toast:ToastrService) { 
    
  }

  campoNoValido(campo : string){
    return this.FormEditar.controls[campo].errors 
            && this.FormEditar.controls[campo].touched
  }

  ExisteEmail(arr: Persona){
    if(this.Personas.length > 0){
     if(this.Personas.some(item => item.email === arr.email && item.id != arr.id)){
      return true
     }else{
      return false
    }
    }else {return false}
  }

  Editar(){
    if(this.FormEditar.invalid){
      this.FormEditar.markAllAsTouched()
      return;
    }
    let persona : Persona ={
      id: this.Persona.id,
      nombre: this.FormEditar.controls['nombre'].value,
      apellido: this.FormEditar.controls['apellido'].value,
      email:  this.FormEditar.controls['email'].value,
      nulo: false
    }
    if(this.ExisteEmail(persona)){
      this.FormEditar.controls['email'].invalid
      this.toast.error('Revisar!', 'El correo que introdujo ya esta siendo utilizado.');
      return;
    }
    this.personasService.PutPersona(persona);
    this.route.navigate(['nuevo']);
  }

}
