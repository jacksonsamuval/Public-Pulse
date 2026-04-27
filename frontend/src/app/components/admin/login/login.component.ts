import { Component } from '@angular/core';
import { Login } from '../../../models/login';
import { ApiService } from '../../../service/api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class AdminLoginComponent {
isLoading = false;
  login: Login = {
    username : '',
    password : ''
  }
  constructor(private apiService: ApiService, private toastr: ToastrService, private router: Router){}

  loginAdmin(){
    this.isLoading = true;
    this.apiService.loginAdmin(this.login).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.toastr.success('Login successful!', 'Success');
        localStorage.setItem('token',response.token);
        localStorage.setItem('user',JSON.stringify(response.user));
        
        console.log('Token from storage: ', localStorage.getItem('token'));
        console.log('User Data from storage:', localStorage.getItem('user'));

        this.router.navigate(["/admin-home"]);
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

