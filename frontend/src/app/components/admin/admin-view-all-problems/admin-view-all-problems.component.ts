import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'; // <-- Add OnInit
import { ApiService } from '../../../service/api.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-view-all-problems',
  standalone: true, // <-- Make sure this is here if using imports array
  imports: [CommonModule, FormsModule], // Removed duplicate CommonModule
  templateUrl: './admin-view-all-problems.component.html',
  styleUrl: './admin-view-all-problems.component.css'
})
export class AdminViewAllProblemsComponent implements OnInit {
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
    this.api.adminGetAllProblems().subscribe({
      next: (res: any) => {
        this.problems = res;
        this.loading = false;
      },
      error: (err) => {
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

  submitSolution() {
    if (!this.selectedProblemId || !this.officialResponseText.trim()) {
      return;
    }

    this.api.solveProblem(this.selectedProblemId, this.officialResponseText).subscribe({
      next: (res) => {
        this.toastr.success('Problem marked as solved successfully!');
        this.closeModal();
        this.fetchProblems(); // Refresh the list
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to submit solution.');
      }
    });
  }

  // --- Navigation Methods ---
  
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