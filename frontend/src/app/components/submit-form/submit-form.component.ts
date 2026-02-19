import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-submit-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './submit-form.component.html',
  styleUrl: './submit-form.component.css'
})
export class SubmitFormComponent {

  constructor(private api: ApiService, private toastr: ToastrService, private router: Router) {}

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

  problem = {
    description: '',
    address: '',
    city: '',
    pincode: ''
  };

  selectedFile!: File;
  loading = false;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitProblem() {

    if (!this.problem.description || 
        !this.problem.address || 
        !this.problem.city || 
        !this.problem.pincode) {
      this.toastr.warning('Please fill all the Fields', 'Warning');
      return;
    }

    const formData = new FormData();
    formData.append('description', this.problem.description);
    formData.append('address', this.problem.address);
    formData.append('city', this.problem.city);
    formData.append('pincode', this.problem.pincode);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.loading = true;

    this.api.submitProblem(formData).subscribe({
      next: (res) => {
        this.loading = false;
        this.toastr.success('Successully Submitted', 'Success');
        
        this.resetForm();
        this.router.navigate(['']); 
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('Error Submiting Form', 'Error');
      }
    });
  }
  locationLoading = false;
  getLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
    return;
  }
  this.locationLoading = true;
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
        .then(response => response.json())
        .then(data => {
          const address = data.address;

          this.problem.address = data.display_name;
          this.problem.city = address.city || address.town || address.village;
          this.problem.pincode = address.postcode;

        })
        .catch(error => {
          console.error('Error fetching location details:', error);
        });
    },
    (error) => {
      alert('Unable to retrieve your location');
      console.error(error);
    }
  );
}


  resetForm() {
    this.problem = {
      description: '',
      address: '',
      city: '',
      pincode: ''
    };
    this.selectedFile = undefined as any;
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
}
