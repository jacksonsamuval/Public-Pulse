import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Login } from '../models/login';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  registerUser(user:User){
    return this.http.post(environment.API_URL+"/auth/user/register",user);
  }

  loginUser(login: Login){
    return this.http.post(environment.API_URL+"/auth/user/login",login);
  }

  validUser(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(environment.API_URL+"/auth/user/valid", {headers})
  }
}
