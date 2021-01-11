import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteServiceService } from '../../services/noteService/note-service.service';
import { DataSharingService } from '../../services/dataSharing/data-sharing.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TakeANoteComponent } from '../take-anote/take-anote.component';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})

export class IconsComponent implements OnInit {
  @Input() note:any;
  @Input() title!:string
  @Input() description!:string;
  @Input() createNote!:Function;
  @Input() selectedID!:string;

  notes:any;
  id:any;
  notesArr:any;
  colorGroup1=["#FFFFFF", "#F28B82", "#FBBC04", "#FFF475"];
  colorGroup2=["#CCFF90", "#A7FFEB", "#CBF0F8", "#AECBFA"];
  colorGroup3=["#D7AEFB", "#FDCFE8", "#E6C9A8", "#E8EAED"];

  constructor(private noteService:NoteServiceService, 
              private snackBar:MatSnackBar, 
              private dataService:DataSharingService, 
              private takeANote:TakeANoteComponent) {
                console.log("This is ", this.note)
              }

  ngOnInit(): void {}

  color:any;

  noteColor(colored:any) {
    console.log(this.selectedID);
    if(this.note !== undefined || this.selectedID !== undefined) {
      let data;
      if(this.note !== undefined) {
      data={
        noteIdList:[this.note.id],
        color: colored
      }
    } else {
      data={
        noteIdList:[this.selectedID],
        color: colored
      }
    }
      this.noteService.changeColorNotes(data).subscribe((response)=>{
        this.dataService.changeMessage("Color change successful");
      })
    }else {

    this.color = colored;
    this.createNote();
    this.noteService.getNote().subscribe((response:any) => {
      this.notes=response.data.data;
      this.notesArr=[this.notes.slice(-1)[0].id];
      let data={
        noteIdList:this.notesArr,
        color: colored
      }
  
      this.noteService.changeColorNotes(data).subscribe((response)=>{
        this.dataService.changeMessage("Color change successful");
      })
    })
  }
  }

  
  deleteNote() {
    console.log(this.selectedID);
    if(this.note !== undefined || this.selectedID !== undefined) {
      let data;
      if(this.note !== undefined) {
      data={
        noteIdList:[this.note.id],
        isDeleted:true
      }
    } else {
      data={
        noteIdList:[this.selectedID],
        isDeleted:true
      }
    }
  
      this.noteService.deleteNote(data).subscribe((response)=>{
        this.snackBar.open("Note deleted");
        this.dataService.changeMessage("Deletion successful");
      })
    }else {
    this.createNote();
    this.noteService.getNote().subscribe((response:any) => {
      this.notes=response.data.data;
      this.notesArr=[this.notes.slice(-1)[0].id];
      let data={
        noteIdList:this.notesArr,
        isDeleted:true
      }
  
      this.noteService.deleteNote(data).subscribe((response)=>{
        this.snackBar.open("Note deleted");
        this.dataService.changeMessage("Deletion successful");
      })
    })
  }
  }
  
  archiveNote() {
    // console.log(this.note.id)
    if(this.note !== undefined  || this.selectedID !== undefined) {
      let data;
      if(this.note !== undefined) {
      data={
        noteIdList:[this.note.id],
        isArchived:true
      }
    } else {
      data={
        noteIdList:[this.selectedID],
        isArchived:true
      }
    }
  
      this.noteService.archiveNote(data).subscribe((response) => {
        this.snackBar.open("Note archived");
          this.dataService.changeMessage("Archive successful");
        })
    }else {
    this.createNote();
    this.noteService.getNote().subscribe((response:any) => {
      this.notes=response.data.data;
      this.notesArr=[this.notes.slice(-1)[0].id];
      let data = {
        noteIdList: this.notesArr,
        isArchived: true
      }
  
      this.noteService.archiveNote(data).subscribe((response) => {
        this.snackBar.open("Note archived");
          this.dataService.changeMessage("Archive successful");
        })
      })
    }

    }
}