import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NoteServiceService } from '../../services/noteService/note-service.service';
// import {DisplayComponent} from '../display/display.component';

@Component({
  selector: 'app-take-anote',
  templateUrl: './take-anote.component.html',
  styleUrls: ['./take-anote.component.scss']
})
export class TakeANoteComponent implements OnInit {

  isOpen = true;
  title=''
  description=''
  setColor=''
  hide = true;
  click() {
    this.isOpen = true;
  }
  constructor(private noteService: NoteServiceService) { }

  ngOnInit(): void {
  }
  addNote(){
    let data={
      title:this.title,
      description:this.description
    } 
    console.log(" add note data ", data);
    this.noteService.createNote(data).subscribe((response:any) => {
      console.log(response);
      let message="note creation successfull"
      console.log(message); 
      // this.display.displayNotes();
    })
  }

}
