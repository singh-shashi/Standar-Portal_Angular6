
import { JsonApiService } from '../../core/api/json-api.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../+auth/auth.service';
import { Contact } from '../../shared/models/contact';
import { NotificationService } from '../../shared/utils/notification.service';
import { EmailService } from '../../shared/services/email.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  private emailService: EmailService;
  public apiKey = '';
  public passwordinfo: Contact;
  public newcontactinfo: Contact;
  public newpassword;
  public retypepassword;
  public oldpassword;

  loading = false;

  get myprof(): Contact {// debugger;
    return this.passwordinfo;
  }

  constructor(public jsonApiService: JsonApiService, private authService: AuthService,
    private notificationService: NotificationService) { }


  ngOnInit() {
    this.apiKey = this.authService.ApiKey;
    this.passwordinfo = (new Contact()).deserialize(this.authService.LoggedInUser.contact);

    this.emailService = new EmailService(this.jsonApiService);
  }
  updatepassword() {
    if (this.oldpassword === undefined || this.oldpassword.trim() === '') {
      this.notificationService.soffronterroralert('Please enter correct password');
      return false;
    }
    if (this.newpassword === undefined || this.newpassword.trim() === '') {
      this.notificationService.soffronterroralert('Please enter correct password');
      return false;
    }
   
    if (this.retypepassword === undefined || this.retypepassword.trim() === '') {
      this.notificationService.soffronterroralert('Please enter correct password');
      return false;
    }
    if (this.newpassword !== this.retypepassword) {
      // alert('Mismatch is there, please retype');
      this.notificationService.soffronterroralert('Please verify your new password.');
      return false;
    } else if (this.oldpassword !== localStorage.getItem('LogPsw').toString().trim()) {
      this.notificationService.soffronterroralert('Please enter correct password');
      // alert('Please enter correct password');
      return false;
    } else {
      this.loading = true;
      this.passwordinfo.Pswd = this.newpassword;
      const update$ = this.passwordinfo.update(this.apiKey, this.jsonApiService).subscribe(() => {
        // alert('Success');
        this.notificationService.soffrontalert('Password has been updated successfully');
        this.loading = false;
        update$.unsubscribe();

        let fullNameString = '';
        if (this.authService.LoggedInUser.contact.FullName == null || this.authService.LoggedInUser.contact.FullName === '') {
          fullNameString = this.authService.LoggedInUser.contact.email;
        } else {
          fullNameString = this.authService.LoggedInUser.contact.FullName;
        }

        const emailBody = 'Hello ' + fullNameString + ', <br /><br />' +
          'Your password has been changed. Log in with the following credentials henceforth.<br /><br />' +
          'Email address : ' + this.authService.LoggedInUser.contact.email + ' <br />' +
          'Password : ' + this.newpassword + ' <br /><br />' +
          'Thank You, <br />' +
          'Administration';

        const emailToContact = {};
        emailToContact[fullNameString] = this.authService.LoggedInUser.contact.email;

        const email$ = this.emailService.sendMail(this.apiKey,
          'Password Changed.',
          emailBody,
          [emailToContact]).subscribe(() => {
            email$.unsubscribe();
            this.authService.updateContactInformationToSession(this.passwordinfo);
          });
      });
    }
  }

  passwordVerifyError() {
    return this.newpassword !== this.retypepassword;
  }
}
