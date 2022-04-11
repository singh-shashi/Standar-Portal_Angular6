import { NotificationService } from './../../shared/utils/notification.service';
import { EmailService } from './../../shared/services/email.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { JsonApiService } from '../../../app/core/api/json-api.service';




@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: [
    './forgot.component.css'
  ]
})
export class ForgotComponent implements OnInit {
   public _apikey: string;
   private emailservice: EmailService;
   public email;
   validateEmail = true;
  public browserclass;
   loading = false;
  constructor(private router: Router, private jsonApiService: JsonApiService, private notificationService: NotificationService ) { }

  ngOnInit() {
    this.emailservice = new EmailService(this.jsonApiService);
  }

  submit(event) {
    event.preventDefault();
    this.router.navigate(['/dashboard/+analytics'])
  }

  sendmail(email: string, password: string, FullName: string) {
    const mailbody = 'Hello ' + FullName + '<br/><br/> You are receiving this e-mail because you have ' +
     'requested your password information for our Support Portal.<br/><br/>Email address :' +
      email + '<br/>Password: ' + password + '<br/><br/>Thank You <br/>Administration';
    const mailsubject = 'Forget Password';
    const mailto = [{ 'Admin': email }];
    const mailcc = [];
    const mailbcc = [];
  return this.emailservice.sendMail(this._apikey, mailsubject, mailbody, mailto, mailcc, mailbcc).subscribe((sendmaildata) => {
   if(sendmaildata.ErrorCode==0 && sendmaildata.Object==true){
    this.notificationService.soffrontalert('Your password has been sent to your registered email address.');
    this.email = '';
   }
    this.loading = false;
  });
  }

  ForgotPassword() {
    this.loading = true;
    this.validateEmail = true;
    this.browserclass = 'true';
    const emailregexp = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
    if (this.email === '' || this.email === undefined) {
      this.browserclass = 'false';
      this.loading = false;
      return false;
    } else if (!emailregexp.test(this.email)) {
      this.browserclass = 'false';
      this.loading = false;
      this.validateEmail = false;
      return false;
    }

    const soffrontContactConfig = this.jsonApiService.getSoffrontContactConfig();
    const devKeyCall = this.jsonApiService.getDeveloperKey().subscribe((devKeydata) => {
      const devKey = devKeydata.toString();
      devKeyCall.unsubscribe();
      const SFTokenCall = this.jsonApiService.getSFToken(devKey).subscribe((data) => {
        this._apikey = data.toString();
        const whereCondition = 'email = \'' + this.email + '\' And PortalAcc = \'Yes\' And Status <> \'Inactive Contact\'';
        // tslint:disable-next-line:max-line-length
        return this.jsonApiService.SearchByPost(this._apikey, 'Contact', 'FName,LName,' + soffrontContactConfig.PasswordField + ' as Pswd', 0
        , 0, 'Company', 'ASC', whereCondition).subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          data => {

        if (data.Object.RESULTS !== undefined && data.Object.RESULTS.length>0 && data.Object.RESULTS!== null) {
          const password = data.Object.RESULTS[0].Pswd;
          const FullName = data.Object.RESULTS[0].FName + ' ' + data.Object.RESULTS[0].LName;
          this.sendmail(this.email, password, FullName);
        } else {
          this.notificationService.soffronterroralert('Invalid email address.');
            this.loading = false;
        }
           //
          });




      })
    });


   }
  }




