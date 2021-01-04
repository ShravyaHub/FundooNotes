import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NoteServiceService } from '../../services/noteService/note-service.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {
  id: any;
  title: any;
  description: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private noteService: NoteServiceService, private dialogRef: MatDialogRef<UpdateNoteComponent>) {
    console.log(data, "Data from dialog box");
    this.id=data.id;
    this.title=data.title;
    this.description=data.description;
  }

  ngOnInit(): void {
  }

  editNotes() {
    let data={
      noteId: this.id,
      title:this.title,
      description:this.description
    } 
    this.noteService.updateNote(data)
      .subscribe((response: any) => {
        console.log("edit note response", response)
        this.dialogRef.close();
      })
  }

}
