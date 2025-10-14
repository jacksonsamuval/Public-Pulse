import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  imports: [RouterModule, ToastrModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private toastr: ToastrService,
    private apiService: ApiService,
    private router: Router
  ) { }
  user: User = {
    username: '',
    name: '',
    age: '',
    mobileNo: '',
    email: '',
    password: '',
    address: '',
    pinCode: '',
    city: '',
    taluk: '',
    district: '',
    state: '',
    country: ''
  }

  isLoading = false;

  registerUser() {
    console.log('User Data:', this.user);
    this.isLoading = true;
    this.apiService.registerUser(this.user).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response instanceof HttpResponse) {
          const status = response.status;
          const body = response.body;

          console.log('HTTP Status:', status);
          console.log('Response Body:', body);

          if (status === 200 || status === 201) {
            console.log('Registration successful:', response);
            this.toastr.success('Registration successful!', 'Success');
            this.router.navigate(["/login"]);
          }
        } else {
          console.log('Success response:', response);
          this.toastr.success('Registration successful!', 'Success');
          this.router.navigate(["/login"]);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        console.error('Registration failed:', error);
        const status = error.status;
        const errorBody = error.error;

        console.log('HTTP Status Code:', status);
        console.log('Error Body:', errorBody);
        if (status === 401) {
          this.toastr.error("Email Exists!", "Error")
        } else if (status === 400) {
          this.toastr.error("Server Error", "Error")
        } else if (status === 402) {
          this.toastr.error("Username Exists", "Error")
        } else if (status === 403) {
          this.toastr.error("Phone Number Exists", "Error")
        } else if (status === 404) {
          this.toastr.error("Password Should be least 8 Characters", "Error")
        }
      }
    })
  }
}
