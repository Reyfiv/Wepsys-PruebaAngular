import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../Services/personas.service';
import { Persona } from '../Interfaces/Persona.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
})
export class ListadoComponent  implements OnInit {

 get listado(){
    return this.personasService.Personas;
  }
  
  constructor(private personasService : PersonasService) { }

  GetListPersonas(){
    this.personasService.ObtenerToken().subscribe((resp) => {
      this.personasService.Token = resp;
      this.personasService.GetPersonas();

    })
  }

  Update(id:number){
    this.personasService.GetPersona(id);
  }

  Delete(id:number){
    this.personasService.GetPersona(id);
  }

  ngOnInit(): void {
    this.GetListPersonas();
  }


}
