import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from "./must-match.validator";
import { UserServiceService } from '../../services/userService/user-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  submitted = false;
  token: any;
  
  constructor(private formBuilder: FormBuilder, private userService: UserServiceService, 
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  resetPassword=(resetPasswordFormValue: { password: any; })=> {
    this.submitted = true;

    if (this.resetPasswordForm.invalid) return;
      
    const newPassword = { 'newPassword': resetPasswordFormValue.password }

    this.token = this.activatedRoute.snapshot.paramMap.get('token');
    console.log(this.token);
    this.userService.resetPassword(newPassword, this.token).subscribe((response: any) => {
      console.log("Successful password reset: ", response);
    });
  }
}