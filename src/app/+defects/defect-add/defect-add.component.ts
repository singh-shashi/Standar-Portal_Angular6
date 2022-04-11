import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JsonApiService } from '../../core/api/json-api.service';
import { Defect } from '../../shared/models/defect';
import { AuthService } from '../../+auth/auth.service';
import { PortalUser } from '../../shared/models/portaluser';
import { NotificationService } from '../../shared/utils/notification.service';

@Component({
  selector: 'app-defect-add',
  templateUrl: './defect-add.component.html'
})
export class DefectAddComponent implements OnInit {
  loading = false;
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Output() onCancelDefect = new EventEmitter<boolean>();

  public browserclass;
  public loggedInUser: PortalUser;
  public defect_data: Defect;
  constructor(private authService: AuthService, private notificationService: NotificationService) { }
  ngOnInit() {
    this.loggedInUser = this.authService.LoggedInUser;
    this.ResetDefect();
  }

  public CancelDefect() {
    this.onCancelDefect.emit(false);
  }
  ResetDefect() {
    this.defect_data = new Defect();
    this.defect_data.Status = 'Open';
    this.defect_data.DPublic = 'No';
    this.defect_data.SubDate = this.authService.convertLocalToUtc(new Date(), -5);
    this.defect_data.Submitter = this.loggedInUser.contact.FullName;
    this.browserclass = 'true';
    this.defect_data.Synopsis = '';
    this.defect_data.DefType = '';
  }
  SubmitDefect() {
    this.browserclass = 'true';
    // debugger;
    if (this.defect_data.Synopsis === '' || this.defect_data.Synopsis === undefined) {
      this.browserclass = 'false';
      return false;

    } else if (this.defect_data.DefType === '' || this.defect_data.DefType === undefined) {
      this.browserclass = 'false';
      return false;
    }
    this.loading=true;
    this.defect_data.add(this.ApiKey, this.JsonApiService, 'Account', this.loggedInUser.selectedAccount.AcctID)
      .subscribe(() => {
        this.notificationService.soffrontalert('Defect has been submitted successfully');
        this.ResetDefect();
        this.loading=false;
        this.onCancelDefect.emit(false);
      });
  }
}
