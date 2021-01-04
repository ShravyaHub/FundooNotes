import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {
  [x: string]: any;
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  token: any;

  post(url: string, data: any) {

    this.token=localStorage.getItem('token');
    console.log("Data in HTTP: ", data);
    return this.http.post(this.baseURL + url, data);
  }

  encode(data: any) {
    const formBody = [];
    for (const property in data) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  encodedPost(url: any, data: any) {
    this.token=localStorage.getItem("token");
    console.log(this.token);
    let options = {
      headers: new HttpHeaders({
        'Authorization': this.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }
    return this.http.post(this.baseURL + url, this.encode(data), options)
  }
  get(url: any) {
    this.token=localStorage.getItem('token');
    console.log(this.token);
    let options = {
      headers: new HttpHeaders({
        'Authorization': this.token,
        'Content-Type': 'application/x-www-form-urlencoded'

      })
    }
    return this.http.get(this.baseURL + url, options);
  } 
}
