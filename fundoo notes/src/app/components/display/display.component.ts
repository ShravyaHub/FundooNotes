import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { NoteServiceService } from '../../services/noteService/note-service.service';
import {MatDialog} from '@angular/material/dialog';
import {UpdateNoteComponent} from '../update-note/update-note.component';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})

export class DisplayComponent implements OnInit {

  constructor(private noteService: NoteServiceService, private dialog: MatDialog) { }
  @Output() getNotes:EventEmitter<any>=new EventEmitter();
  title: any;
  content: any;
  data: any;
  isOpen = true;
  // title=''
  // description=''
  setColor=''
  hide = true;
  click() {
    this.isOpen = true;
  }

  ngOnInit(): void {
    this.displayNotes();
  }

  displayNotes() {
    this.noteService.getNote().subscribe((response:any) => {
      this.data=response.data.data;
      response.data.data.forEach((element: any) => {
        // this.title=element.title;
        // this.content=element.description;
        console.log(element.title);
      });
    })
  }

  openDialog(item: any) {
    this.dialog.open(UpdateNoteComponent, {
      data: item
    });
  }

}