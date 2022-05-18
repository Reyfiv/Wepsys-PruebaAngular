import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './listado/listado.component';
import { FormularioComponent } from './formulario/formulario.component';
import { RPersonasComponent } from './r-personas/r-personas.component';
import { EditarComponent } from './formulario/editar/editar.component';
import { EliminarComponent } from './formulario/eliminar/eliminar.component';
import {  RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes : Routes = [{
  path: '',
  children:[
    {path: 'nuevo', component: FormularioComponent},
    {path: 'editar', component: EditarComponent},
    {path: 'eliminar', component: EliminarComponent},
    {path: '**', redirectTo: 'nuevo'}
  ]
}];

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent,
    RPersonasComponent,
    EditarComponent,
    EliminarComponent
  ],
  exports:[
    RPersonasComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class PersonasModule { }
