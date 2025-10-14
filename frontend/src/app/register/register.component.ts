import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [RouterModule,ToastrModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  
  constructor(private toastr: ToastrService) {}
  ngOnInit(): void {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
