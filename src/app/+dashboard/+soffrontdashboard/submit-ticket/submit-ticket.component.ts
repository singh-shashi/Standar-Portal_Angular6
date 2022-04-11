import { NotificationService } from './../../../shared/utils/notification.service';
import { Ticket } from '../../../shared/models/ticket';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuthService } from '../../../+auth/auth.service';

import { PortalUser } from '../../../shared/models/portaluser';
import { JsonApiService } from '../../../core/api/json-api.service';
@Component({
  selector: 'app-submit-ticket',
  templateUrl: './submit-ticket.component.html',
  styleUrls: [
    './submit-ticket.component.css'
  ]
})
export class SubmitTicketComponent implements OnInit {
  public loading = false;
  public loggedInUser: PortalUser;
  public newticketinfo: Ticket;
  public fileToUpload: File = null;
  public filesdata: any;
  public ticketid: number;
  public  files;
  public filesps;
  public formData: FormData = new FormData();
  // public formData: FormData = new FormData();
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() LoggedInUser: PortalUser;
  @ViewChild('fileInput') fileInput;

  public browserclass;

  constructor(private authService: AuthService, private notificationService: NotificationService ) { }

  ngOnInit() {// debugger;
    this.ApiKey = this.authService.ApiKey;
    this.loggedInUser = this.authService.LoggedInUser;
    this.newticketinfo = new Ticket();
    this.newticketinfo.Status = 'Group Queue';
    this.newticketinfo.Account = this.loggedInUser.selectedAccount.Company;
    this.newticketinfo.EndUser = this.loggedInUser.contact.FullName;
    this.newticketinfo.Contact = this.loggedInUser.contact.FullName;
    this.newticketinfo.Source = 'Web';
    this.newticketinfo.CallTime = this.authService.convertLocalToUtc(new Date(), -5);
    this.newticketinfo.CustType = '';
    this.newticketinfo.Category = '';
    this.newticketinfo.Urgency = '';
    this.newticketinfo.BusImpact = '';
    this.newticketinfo.Classifica = '';
    this.newticketinfo.Risk = '';
    this.newticketinfo.Synopsis = '';
    this.newticketinfo.Detail = '';
    this.newticketinfo.TestCaseq = '';
    this.newticketinfo.Environ = '';
    this.newticketinfo.BrowserVer = '';

    this.browserclass = 'true';
  }
  handleFileInput(event) {// debugger;
    alert('changed');

    const file: File = event.target.files[0];
    this.formData = new FormData();
    this.formData.append('uploadFile', file, file.name);

    this.files.forEach(element => {
      this.formData.append('file', element);
    });
}

  submitticket() { // debugger;

    this.browserclass = 'true';
    if (this.newticketinfo.CustType === '') {
      this.browserclass = 'false';
       return false;
    } else if ( this.newticketinfo.Category === '') {
      this.browserclass = 'false';
      return false;
    } else if ( this.newticketinfo.Urgency === '') {
      this.browserclass = 'false';
      return false;
    } else if ( this.newticketinfo.BusImpact === '') {
      this.browserclass = 'false';
      return false;
    } else if ( this.newticketinfo.Classifica === '') {
      this.browserclass = 'false';
      return false;
    } else if ( this.newticketinfo.Risk === '') {
      this.browserclass = 'false';
      return false;
    } else if ( this.newticketinfo.Synopsis === '') {
      this.browserclass = 'false';
      return false;
    } else if ( this.newticketinfo.Detail === '') {
      this.browserclass = 'false';
      return false;
    } else if ( this.newticketinfo.TestCaseq === '') {
      this.browserclass = 'false';
      return false;
    } else if ( this.newticketinfo.Environ === '') {
      this.browserclass = 'false';
      return false;
    } else if ( this.newticketinfo.BrowserVer === '') {
      this.browserclass = 'false';
      return false;
    }
    const fileBrowser = this.fileInput.nativeElement;
    if ( fileBrowser.files.length > 0) {
     
    }

    this.loading = true;
    window.scroll(0, 0);
    this.newticketinfo.saveticket(this.ApiKey, 'Account', this.loggedInUser.selectedAccount.AcctID,
      'Ticket', this.JsonApiService, [{ 'Contact': this.loggedInUser.contact.Contact.toString() }]).subscribe(
        data => {
           // alert(data.Message);
          this.ticketid = data.Object;
          const fileBrowser = this.fileInput.nativeElement;
          if ( fileBrowser.files.length > 0) {
            const formDaata = new FormData();

            for (let i = 0; i < fileBrowser.files.length; i++) {// debugger;
              formDaata.append(i.toString(), fileBrowser.files[i]);
            }
            this.newticketinfo.uploadfiles(this.ApiKey, 'Ticket',  this.ticketid,
             this.loggedInUser.contact.FullName, formDaata, this.JsonApiService).subscribe(data => {
             if (data.Object === true) {
                this.notificationService.soffrontalert('Ticket has been submitted successfully.');
                this.fileInput.nativeElement.value = '';
             } else {
             this.notificationService.soffronterroralert('File not attached');
             }
                this.loading = false;
                this.ngOnInit();
            });
          } else {
            this.notificationService.soffrontalert('Ticket has been submitted successfully.');
            this.loading = false;

            this.ngOnInit();
          }
//           }


    })

  }
  onChange(event: any) {
    // debugger;
    this. filesps = [].slice.call(event.target.files);
  }
  generateArray(obj) {
    return Object.keys(obj).map((key) => { return obj[key]});
 }
}
