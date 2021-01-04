import { Injectable } from '@angular/core';
import { HttpServiceService } from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  constructor(private http: HttpServiceService ) { }

  createNote(data: any) {
    return this.http.encodedPost('notes/addNotes', data);

  }
  getNote(){
    return this.http.get('notes/getNotesList');
  }

  updateNote(data:any){
    return this.http.encodedPost('notes/updateNotes',data)
   }

   deleteNote(data:any){
    return this.http.encodedPost('notes/trashNotes',data)
  }

}
