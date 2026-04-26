import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ApiService } from '../../service/api.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
selector: 'app-view-completed-problem',
standalone: true,

imports: [
CommonModule,
FormsModule,
RouterModule
],

templateUrl: './view-completed-problem.component.html',
styleUrls: ['./view-completed-problem.component.css']
})
export class ViewCompletedProblemComponent implements OnInit {

problems: any[] = [];
loading = true;

valid: boolean = true;
token = localStorage.getItem('token');

status: string = 'COMPLETED';
user: User | null = null;

constructor(private api: ApiService, private toastr: ToastrService) {}

ngOnInit(): void {
this.validUser();
this.loadUser();


if (!this.token) {
  this.loading = false;
  return;
}

this.loadProblems();


}

loadProblems() {
this.api.viewProblemsByStatus(this.status).subscribe({
next: (res: any) => {
this.problems = res.map((p: any) => ({
...p,
userRating: 0,
userMessage: ''
}));
this.loading = false;
},
error: () => {
this.toastr.error("Failed to load problems");
this.loading = false;
}
});
}

loadUser() {
const storedUser = localStorage.getItem('user');
this.user = storedUser ? JSON.parse(storedUser) : null;
}

validUser() {
if (!this.token) {
this.valid = false;
return;
}


this.api.validUser().subscribe({
  next: (res) => this.valid = !!res,
  error: () => this.valid = false
});


}

setRating(problem: any, rating: number) {
problem.userRating = rating;
}

submitReview(problem: any) {

if (!problem.userMessage || !problem.userRating) {
  this.toastr.warning("Please add message and rating");
  return;
}

this.api.reviewAndCompleteProblem(
  problem.id,
  problem.userMessage,
  problem.userRating
).subscribe({

  next: () => {

    problem.userResponse = problem.userMessage;
    problem.rating = problem.userRating;
    problem.status = "COMPLETED";

    problem.userMessage = '';
    problem.userRating = 0;

    this.toastr.success("Review submitted successfully");
  },

  error: (err: HttpErrorResponse) => {

    if (err.status === 401) {
      this.toastr.error("Unauthorized");
    } else if (err.status === 400) {
      this.toastr.error(err.error || "Invalid request");
    } else {
      this.toastr.error("Something went wrong");
    }

  }
});
}
}
