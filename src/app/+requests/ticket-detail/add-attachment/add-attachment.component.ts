import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { JsonApiService } from '../../../core/api/json-api.service';
import { AuthService } from '../../../+auth/auth.service';
import { NotificationService } from './../../../shared/utils/notification.service';

@Component({
  selector: 'app-add-attachment',
  templateUrl: './add-attachment.component.html'
})
export class AddAttachmentComponent implements OnInit {
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() TicketID: number;
  @Output() onCancelattachform = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput;
  @Input() AttachFile: any;2

  public files;
  public filesps;
  ChildRecords = [];
  loading = false;
  TotalFileSize: 0;
  constructor(private authService: AuthService, private notificationService: NotificationService) { }

  ngOnInit() {
  }

  cancelachment() {
    this.onCancelattachform.emit();
  }

  fileUplaod(event: any) {
    let tFsize=0;
    this.ChildRecords = JSON.parse(sessionStorage.getItem('sAttachFiles'));
    this.filesps = [].slice.call(event.target.files);
    for (let x = 0; x < event.target.files.length; x++) {

      if(event.target.files[x].name.indexOf('.msi')>=0 || event.target.files[x].name.indexOf('.exe')>=0 || event.target.files[x].name.indexOf('.bat')>=0)
          {
            this.notificationService.soffronterroralert('Executable file can not be allowed.');
              this.fileInput.nativeElement.value = '';
              this. filesps= null;
              return false;
          }
          if (event.target.files[x].name.search(/[<>|{}\=~`/:;,*!@$%^*+]/) >= 0)
          {
              this.notificationService.soffronterroralert('File name should not consist with special character (e.g. <>|{}\=~`/:;,*!@$%^*+)');
              this.fileInput.nativeElement.value = '';
              this. filesps= null;
              return false;
          }
       
      const sizel = event.target.files[x].size / 1000000;
      tFsize = tFsize + sizel;
      if ( tFsize >= 10) {
        this.notificationService.soffronterroralert('Maximum size of file (individual) is 10Mb.');
        this.fileInput.nativeElement.value = '';
        this.filesps = [];
        return false;
      }
      const dublicateFile = this.ChildRecords.find(f => f.DOCNAME.trim() === event.target.files[x].name.trim());
      if (dublicateFile !== undefined && dublicateFile !== null) {
        this.notificationService.soffronterroralert('Duplicate file not allowed!');
       this.fileInput.nativeElement.value = '';
       this.filesps = [];
       return false;
      }
    }
  }

  linkattachment() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files.length > 0) {
      this.loading = true;
      const formDaata = new FormData();
      for (let i = 0; i < fileBrowser.files.length; i++) { // debugger;
        formDaata.append(i.toString(), fileBrowser.files[i]);
      }

      return this.JsonApiService.AddAttachmentFun(this.ApiKey, 'Ticket',
        this.TicketID, this.authService.LoggedInUser.contact.FullName, formDaata).subscribe(data => {
          if (data.Object === true) {
            // alert('Success');
            this.notificationService.soffrontalert('File attached successfully');
            this.fileInput.nativeElement.value = '';
            this.loading = false;
            this.onCancelattachform.emit();
          } else {
            this.notificationService.soffronterroralert('File not attached');
            // alert('File not attached');
          }
          this.loading = false;
          this.ngOnInit();
        },
        err => {
          this.notificationService.soffronterroralert('Maximum request length exceeded.');
          this.loading = false;
        },
        );
    }
  }
}
