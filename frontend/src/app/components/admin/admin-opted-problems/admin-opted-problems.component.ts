import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../service/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../models/user';

@Component({
  selector: 'app-admin-opted-problems',
  imports: [CommonModule, FormsModule, RouterModule, CommonModule],
  templateUrl: './admin-opted-problems.component.html',
  styleUrl: './admin-opted-problems.component.css'
})

export class AdminOptedProblemsComponent implements OnInit {
  problems: any[] = [];
  loading = true;

  valid: boolean = true;
  token = localStorage.getItem('token');

  user: User | null = null;

  // --- Modal State Variables --- Add these! ---
  isModalOpen = false;
  selectedProblemId: number | null = null;
  officialResponseText: string = '';

  constructor(private api: ApiService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.validUser();
    this.loadUser();
    this.fetchProblems(); // Extracted into its own method
  }

  fetchProblems() {
    if (!this.token) {
      this.loading = false;
      return;
    }

    this.loading = true;
    // Fix 1: Changed to getAssignedProblems() to match your service
    this.api.getAssignedProblems().subscribe({
      next: (res: any) => {
        this.problems = res;
        this.loading = false;
      },
      // Fix 2: Explicitly typed 'err' as HttpErrorResponse
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.loading = false;
      }
    });
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
      this.api.validUser().subscribe({
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

  // --- Modal Logic --- Add these methods! ---
  
  openSolveModal(id: number) {
    this.selectedProblemId = id;
    this.officialResponseText = '';
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedProblemId = null;
    this.officialResponseText = '';
  }


  // --- Navigation Methods ---
  
  updateStatusToReviewPending(id: number) {
    // Standard browser confirmation (Toastr is for notifications, not confirmations)
    if (confirm('Are you sure you want to mark this problem as Review Pending?')) {
      
      this.api.updateProblemStatus(id).subscribe({
        next: (res) => {
          // Triggers a green success toast
          this.toastr.success('Status updated to Review Pending successfully!', 'Success');
          
          // Refresh the list so the UI updates
          this.fetchProblems(); 
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error updating status:', err);
          
          // Extracts the specific error message from your Spring Boot backend if available
          const errorMessage = err.error || 'Failed to update problem status.';
          
          // Triggers a red error toast with the backend message
          this.toastr.error(errorMessage, 'Error');
        }
      });
      
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
  
  goToCitizens(){}
  goToManageReports(){}
  goToAnalytics(){}
}
