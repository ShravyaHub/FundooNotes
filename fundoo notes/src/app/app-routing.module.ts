import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NoteComponent } from './components/note/note.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {AuthServiceService} from '../app/services/AuthService/auth-service.service';

const routes: Routes = [{ path: '', pathMatch: 'full', redirectTo: '/signUp'},
                        {path: 'signUp', component: SignUpComponent},
                        {path: 'signIn', component: SignInComponent},
                        {path: 'resetpassword/:token', component: ResetPasswordComponent},
                        {path: 'forgotPassword', component: ForgotPasswordComponent},
                        
                        {path: 'dashboard', component: DashboardComponent, 
                        children: [
                          {path: '', component: NoteComponent },
                          {path: 'note', component: NoteComponent },
                          {path: 'archive', component: NoteComponent},
                          {path: 'trash', component: NoteComponent},
                          
                        ], canActivate:[AuthServiceService]},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
