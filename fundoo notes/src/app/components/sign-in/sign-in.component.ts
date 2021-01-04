import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../services/userService/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserServiceService, private route: Router,) {}

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      }, {});
    }

  signIn=(signInFormValue: { email: any; password: any; })=> {
    this.submitted = true;

    if (this.signInForm.invalid) return;
      
    let user={
      email: signInFormValue.email,
      password: signInFormValue.password,
      service: 'advance'
    }
        
    this.userService.loginUser(user).subscribe((response: any) => {
      console.log("Successful sign in: ", response);
      localStorage.setItem("token", response.id);
      this.route.navigate(['/dashboard']);
    });
  }
}