import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteServiceService } from '../../services/noteService/note-service.service';
import { DataSharingService } from '../../services/dataSharing/data-sharing.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})

export class UpdateNoteComponent implements OnInit {
  id="";
  title="";
  description="";
  color:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
              private snackBar: MatSnackBar, 
              private dataService: DataSharingService, 
              private noteService: NoteServiceService, 
              private dialogRef: MatDialogRef<UpdateNoteComponent>) {
    this.id=data.id;
    this.title=data.title;
    this.description=data.description;
    this.color=data.color;
    console.log(data.color);
  }

  ngOnInit(): void {}

  editNotes() {
    let data={
      noteId: this.id,
      title:this.title,
      description:this.description
    } 
    this.noteService.updateNote(data).subscribe((response) => {
      this.dataService.changeMessage("Update successful");
      console.log(response)
      this.snackBar.open("Update successful");
      this.dialogRef.close();
    })
  }
}