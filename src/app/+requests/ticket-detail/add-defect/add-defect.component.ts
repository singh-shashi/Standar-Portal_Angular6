import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { JsonApiService } from '../../../core/api/json-api.service';
import { AuthService } from '../../../+auth/auth.service';
import { NotificationService } from './../../../shared/utils/notification.service';


@Component({
  selector: 'app-add-defect',
  templateUrl: './add-defect.component.html',
  styleUrls: [
    './add-defect.component.css'
  ]
})
export class AddDefectComponent implements OnInit {
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() TicketID: number;
  @Output() onCanceldefectform = new EventEmitter<void>();
  public loading = false;
  public Synopsis: string;
  public Details: string;
  public Steps: string;
  public Environ: string;
  public DefType: string;
  public formData: FormData = new FormData();
  public browserclass;

  constructor(private authService: AuthService, private notificationService : NotificationService) { }

  ngOnInit() {
    this.Synopsis = '';
    this.Details = '';
    this.Steps = '';
    this.Environ = 'Production';
    this.DefType = 'Bug';
    this.browserclass = 'true';
  }

  savedefect() {


    this.browserclass = 'true';
    if (this.Synopsis === '') {
      this.browserclass = 'false';
       return false;

    } else if ( this.DefType === '') {
      this.browserclass = 'false';
      return false;
    }

    // this.notesub= notesubject;
    this.loading = true;
    const data = {
      'Synopsis': this.Synopsis,
      'Details': this.Details,
      'Steps': this.Steps,
      'Status': 'Open',
      'Submitter': this.authService.LoggedInUser.contact.FullName,
      'Environ' : this.Environ,
      'DefType' : this.DefType,
      'SubDate': this.authService.convertLocalToUtc(new Date(), -5)
    };
    this.JsonApiService.AddRecFun(this.ApiKey, 'Ticket', this.TicketID, 'Defect', data, null,this.authService.LoggedInUser.contact.FullName).subscribe(() => {
      // alert('Success');
      this.notificationService.soffrontalert('Defect has been submitted successfully');
      this.loading = false;
      this.ngOnInit();
      this.onCanceldefectform.emit();
    });
  }
  cancelform() {
    window.scroll(0,0);
    this.onCanceldefectform.emit();
  }

}
