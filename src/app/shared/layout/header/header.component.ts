import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsonApiService } from '../../../core/api/json-api.service';
import { AuthService } from '../../../+auth/auth.service';
import { PortalUser } from '../../models/portaluser';

declare var $: any;

@Component({
  selector: 'sa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchMobileActive = false;
  public apiKey: string;
  public loggedInUser: PortalUser;
  public kbURL: string;

  constructor(public jsonApiService: JsonApiService, private authService: AuthService, private router: Router) {
    this.apiKey = this.authService.ApiKey;
    this.loggedInUser = this.authService.LoggedInUser;
  }

  ngOnInit() {
    this.kbURL = this.jsonApiService.SFConfig.KBUrl;
  }

  toggleSearchMobile() {
    this.searchMobileActive = !this.searchMobileActive;

    $('body').toggleClass('search-mobile', this.searchMobileActive);
  }

  onSubmit() {
    this.router.navigate(['/miscellaneous/search']);

  }
  openprofile() {
    this.router.navigate(['/app-views/profile']);
  }

  openchangepassword() {
    this.router.navigate(['/app-views/changepassword']);
  }

  public searchKB() {
    if (this.jsonApiService.getSoffrontKBUrl() !== '') {
      const Recordata = {
        'e': btoa(this.authService.LoggedInUser.contact.email.toString()),
        'p': btoa(this.authService.LoggedInUser.contact.Pswd.toString()),
        't': '',
        'isSarch': false
      };
      this.jsonApiService.KbSearchpost(Recordata, '');
    }
  }
}
