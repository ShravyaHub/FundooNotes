import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import { AuthGuardServiceService } from '../AuthGuardService/auth-guard-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements CanActivate{
  constructor(private Authguardservice: AuthGuardServiceService, 
              private router: Router) {}  
  
  canActivate(): boolean {  
    if (!this.Authguardservice.gettoken()) { this.router.navigateByUrl("/signIn"); }  
    return this.Authguardservice.gettoken();  
  }  
}