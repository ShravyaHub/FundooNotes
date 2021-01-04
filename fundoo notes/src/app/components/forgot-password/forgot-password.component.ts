import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../services/userService/user-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserServiceService) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
      }, {});
  }

  forgotPassword=(forgotPasswordFormValue: { email: any; })=> {
    this.submitted = true;

    if (this.forgotPasswordForm.invalid) return;
      
    let email={
      email: forgotPasswordFormValue.email,
      service: 'advance'
    }

    this.userService.forgotPassword(email).subscribe((response: any) => {
      console.log("Successful: ", response);
    });
  }
}