import { Component, OnInit } from '@angular/core';
import {FadeZoomInTop} from '../../animations/fade-zoom-in-top.decorator';
import { AuthService } from 'app/+auth/auth.service';
import { JsonApiService } from 'app/core/api/json-api.service';

declare function setServerAndProject(serverName: string, projectName: string): any;
declare function loginWithName(userId: number, userName: string): any;
declare function checkandlogin(o: any): any;


@FadeZoomInTop()
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: [
    './main-layout.component.css'
  ]
})
export class MainLayoutComponent implements OnInit {

  constructor(public authService: AuthService, public jsonApiService: JsonApiService) { }

  ngOnInit() {
    // setServerAndProject('DIGISONICSRVR', 'DIGISONICS');
    // loginWithName(this.authService._loggedInUser.contact.Contact, this.authService._loggedInUser.contact.FullName);
    // checkandlogin(this);
  }

}
