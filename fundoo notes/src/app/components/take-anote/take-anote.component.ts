import { Component, OnInit, ViewChild } from '@angular/core';
import { NoteServiceService } from '../../services/noteService/note-service.service';
import { DataSharingService } from '../../services/dataSharing/data-sharing.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconsComponent } from '../icons/icons.component';

@Component({
  selector: 'app-take-anote',
  templateUrl: './take-anote.component.html',
  styleUrls: ['./take-anote.component.scss']
})

export class TakeANoteComponent implements OnInit {
  isOpen=true;
  title="";
  description="";
  hide=true;

  // @ViewChild(IconsComponent) child:any;


  color:any;

  // ngAfterViewInit() {
  //   this.color = this.child.color
  // }

  constructor(private noteService: NoteServiceService, 
              private dataService: DataSharingService, 
              private snackBar: MatSnackBar) {}

  click() { this.isOpen = true; }

  ngOnInit(): void {
    // this.color = this.child.color
  }

  get myMethodFunc() {
    return this.createNote.bind(this);
  }

  createNote(){
    let data={
      title:this.title,
      description:this.description
    } 
    this.noteService.createNote(data).subscribe((response) => {
      this.snackBar.open("Note created");
      this.dataService.changeMessage("Note added successful");
      this.isOpen=true;
      this.title="";
      this.description="";
    })
  }
}