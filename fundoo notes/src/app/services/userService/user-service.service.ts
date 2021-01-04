import { Injectable } from '@angular/core';
import { HttpServiceService } from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpService: HttpServiceService) { }

  registerUser(data: any) {
    console.log("Data in user service: ", data);
    return this.httpService.post("user/userSignUp", data);
  }

  loginUser(data: any) {
    return this.httpService.post("user/login", data);
  }

  resetPassword(resetPasswordData: any,token: any){
    return this.httpService.encodedPost("user/reset-password", resetPasswordData);
  }

  forgotPassword(data: any) {
    return this.httpService.post("user/reset", data);
  }

}
