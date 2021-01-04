import { Component, OnInit } from '@angular/core';
import {NoteServiceService} from '../../services/noteService/note-service.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  constructor(private noteService: NoteServiceService) { }

  ngOnInit(): void {
  }

  deleteNote() {
    let data={
      // noteIdList:[this.id],
      isDeleted:true
    }

    this.noteService.deleteNote(data)
    .subscribe((response: any)=>{
      console.log(response);
    })
  }

}
