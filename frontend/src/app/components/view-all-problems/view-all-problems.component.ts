import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-all-problems',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-all-problems.component.html',
  styleUrl: './view-all-problems.component.css'
})
export class ViewAllProblemsComponent implements OnInit {

  problems: any[] = [];
  loading = true;

  valid: boolean = true;
  token = localStorage.getItem('token');

  user: User | null = null;

  constructor(private api: ApiService, private toastr: ToastrService) {}

  // Load user from localStorage
  loadUser() {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      this.user = JSON.parse(storedUser);
    } else {
      this.user = null;
    }
  }

  // Validate JWT token
  validUser() {

    if (!this.token) {
      console.log("Token Invalid");
      this.valid = false;
      return;
    }

    this.api.validUser().subscribe({
      next: (response) => {

        if (response) {
          this.valid = true;
        } else {
          this.valid = false;
        }

      },
      error: (error: HttpErrorResponse) => {

        console.log('Invalid token:', error);
        this.valid = false;

      }
    });

  }

  ngOnInit(): void {

    this.validUser();
    this.loadUser();

    if (!this.token) {
      this.loading = false;
      return;
    }

    this.api.viewAllProblems().subscribe({

      next: (res: any) => {

        // add rating + message fields for UI
        this.problems = res.map((p: any) => ({
          ...p,
          userRating: 0,  // Temporary rating for UI
          userMessage: ''  // Temporary message for UI
        }));

        this.loading = false;

      },

      error: (err) => {

        console.error(err);
        this.loading = false;

      }

    });

  }

  // ⭐ Star rating click
  setRating(problem: any, rating: number) {

    problem.userRating = rating;

  }

  // Submit review
  submitReview(problem: any) {

    if (!problem.userMessage || !problem.userRating) {

      alert("Please add message and rating");
      return;

    }

    // Call API with the correct parameter names that backend expects
    this.api.reviewAndCompleteProblem(
      problem.id,
      problem.userMessage,  // This becomes userResponse in backend
      problem.userRating     // This becomes rating in backend
    ).subscribe({

      next: (response: any) => {

        alert("Review submitted successfully");

        // Update the problem with the actual response from user
        problem.userResponse = problem.userMessage;  // This will show the user response
        problem.rating = problem.userRating;         // This will show the rating
        problem.status = "COMPLETED";                 // Update status to COMPLETED

        // Clear temporary fields
        problem.userMessage = '';
        problem.userRating = 0;

      },

      error: (err) => {

        console.error('Full error:', err);
        
        if (err.status === 401) {
          if (err.error && err.error.includes("Still in Progress")) {
            this.toastr.warning("This problem is still in progress and cannot be reviewed yet");
          } else {
            this.toastr.error("You are not authorized to review this problem");
          }

        } else if (err.status === 400) {

          this.toastr.error(err.error || "Problem already reviewed or invalid request");

        } else if (err.status === 200){
          this.toastr.success("Success: " + err.status);

        }

      }
    });
  }

}