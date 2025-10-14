import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../../models/login';

@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoading = false;
  login: Login = {
    username : '',
    password : ''
  }
  constructor(private apiService: ApiService, private toastr: ToastrService, private router: Router){}

  loginUser(){
    this.isLoading = true;
    this.apiService.loginUser(this.login).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.toastr.success('Login successful!', 'Success');
        localStorage.setItem('token',response.token);
        this.router.navigate(["/"]);
        console.log('Token from storage', localStorage.getItem('token'));
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        console.error('Login failed:', error);
        const status = error.status;
        const errorBody = error.error;
        console.log('HTTP Status Code:', status);
        console.log('Error Body:', errorBody);
        if(status === 401){
          this.toastr.error('Invalid password', 'Error');
        } else if(status === 500){
          this.toastr.error('Server Error', 'Error');
        }
      }
    })
  }
}
