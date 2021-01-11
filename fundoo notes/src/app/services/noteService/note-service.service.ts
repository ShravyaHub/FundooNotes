import { Injectable } from '@angular/core';
import { HttpServiceService } from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root'
})

export class NoteServiceService {
  constructor(private http: HttpServiceService ) {}

  createNote(data:any) { return this.http.encodedPost('notes/addNotes', data); }

  getNote() { return this.http.get('notes/getNotesList'); }

  updateNote(data:any) { 
    console.log(data);
    return this.http.encodedPost('notes/updateNotes',data); }

  deleteNote(data:any) { return this.http.post('notes/trashNotes',data); }

  archiveNote(data:any) { return this.http.post("notes/archiveNotes", data); }

  getArchiveNotes() { return this.http.get('notes/getArchiveNotesList'); }

  getDeletedNotes() { return this.http.get("notes/getTrashNotesList"); }

  changeColorNotes(data:any) { return this.http.post("/notes/changesColorNotes", data); }

  deleteForever(data:any) { return this.http.post("/notes/deleteForeverNotes", data); }
}