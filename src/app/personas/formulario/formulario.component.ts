import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonasService } from '../Services/personas.service';
import { Persona } from '../Interfaces/Persona.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styles: [
  ]
})
export class FormularioComponent  {

  FormNuevo : FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.minLength(10)]]
  })
  constructor(private personasService:PersonasService, private fb: FormBuilder, private toast:ToastrService) { }

  campoNoValido(campo : string){
    return this.FormNuevo.controls[campo].errors 
            && this.FormNuevo.controls[campo].touched
  }

  get Personas(){
    return this.personasService.Personas;
  }

  ExisteEmail(arr: Persona){
    if(this.Personas.length > 0){
     if(this.Personas.some(item => item.email === arr.email)){
      return true
     }else{
      return false
    }
    }else {return false}
  }

  Guardar(){
    
    if(this.FormNuevo.invalid){
      this.FormNuevo.markAllAsTouched()
      return;
    }
    let Persona: Persona = {
      id: 0,
      nombre: this.FormNuevo.controls['nombre'].value,
      apellido: this.FormNuevo.controls['apellido'].value,
      email:  this.FormNuevo.controls['email'].value,
      nulo: false
    };
    if(this.ExisteEmail(Persona)){
      this.FormNuevo.controls['email'].invalid
      this.toast.error('Revisar!', 'El correo que introdujo ya esta siendo utilizado.');
      return;
    }
    this.personasService.PostPersona(Persona);
    this.FormNuevo.reset();

  }
}
