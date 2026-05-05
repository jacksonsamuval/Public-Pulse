import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Router is imported here
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../../service/api.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-analytics',
  standalone: true,
  // NOTICE: We ONLY put RouterModule and CommonModule here. No Router!
  imports: [CommonModule, RouterModule], 
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit {

  valid: boolean = false; 
  token = localStorage.getItem('token');
  user: User | null = null;
  
  // Analytics Data
  loading: boolean = true;
  errorMsg: string = '';
  
  allProblems: any[] = [];
  myAssignedProblems: any[] = [];

  // KPIs
  totalCount: number = 0;
  pendingCount: number = 0;
  inProgressCount: number = 0;
  solvedCount: number = 0;
  resolutionRate: number = 0;

  constructor(
    private router: Router, // Router is INJECTED here, not in the imports array above
    private toastr: ToastrService, 
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.validUser();
    if (this.token) {
      this.fetchAnalyticsData();
      this.fetchMyAssignedWork();
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
      this.valid = false;
      this.router.navigate(['/admin-login']);
    } else {
      this.apiService.validUser().subscribe({
        next: (response) => {
          this.valid = !!response;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Invalid token:', error);
          this.valid = false;
          this.router.navigate(['/admin-login']);
        }
      });
    }
  }

  fetchAnalyticsData() {
    this.loading = true;
    this.apiService.adminGetAllProblems().subscribe({
      next: (res: any) => {
        this.allProblems = res || [];
        this.combineAndCalculateStats(); // Call our new combined method
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching analytics:', err);
        this.errorMsg = 'Failed to load analytics data.';
        this.loading = false;
        this.toastr.error('Could not load analytics', 'Error');
      }
    });
  }

  fetchMyAssignedWork() {
    this.apiService.getAssignedProblems().subscribe({
      next: (res: any) => {
        this.myAssignedProblems = res || [];
        this.combineAndCalculateStats(); // Call our new combined method
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching assigned problems:', err);
      }
    });
  }

  // --- NEW METHOD ---
  combineAndCalculateStats() {
    // 1. Combine Available problems and Assigned problems into one list
    const combinedProblems = [...this.allProblems, ...this.myAssignedProblems];
    
    // 2. Remove duplicates just in case a problem exists in both lists (checks by ID)
    const uniqueProblems = Array.from(new Map(combinedProblems.map(item => [item.id, item])).values());

    // 3. Set the true Total Count
    this.totalCount = uniqueProblems.length;

    // 4. Count them using your EXACT Java Enum strings: NOT_STARTED, IN_PROGRESS, COMPLETED
    this.pendingCount = uniqueProblems.filter(p => p.status === 'NOT_STARTED').length;
    this.inProgressCount = uniqueProblems.filter(p => p.status === 'IN_PROGRESS').length;
    this.solvedCount = uniqueProblems.filter(p => p.status === 'COMPLETED').length;

    // 5. Calculate percentage
    if (this.totalCount > 0) {
      this.resolutionRate = Math.round((this.solvedCount / this.totalCount) * 100);
    } else {
      this.resolutionRate = 0;
    }
  }

  calculateStats() {
    this.totalCount = this.allProblems.length;
    
    // NOTE: Adjust the strings ('PENDING', 'SOLVED', etc.) to match your actual backend status fields!
    this.pendingCount = this.allProblems.filter(p => p.status === 'PENDING' || p.status?.toLowerCase() === 'pending').length;
    this.inProgressCount = this.allProblems.filter(p => p.status === 'IN_PROGRESS' || p.status?.toLowerCase() === 'in progress').length;
    this.solvedCount = this.allProblems.filter(p => p.status === 'SOLVED' || p.status?.toLowerCase() === 'solved' || p.status === 'COMPLETED').length;

    if (this.totalCount > 0) {
      this.resolutionRate = Math.round((this.solvedCount / this.totalCount) * 100);
    } else {
      this.resolutionRate = 0;
    }
  }

  // --- Routing Methods ---
  goToAnalytics() {
    // Already here, do nothing
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.token = null;
    this.user = null;
    this.valid = false;
    
    this.toastr.success('Logged out successfully', 'Success');
    this.router.navigate(['/admin-login']); 
  }
}