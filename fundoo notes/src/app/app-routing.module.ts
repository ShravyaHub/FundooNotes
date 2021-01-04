import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NoteComponent } from './components/note/note.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [{ path: '', pathMatch: 'full', redirectTo: '/signUp'},
                        {path: 'signUp', component: SignUpComponent},
                        {path: 'signIn', component: SignInComponent},
                        {path: 'resetpassword/:token', component: ResetPasswordComponent},
                        {path: 'forgotPassword', component: ForgotPasswordComponent},
                        {path: 'dashboard', component: DashboardComponent,
                        children: [
                          {path: 'note', component: NoteComponent}
                        ]},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
