import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '../Interfaces/Token.interface';
import { Persona } from '../Interfaces/Persona.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  public acc : string = 'c'
  private url: string = "https://localhost:44339/api"
  private _Personas: Persona[] = []
  private _Persona: Persona = {
    id : 0,
    nombre: '',
    apellido: '',
    email: '',
    nulo: false
  }
  public Token: Token = {
    tokenG: '',
    expiration: new Date('yyyy-MM-dd')
  };

  get Personas() {
    return [...this._Personas]
  }

  get Persona() {
    return {...this._Persona}
  }


  constructor(private http: HttpClient) { }

  ObtenerToken() {
    const a  = `${this.url}/Token`
    return this.http.get<Token>(`${this.url}/Token`)
  }

  GetPersonas() {

    const params ={
      headers: new HttpHeaders({
      Authorization: `Bearer ${this.Token.tokenG}`
    })};

    this.http.get<Persona[]>(`${this.url}/Personas`, params)
      .subscribe((resp) => {
        this._Personas = resp;

        console.log(resp)
      })
  }

  GetPersona(id: number) {
    const params ={
      headers: new HttpHeaders({
      Authorization: `Bearer ${this.Token.tokenG}`
    })};
    this.http.get<Persona>(`${this.url}/Personas/${id}`, params)
      .subscribe((resp) => {
        this._Persona = resp;
      })
  }

  PostPersona(item : Persona) {
    const params ={
      headers: new HttpHeaders({
      Authorization: `Bearer ${this.Token.tokenG}`
    })};
    this.http.post<Persona>(`${this.url}/Personas`, item, params)
      .subscribe((resp) => {
        this._Persona = resp;
        this.GetPersonas();
      })
  }

  PutPersona(item : Persona) {
    const params ={
      headers: new HttpHeaders({
      Authorization: `Bearer ${this.Token.tokenG}`
    })};
    this.http.put<Persona>(`${this.url}/Personas/${item.id}`, item, params)
      .subscribe((resp) => {
        this._Persona = {
          id : 0,
          nombre: '',
          apellido: '',
          email: '',
          nulo: false
        };
        this.GetPersonas();
      })
  }

  DeletePersona(id: number) {
    const params ={
      headers: new HttpHeaders({
      Authorization: `Bearer ${this.Token.tokenG}`
    })};
    this.http.delete<Persona>(`${this.url}/Personas/${id}`, params)
      .subscribe((resp) => {
        this._Persona =  {
          id : 0,
          nombre: '',
          apellido: '',
          email: '',
          nulo: false
        };
        this.GetPersonas();
      })
  }
}
