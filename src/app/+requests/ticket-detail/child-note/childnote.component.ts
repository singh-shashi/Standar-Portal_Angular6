import { OnInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-childnote',
  templateUrl: './childnote.component.html',
  styleUrls: [
    './childnote.component.css'
  ]
})
export class ChildNoteComponent implements OnInit {

  public loading = false;
  @Input() ChildNoteRecord: any;
  @Input() SelectedNoteID: any;
  public noteuniquetext = '';
  constructor() { }
  ngOnInit() {
    // debugger;
    this.ChildNoteRecord.Subject = this.ChildNoteRecord.Subject == null ? '' : this.ChildNoteRecord.Subject;
    this.ChildNoteRecord.NoteText = this.ChildNoteRecord.NoteText == null ? '' : this.ChildNoteRecord.NoteText;
    this.ChildNoteRecord.Subject = this.ChildNoteRecord.Subject.replace(/(?:\r\n|\r|\n)/g, '<br>');
    this.ChildNoteRecord.NoteText = this.ChildNoteRecord.NoteText.replace(/(?:\r\n|\r|\n)/g, '<br>');
    this.noteuniquetext = 'collapseSummary_' + this.ChildNoteRecord.FormId;
  }
}
