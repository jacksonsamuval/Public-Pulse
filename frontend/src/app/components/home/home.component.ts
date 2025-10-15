import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

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
}
