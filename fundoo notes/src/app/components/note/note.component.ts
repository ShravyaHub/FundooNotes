import { Component, OnInit, ViewChild } from '@angular/core';
import {DisplayComponent} from '../display/display.component';
import { NoteServiceService } from '../../services/noteService/note-service.service';
import {DataSharingService} from '../../services/dataSharing/data-sharing.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})

export class NoteComponent implements OnInit {
  @ViewChild(DisplayComponent) display: any;
  data: any;
  notes: any;
  edited=true;
  deleted=false;

  constructor(private noteService: NoteServiceService, 
              private dataService: DataSharingService, 
              private route: ActivatedRoute) {}
 
  ngOnInit(): void {
    this.displayNotes();
    this.dataService.currentMessage.subscribe(res => {
      this.displayNotes();
    })
  }

  displayNotes() {
    if(this.route.snapshot.routeConfig?.path?.match("note")) {
      this.edited=true;
      return this.displayAllNotes();
    }
    else if(this.route.snapshot.routeConfig?.path?.match("archive")){
      this.edited=false;
      return this.displayArchivedNotes();
    }
    else if(this.route.snapshot.routeConfig?.path?.match("trash")){
      this.edited=false;
      return this.displayDeletedNotes();
    }
  }

  displayAllNotes() {
    this.deleted=false;
    this.noteService.getNote().subscribe((response:any) => {
      this.notes=response.data.data;
      this.data=this.notes.filter((element:any) => {
        return element.isDeleted==false && element.isArchived==false;
      })
    })
  }


  displayArchivedNotes() {
    this.deleted=false;
    this.noteService.getArchiveNotes().subscribe((response:any) => {
      this.notes=response.data.data;
      this.data=this.notes.filter((element:any) => {
        return element;
      })
    })
  }

  displayDeletedNotes() {
    this.deleted=true;
    this.noteService.getDeletedNotes().subscribe((response:any) => {
      this.notes=response.data.data;
      this.data=this.notes.filter((element: any) => {
        return element;
      })
    })
  }
}
