import { Injectable } from '@angular/core';
import { HttpServiceService } from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  constructor(private httpService: HttpServiceService) {}

  registerUser(data:any) { return this.httpService.userPost("user/userSignUp", data); }

  loginUser(data:any) { return this.httpService.userPost("user/login", data); }

  resetPassword(data:any, token:string) { return this.httpService.encodedPost("user/reset-password", data); }

  forgotPassword(data:any) { return this.httpService.userPost("user/reset", data); }
}