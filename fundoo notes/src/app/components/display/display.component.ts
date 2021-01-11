import { Component, OnInit, EventEmitter, Output, Injectable, Input} from '@angular/core';
import { NoteServiceService } from '../../services/noteService/note-service.service';
import {MatDialog} from '@angular/material/dialog';
import {UpdateNoteComponent} from '../update-note/update-note.component';
import { ActivatedRoute } from '@angular/router';
import {DataSharingService} from '../../services/dataSharing/data-sharing.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})

@Injectable()
export class DisplayComponent implements OnInit {
  @Input() noteArray: any;
  @Input() note: any;
  @Output() getNotes:EventEmitter<any>=new EventEmitter();
  title="";
  content="";
  data:any;
  isOpen=true;
  hide=true;
  id="";
  trashed=false;
  value: any;
  subscription:any;

  constructor(private noteService: NoteServiceService, 
              private snackBar: MatSnackBar, 
              private dataService: DataSharingService, 
              private dialog: MatDialog, 
              private route: ActivatedRoute) {}

  click() { this.isOpen = true; }

  ngOnInit(): void {
    if(this.route.snapshot.routeConfig?.path?.match("trash")) this.trashed=true;
    else this.trashed=false;
    this.subscription = this.dataService.currentValue.subscribe(value => {
      this.value = value
      console.log(this.value, "New");
    });
  }

  displayNotes() {
    this.noteService.getNote().subscribe((response:any) => {
      this.data=response.data.data;
      response.data.data.forEach((element:any) => {
        console.log(element)
        this.id=element.id;
      });
    })
  }

  openDialog(item:any) {
    this.dialog.open(UpdateNoteComponent, {
      data:item
    });
  }

  deleteNoteForever() {
    this.noteArray.forEach((element: any) => {
      this.id=element.id;
    });

    let data={
      noteIdList :[this.id], 
      isDeleted:false
    }

    this.noteService.deleteForever(data).subscribe((response)=>{
      console.log(response);
      this.snackBar.open("Note deleted permanently");
      this.dataService.changeMessage("Deletion successful");
    })
  }
}