import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  loginAdmin(login: Login){
    return this.http.post(environment.API_URL+"/auth/officials/login",login);
  }

  registerAdmin(user:User){
    return this.http.post(environment.API_URL+"/auth/officials/register",user);
  }

  validUser(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(environment.API_URL+"/auth/user/valid", {headers})
  }

  submitProblem(formData: FormData) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post(
      environment.API_URL + "/problem/submitProblem",
      formData,
      { headers }
    );
  }

  viewAllProblems() {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(
      environment.API_URL + "/problem/getAllProblemForUser",
      { headers }
    );
  }

  viewProblemsByStatus(status: string) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const params = {
      status: status
    };

    return this.http.get(
      environment.API_URL + "/problem/getByProblemStatusUser",
      { headers, params }
    );
  }

   getAllPoliticians() {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(
      environment.API_URL + "/problem/getAllPoliticians",
      { headers }
    );
  }


  reviewAndCompleteProblem(id: number, userResponse: string, rating: number) {

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  const params = new HttpParams()
    .set('id', id)
    .set('userResponse', userResponse)
    .set('rating', rating);

  return this.http.post(
    environment.API_URL + "/problem/reviewAndComplete",
    null,
    { headers, params }
  );

}

// ADMIN / OFFICIAL APIs

getProblemsByCity(city: string) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  const params = new HttpParams().set('city', city);

  return this.http.get(
    environment.API_URL + "/minister/getProblemByCity",
    { headers, params }
  );
}

getProblemsByStatus(status: string) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  const params = new HttpParams().set('status', status);

  return this.http.get(
    environment.API_URL + "/minister/getByProblemStatus",
    { headers, params }
  );
}

getAssignedProblems() {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  return this.http.get(
    environment.API_URL + "/minister/getProblemByOfficial",
    { headers }
  );
}

updateProblemStatus(id: number) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  const params = new HttpParams().set('id', id);

  return this.http.post(
    environment.API_URL + "/minister/updateProblemStatus",
    null,
    { headers, params, responseType: 'text' }
  );
}

solveProblem(id: number, problemResponse: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const params = new HttpParams()
      .set('id', id.toString()) // <-- Converted to string
      .set('problemResponse', problemResponse);

    return this.http.get(
      environment.API_URL + "/minister/solveProblem",
      { 
        headers: headers, 
        params: params,
        responseType: 'text'
      }
    );
  }

adminGetAllProblems() {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  return this.http.get(
    environment.API_URL + "/minister/getAllProblemAvailaible",
    { headers }
  );
}

getUAdminData() {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  return this.http.get(
    environment.API_URL + "/auth/officials/getUAdminData",
    { headers }
  );
}

getProblemByOfficial() {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  return this.http.get(
    environment.API_URL + "/minister/getProblemByOfficial",
    { headers }
  );
}
}
