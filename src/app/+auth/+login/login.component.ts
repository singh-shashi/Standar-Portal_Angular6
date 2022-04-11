import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LayoutService } from '../../shared/layout';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/utils/notification.service';
import { JsonApiService } from 'app/core/api/json-api.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})

export class LoginComponent implements OnInit {

  public useremail: string;
  public password: string;
  loading = false;
  public showForgotPassword = false;
  public showNewUser = false;
  public WelcomeMsg='';

  constructor(private router: Router, private authService: AuthService, private layoutService: LayoutService,
    private notificationService: NotificationService, private jsonAPiService: JsonApiService) {
    this.layoutService.undoFixedHeader();
    this.loadHomePageDynamicprefrence();
  }

  ngOnInit() {
    if (this.jsonAPiService.SFConfig.showForgotPassword) {
      this.showForgotPassword = true;
    }
    if (this.jsonAPiService.SFConfig.showNewUser) {
      this.showNewUser = true;
    }
   
  }

  login(event) {
    event.preventDefault();
    this.useremail = this.useremail === undefined ? '' : this.useremail;
    this.password = this.password === undefined ? '' : this.password;
    if (this.useremail === undefined || this.useremail === '') {
      this.notificationService.soffronterroralert('Invalid email id or password.');
      return false;
    }
    if (this.password === undefined || this.password === '') {
      this.notificationService.soffronterroralert('Invalid email id or password.');
      return false;
    }
    this.loading = true;

    const devKeyCall = this.authService.initiateApp().subscribe((devKeydata) => {
      const devKey = devKeydata.toString();
      devKeyCall.unsubscribe();
      const SFTokenCall = this.authService.initiateAuthorizeApp(devKey).subscribe((data) => {
        this.authService.ApiKey = data.toString();
        SFTokenCall.unsubscribe();
        const contactdataCall = this.authService.authorizeUser(this.useremail, this.password).subscribe((contactdata) => {
          if (contactdata.Object.RESULTS === undefined || contactdata.Object.RESULTS === null || contactdata.Object.RESULTS <= 0) {
            this.notificationService.soffronterroralert('Invalid email id or password.')
            this.loading = false;
          } else {
            // this.authService.LoggedInUser.contact.Pswd = this.password;
          localStorage.setItem('LogPsw', this.password);
            const accountsdatacall = this.authService.validateUserAccounts(Number(contactdata.Object.RESULTS[0].Contact))
              .subscribe((accountsdata) => {
                if (accountsdata.Object.RESULTS === undefined || accountsdata.Object.RESULTS.length <= 0) {
                  this.notificationService.soffronterroralert('The user does not have any valid accounts linked.')
                  this.loading = false;
                } else {
                  this.authService.initiateUserSession(contactdata.Object.RESULTS[0], accountsdata.Object.RESULTS);
                  this.router.navigate([this.authService.RedirectUrl]);

                  const $body = $('body');
                  $body.toggleClass('fixed-header', 'true');
                  $body.toggleClass('fixed-navigation', 'true');
                }
                accountsdatacall.unsubscribe();
              }, (e) => {
                // Account Failure
              });
          }
          contactdataCall.unsubscribe();
        }, (e) => {
          // Contact Failure
        });
      });
    });

    // this.authService.login(this.useremail, this.password);
  }

  loadHomePageDynamicprefrence(){
    this.loading = true;
    const devKeyCall = this.jsonAPiService.getDeveloperKey().subscribe((devKeydata) => {
      const devKey = devKeydata.toString();
      devKeyCall.unsubscribe();
      const SFTokenCall = this.jsonAPiService.getSFToken(devKey).subscribe((data) => {
       const _apikey = data.toString();
      
        return this.jsonAPiService.getPrefrencedata(_apikey, 'PortalHeader').subscribe(
          data => { 
                    if (data.Object !== undefined && data.Object !==null) {
                    
                      this.WelcomeMsg = data.Object.split('|')[1];
                      this.jsonAPiService.getPrefrencedata(_apikey, 'PortalFooter').subscribe(
                      data => {
                                if (data.Object !== undefined && data.Object !==null) {
                                
                                  sessionStorage.setItem('sessionFooterMsg', data.Object.split('|')[1]); 
                                
                                  this.jsonAPiService.getPrefrencedata(_apikey, 'PortalSocialMedia').subscribe(
                                  data => {
                                            if (data.Object !== undefined && data.Object !==null) {
                                            
                                            sessionStorage.setItem('Sessionsocialmedia', data.Object);   
                                            this.loading = false;                             
                        
                                            } else {
                                               // this.WelcomeMsg='';
                                                this.loading = false;
                                            }
                                
                                   });
            
                                } else {
                                   // this.WelcomeMsg='';
                                    this.loading = false;
                                }
                    
                       });
                    } else {
                       // this.WelcomeMsg='';
                        this.loading = false;
                    }
        
           });


      })
    });

  }


}
