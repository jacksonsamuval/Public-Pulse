import { Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin/login/login.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { SubmitFormComponent } from './components/submit-form/submit-form.component';
import { ViewAllProblemsComponent } from './components/view-all-problems/view-all-problems.component';
import { ViewCompletedProblemComponent } from './components/view-completed-problem/view-completed-problem.component';
import { ViewPoliticiansComponent } from './components/view-politicians/view-politicians.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AdminRegisterComponent } from './components/admin/register/register.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '', component: HomeComponent},
    { path: 'submitForm', component: SubmitFormComponent},
    { path: 'viewAllProblems', component: ViewAllProblemsComponent},
    { path: 'viewCompletedProblems', component: ViewCompletedProblemComponent},
    { path: 'viewPoliticians', component: ViewPoliticiansComponent},
    { path: 'aboutUs', component: AboutUsComponent},
    { path: 'admin-login', component: AdminLoginComponent},
    { path: 'admin-register', component: AdminRegisterComponent},
    { path: 'admin-home', component: AdminHomeComponent}
];
