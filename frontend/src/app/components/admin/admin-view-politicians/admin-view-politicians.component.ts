import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { User } from '../../../models/user';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-admin-view-politicians',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-view-politicians.component.html', 
  styleUrl: './admin-view-politicians.component.css'  
})
export class AdminViewPoliticiansComponent implements OnInit {
  // ... rest of your code stays exactly the same

  // Default to false for security
  valid: boolean = false; 
  token = localStorage.getItem('token');
  user: User | null = null;
  
  // Data properties
  politicians: any[] = [];
  loading: boolean = true;
  errorMsg: string = '';

  constructor(
    private router: Router, 
    private toastr: ToastrService, 
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.validUser();
    this.fetchPoliticians(); // Call the API on load
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
      this.valid = false;
    } else {
      this.apiService.validUser().subscribe({
        next: (response) => {
          this.valid = !!response;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Invalid token:', error);
          this.valid = false;
        }
      });
    }
  }

  fetchPoliticians() {
    this.loading = true;
    this.apiService.getAllPoliticians().subscribe({
      next: (res: any) => {
        this.politicians = res; 
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching politicians:', err);
        this.errorMsg = 'Failed to load politicians. Please try again later.';
        this.loading = false;
        this.toastr.error('Could not load politicians', 'Error');
      }
    });
  }

  // --- Routing Methods ---

  goToSubmit() {
    if (this.token) {
      this.router.navigate(['/submitForm']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  goToPolitians() {
    if (this.token) {
      this.router.navigate(['/viewPoliticians']);
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