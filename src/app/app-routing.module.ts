import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =[
  {
    path:'personas',
    loadChildren:() => import('./personas/personas.module').then(m=>m.PersonasModule)
  },
  {
    path:'**',
    redirectTo: 'nuevo'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }