import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent implements OnInit {
  
  // Default to false for security until the API verifies the token
  valid: boolean = false; 
  token = localStorage.getItem('token');
  user: User | null = null;

  constructor(
    private router: Router, 
    private toastr: ToastrService, 
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.validUser();
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
      console.log("No token found");
      this.valid = false;
    } else {
      this.apiService.validUser().subscribe({
        next: (response) => {
          this.valid = !!response; // Coerces the response to a boolean
          if (!this.valid) {
            console.log("Token Invalid");
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Invalid token:', error);
          this.valid = false;
        }
      });
    }
  }

  // Protected Route: Requires Login
  goToSubmit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/submitForm']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Protected Route: Requires Login
  goToPolitians() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/viewPoliticians']);
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
    this.router.navigate(['/login']); 
  }
}