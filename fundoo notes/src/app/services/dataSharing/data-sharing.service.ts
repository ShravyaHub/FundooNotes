import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataSharingService {
  constructor() {}

  private messageSource=new BehaviorSubject('');
  private valueSource = new BehaviorSubject<boolean>(false);
  currentValue = this.valueSource.asObservable();


  currentMessage=this.messageSource.asObservable();

  changeMessage(message:string) { this.messageSource.next(message); }
  changeValue(value:boolean) { this.valueSource.next(value); }
}
