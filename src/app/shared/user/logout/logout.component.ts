import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NotificationService} from '../../utils/notification.service';
import { AuthService } from '../../../+auth/auth.service';

declare var $: any;

@Component({
  selector: 'sa-logout',
  template: `
<div id="logout" (click)="showPopup()" class="btn btn-link my-2 text-danger">
        <a routerlink="/auth/login" title="Sign Out" data-action="userLogout"
                  data-logout-msg="You can improve your security further after logging out by closing this opened browser">
                  <i class="fas fa-power-off"></i></a>
    </div>
  `,
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
              private notificationService: NotificationService, private authService: AuthService) { }

  showPopup() {
    this.notificationService.smartMessageBox({
      title : '<i class="fas fa-sign-out-alt txt-color-orangeDark"></i> Logout ' +
       '<span class=\'txt-color-orangeDark\'><strong>' + $('#show-shortcut').text() + '</strong></span> ?',
      content : 'You can improve your security further after logging out by closing this opened browser',
      buttons : '[No][Yes]'

    }, (ButtonPressed) => {
      if (ButtonPressed === 'Yes') {
        this.logout()
      }
    });
  }

  logout() {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
  }

  ngOnInit() {

  }



}
