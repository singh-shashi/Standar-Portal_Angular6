import { EmailService } from './../../shared/services/email.service';
import { Component, OnInit } from '@angular/core';
import { JsonApiService } from '../../../app/core/api/json-api.service';
import { NotificationService } from '../../shared/utils/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ],
  providers: [
    EmailService
  ]
})
export class RegisterComponent implements OnInit {
  public companyAcct: any;
  public company: any;
  public FName: string;
  public LName: string;
  public email: string;
  public Address2: string;
  public BPhone: string;
  public Mobile: string;
  public city: string;
  public Country: string;
  public StatePr: string;
  public ZipPost: string;
  public _apikey: string;
  validateEmail = true;
  public browserclass;
  loading = false;
  constructor(
    private notificationService: NotificationService, private jsonApiService: JsonApiService, private emailservice: EmailService) { }

  ngOnInit() {
    this.browserclass = 'true';
    this.loadcompanylist();
  }

  registeruser() {
    this.validateEmail = true;
    this.loading = true;
    this.browserclass = 'true';
    const emailregexp = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
    if (this.FName === '' || this.FName === undefined) {
      this.browserclass = 'false';
      this.loading = false;
      return false;

    } else if (this.LName === '' || this.LName === undefined) {
      this.browserclass = 'false';
      this.loading = false;
      return false;
    } else if (this.email === '' || this.email === undefined) {
      this.browserclass = 'false';
      this.loading = false;
      return false;
    } else if (!emailregexp.test(this.email)) {
      this.browserclass = 'false';
      this.loading = false;
      this.validateEmail = false;
      return false;
    } else if (this.companyAcct === null) {
      this.browserclass = 'false';
      this.loading = false;
      return false;
    }
    this.validateEmail = true;
    const random_password = this.createPassword(8);
    const fullname = this.FName + ' ' + this.LName;
    const soffrontContactConfig = this.jsonApiService.getSoffrontContactConfig();

    const data = {
      'FName': this.FName,
      'LName': this.LName,
      'company': this.companyAcct.Company,
      'Address1': this.Address2 === undefined ? '' : this.Address2,
      'BPhone': this.BPhone === undefined ? '' : this.BPhone,
      'Mobile': this.Mobile === undefined ? '' : this.Mobile,
      'City': this.city === undefined ? '' : this.city,
      'Country': this.Country === undefined ? '' : this.Country,
      'StatePr': this.StatePr === undefined ? '' : this.StatePr,
      'ZipPost': this.ZipPost === undefined ? '' : this.ZipPost,
      'Status': 'Customer'
    };

    data[soffrontContactConfig.PasswordField] = random_password;
    data[soffrontContactConfig.PortalAccessTypeField] = 'Portal User';
    data[soffrontContactConfig.UserEmailField] = this.email;
    data[soffrontContactConfig.FullNameField] = fullname;
    data[soffrontContactConfig.PortalAccessField] = 'Yes';
    this.jsonApiService.AddRecFun(this._apikey, 'Account', this.companyAcct.FormId, 'CONTACT', data).subscribe((a) => {
      if (a.ErrorCode === 0) {
      this.sendmail(this.email, random_password, fullname);
      this.loading = false;
      } else {
        this.loading = false;
      }
    });
  }

  resetuser() { //debugger;
    this.FName = '',
      this.LName = '',
      this.email = '',
      this.Address2 = '',
      this.BPhone = '',
      this.Mobile = '',
      this.city = '',
      this.Country = '',
      this.StatePr = '',
      this.ZipPost = '',
      this.companyAcct = this.company[0];
  }

  sendmail(email: string, password: string, FullName: string) {// debugger;
    const mailbody = 'Hello ' + FullName + '<br/><br/>' +
      ' Thank you for registering. Log in with the following credentials..<br/><br/>' +
      'Email address :' + email + '<br/>Password: ' + password + '<br/><br/>' +
      'Thank You <br/>Administration';
    const mailsubject = 'New Registration';
    const mailto = [{ 'Admin': email }];
    const mailcc = [];
    const mailbcc = [];
    return this.emailservice.sendMail(this._apikey, mailsubject, mailbody, mailto, mailcc, mailbcc).subscribe(() => {
      this.notificationService.soffrontalert('You have registered successfully. ' +
        'An email has been sent to your email id with the login details.');
      this.email = '';
      this.resetuser();
      this.loading = false;
    });
  }
  loadcompanylist() {
    this.loading = true;
    const devKeyCall = this.jsonApiService.getDeveloperKey().subscribe((devKeydata) => {
      const devKey = devKeydata.toString();
      devKeyCall.unsubscribe();
      const SFTokenCall = this.jsonApiService.getSFToken(devKey).subscribe((data) => {
        this._apikey = data.toString();
        const whereCondition = ' Status=\'Customer\' and IsDeleted = 0';
        return this.jsonApiService.SearchByPost(this._apikey, 'Account', 'FormID,Company', 0
          , 0, 'Company', 'ASC', whereCondition).subscribe(
            data => {// debugger;
              this.loading = false;
              this.company = [{ FormID: '', Company: 'Select Company' }]
              this.company = this.company.concat(data.Object.RESULTS);
              if (this.company.length > 0) {
                this.companyAcct = this.company[0];
              }
            })
      })
    });
  }
  // keyPress(event: any) {
  //   const pattern = /[0-9\+\-\ ]/;

  //   let inputChar = String.fromCharCode(event.charCode);
  //   if (event.keyCode != 8 && !pattern.test(inputChar)) {
  //     event.preventDefault();
  //   }
  // }
  private createPassword(length: number): string {
    const valid = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let res = '';
    while (0 < length--) {
      res += valid[Math.ceil(Math.random() * valid.length)];
    }
    return res;
  }
}
