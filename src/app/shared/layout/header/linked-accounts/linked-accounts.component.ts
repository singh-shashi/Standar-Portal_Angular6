import {Component, OnInit, Input} from '@angular/core';
import { AuthService } from '../../../../+auth/auth.service';
import { Account } from '../../../models/account';
import { PortalUser } from '../../../models/portaluser';
import { JsonApiService } from '../../../../core/api/json-api.service';

@Component({
  selector: 'sa-linked-accounts',
  templateUrl: './linked-accounts.component.html',
  styleUrls: [
    './linked-accounts.component.css',
  ],
  providers: [AuthService]
})
export class LinkedAccountsComponent implements OnInit {
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() LoggedInUser: PortalUser;

  public linkedaccounts: Array<Account>;
  public selectedlinkedaccount: Account;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.linkedaccounts = this.LoggedInUser.accounts;
    this.selectedlinkedaccount = this.LoggedInUser.selectedAccount;
  }

  changeSelectedAccount(selectedaccount: Account) {
    this.selectedlinkedaccount = selectedaccount;
    this.authService.switchAccount(selectedaccount);
  }
}
