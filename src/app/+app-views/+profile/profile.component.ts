
import { JsonApiService } from '../../core/api/json-api.service';
import { Component, OnInit } from '@angular/core';
import { FadeInTop } from '../../shared/animations/fade-in-top.decorator';
import { AuthService } from '../../+auth/auth.service';
import { Contact } from '../../shared/models/contact';
import { NotificationService } from '../../shared/utils/notification.service';

@FadeInTop()
@Component({
  selector: 'sa-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  public loggedInUsert;
  public firstname;
  public ancecols = [];
  public apiKey = '';
  public profileinfo: Contact;
  loading = false;

  get myprof(): Contact {
    return this.profileinfo;
  }

  constructor(public jsonApiService: JsonApiService, private authService: AuthService,
     private notificationService : NotificationService) { }

  ngOnInit() {
    this.apiKey = this.authService.ApiKey;
    this.profileinfo = (new Contact()).deserialize(this.authService.LoggedInUser.contact);
  }

  updateprofile() {// debugger;
    this.loading = true;
    const update$ = this.profileinfo.update(this.apiKey, this.jsonApiService).subscribe(() => {
      // alert('Success');
      this.notificationService.soffrontalert('Profile has been updated successfully');
      update$.unsubscribe();
      this.authService.updateContactInformationToSession(this.profileinfo);
      this.loading = false;
    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
