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

    // 4. Count them using your EXACT Java Enum strings
    this.pendingCount = uniqueProblems.filter(p => p.status === 'NOT_STARTED').length;
    
    // FIXED: Changed 'IN_PROGRESS' to 'PROGRESS' to match backend
    // We can also include 'REVIEW_PENDING' in the In Progress count if you want it tracked here
    this.inProgressCount = uniqueProblems.filter(p => p.status === 'PROGRESS' || p.status === 'REVIEW_PENDING').length;
    
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
    
    this.pendingCount = this.allProblems.filter(p => p.status === 'NOT_STARTED').length;
    this.inProgressCount = this.allProblems.filter(p => p.status === 'PROGRESS' || p.status === 'REVIEW_PENDING').length;
    this.solvedCount = this.allProblems.filter(p => p.status === 'COMPLETED').length;

    if (this.totalCount > 0) {
      this.resolutionRate = Math.round((this.solvedCount / this.totalCount) * 100);
    } else {
      this.resolutionRate = 0;
    }
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

  adminPoints: number = 0;
  adminAttempted: number = 0;
  adminSolved: number = 0;
  adminReported: number = 0;

  ngOnInit(): void {
    this.loadUser();
    this.validUser();
    if (this.token) {
      this.fetchAnalyticsData();
      this.fetchMyAssignedWork();
      this.fetchAdminPerformance(); 
    }
  }

  fetchAdminPerformance() {
    // Make sure your apiService has a method that calls '/getUAdminData'
    this.apiService.getUAdminData().subscribe({
      next: (res: any) => {
        // Map the backend entity fields to your TS variables
        this.adminPoints = res.totPoints || 0;
        this.adminAttempted = res.totalProblemAttempted || 0;
        this.adminSolved = res.totProblemSolved || 0;
        this.adminReported = res.totProblemsReported || 0;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching admin performance data:', err);
      }
    });
  }

  // --- Navigation Methods ---

  goToManageProblems() {
    if (this.token) {
      // Matches the path in your app.routes.ts
      this.router.navigate(['/admin-opted-problem']); 
    } else {
      this.router.navigate(['/admin-login']);
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

  goToAnalytics() {
    if (this.token) {
      // Matches the path in your app.routes.ts
      this.router.navigate(['/admin-analytics']); 
    } else {
      this.router.navigate(['/admin-login']);
    }
  }
}