import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from "./must-match.validator";
import { UserServiceService } from '../../services/userService/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserServiceService, private route: Router) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
      }, {
        validator: MustMatch('password', 'confirmPassword')
      });
    }

  signUp=(signUpFormValue: { firstName: any; lastName: any; email: any; password: any; })=> {
    this.submitted = true;

      if (this.registerForm.invalid) return;

    let newUser={
      firstName: signUpFormValue.firstName,
      lastName: signUpFormValue.lastName,
      email: signUpFormValue.email,
      password: signUpFormValue.password,
      service: 'advance'
    }

    this.userService.registerUser(newUser).subscribe((response: any) => {
      console.log("Successful sign up: ", response);
      this.route.navigate(['/signIn']);
    });
  }
}