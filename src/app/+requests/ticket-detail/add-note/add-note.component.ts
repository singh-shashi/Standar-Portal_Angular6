import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JsonApiService } from '../../../core/api/json-api.service';
import { AuthService } from '../../../+auth/auth.service';
import { PortalUser } from '../../../shared/models/portaluser';
import { NotificationService } from './../../../shared/utils/notification.service';
import { Note } from '../../../shared/models/Note';


@Component({
  selector: 'app-addnote',
  templateUrl: './add-note.component.html'
})
export class AddNoteComponent implements OnInit {
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() TicketID: number;
  @Output() onCancelnoteform = new EventEmitter<void>();
  public loading = false;
  public loggedInUser: PortalUser;
  public formData: FormData = new FormData();
  public browserclass;


  public noteData: Note;

  constructor(private authService: AuthService, private notificationService: NotificationService) { }
  ngOnInit() {
    this.browserclass = 'true';

    this.noteData = new Note();
    this.noteData.Subject = 'Additional info';
    this.noteData.NoteText = '';
    this.noteData.Status = 'Public';
    this.noteData.Author = this.authService.LoggedInUser.contact.FullName;
    this.noteData.NoteDate = '';
    this.noteData.NoteType = 'Ticket';
    this.noteData.RCode = 'Portal';

    const noteconfig = this.JsonApiService.getSoffrontNoteConfig();
    this.noteData[noteconfig.NoteAccessField] = noteconfig.NoteAccessFieldValue;
  }

  addnote() {
    this.loading = true;
    this.browserclass = 'true';
    if (this.noteData.NoteText === '' || this.noteData.NoteText === undefined) {
      this.notificationService.soffronterroralert('Please enter note details');
      this.browserclass = 'false';
      this.loading = false;
      return false;

    }

    this.noteData.saveNote(this.ApiKey, 'Ticket', this.TicketID, 'Note', this.JsonApiService,null,this.authService.LoggedInUser.contact.FullName).subscribe(() => {
      // alert('Success');
      this.notificationService.soffrontalert('Note has been added successfully');
      this.loading = false;
      this.ngOnInit();
      this.onCancelnoteform.emit();
    });
  }

  cancelNoteForm() {
    window.scroll(0, 0);
    this.onCancelnoteform.emit();
  }
}
