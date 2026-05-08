import { Component } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-home',
  imports: [RouterModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  
    constructor(private router: Router, private toastr: ToastrService, private apiService: ApiService) { };
    valid: boolean = true;
    token = localStorage.getItem('token');
    user: User | null = null;
  
    ngOnInit(): void   {
      this.validUser();
      this.loadUser();
      if(this.user===null){
        this.valid = false;
      }
    }
  
    loadUser() {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      } else {
        this.user = null;
      }
    }
  
    validUser() {
      if (!this.token) {
        console.log("Token Invalid");
        this.valid = false;
      } else {
        this.apiService.validUser().subscribe({
          next: (response) => {
            this.valid = true;
            console.log('Token valid:', response);
            if (!response) {
              console.log("Token Invalid");
              this.valid = false;
            }
          },
          error: (error: HttpErrorResponse) => {
            console.log('Invalid token:', error);
            this.valid = false;
          }
        })
      }
    }
  
    goToSubmit() {
    const token = localStorage.getItem('token');
  
    if (token) {
      this.router.navigate(['/submitForm']);
    } else {
      this.router.navigate(['/login']);
    }
  }
  
  goToPolitians() {
    const token = localStorage.getItem('token');
  
    if (token) {
      this.router.navigate(['/admin-viewPoliticians']);
    } else {
      this.router.navigate(['/login']);
    }
  }
  
  goToAboutUs() {
    const token = localStorage.getItem('token');
  
    if (token) {
      this.router.navigate(['/aboutUs']);
    } else {
      this.router.navigate(['/login']);
    }
  }
  
  logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.token = null;
      this.user = null;
      this.valid = false;
      
      this.toastr.success('Logged out successfully', 'Success');
      this.router.navigate(['/login']); // Optional: redirect to login or home
    }

    goToCitizens(){}
    // --- Navigation Methods ---

  goToManageProblems() {
    if (this.token) {
      // Matches the path in your app.routes.ts
      this.router.navigate(['/admin-opted-problem']); 
    } else {
      this.router.navigate(['/admin-login']);
    }
  }

  goToAnalytics() {
    if (this.token) {
      // Matches the path in your app.routes.ts
      this.router.navigate(['/admin-analytics']); 
    } else {
      this.router.navigate(['/admin-login']);
    }
  }
}
