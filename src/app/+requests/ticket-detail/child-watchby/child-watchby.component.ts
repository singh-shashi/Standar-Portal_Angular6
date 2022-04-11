import { filter } from 'rxjs/operators';
import { AuthService } from './../../../+auth/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TicketService } from '../../../shared/services/tickets.service';
import { ContactService } from '../../../shared/services/contacts.service';
import { JsonApiService } from '../../../core/api/json-api.service';
import { forkJoin } from 'rxjs';
import { NotificationService } from './../../../shared/utils/notification.service';

@Component({
  selector: 'app-childwatchby',
  templateUrl: './child-watchby.component.html',
  providers: [TicketService, ContactService]
})
export class ChildWatchbyComponent implements OnInit {
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() TicketID: number;
  @Output() onCancelwatchbyform = new EventEmitter<void>();

  Contacts = [];
  ChildWatchByRecords = [];
  selectedFromLeft = [];
  selectedFromRight = [];

  private ticketService: TicketService;
  private contactService: ContactService;
  private loggedInUser: any;
  private AccID: any;
  loading = false;

  constructor(public authService: AuthService, private notificationService: NotificationService) { }
  ngOnInit() {
    this.loading = true;
    this.ticketService = new TicketService(this.JsonApiService);
    this.contactService = new ContactService(this.JsonApiService);
    this.loggedInUser = this.authService.LoggedInUser;
    this.AccID = this.loggedInUser.selectedAccount.AcctID;
    this.initialiseValues();
  }

  private initialiseValues() {
    this.loading = true;
    this.ChildWatchByRecords = [];
    this.Contacts = [];

    const allChildWatchByDataCall = forkJoin(
      this.ticketService.getTicketChildren(this.ApiKey, this.TicketID, 'WATCHBY', 'ContactEml,ContactNam', '', 1, 5, '', ''),
      this.contactService.getContacts(this.ApiKey, 'ACCOUNT', this.AccID,
        'Contact.FormId>0 and Contact.Isdeleted=0', 1, 200, 'FName', 'asc', 'email,FullName'))
      .subscribe((childWatchByData) => {
        if (childWatchByData[0].Object.RESULTS) {
          this.ChildWatchByRecords = childWatchByData[0].Object.RESULTS;
        }
        if (childWatchByData[1].Object.RESULTS) {
          const _contacts = childWatchByData[1].Object.RESULTS
                                .filter((con) => { return !(con.email === null && con.FullName === null) });
          this.Contacts = _contacts.filter((item) => {
            return !(this.ChildWatchByRecords.map(con => con.ContactEml).indexOf(item.email) > -1);
          });
        }
        this.loading = false;
        allChildWatchByDataCall.unsubscribe();
      });
  }

  onChangeWatchByFrom(leftSelected) {
    this.selectedFromLeft = leftSelected;
  }

  onChangeWatchByTo(rightSelected) {
    this.selectedFromRight = rightSelected;
  }

  MoveOptions(type: string) {
    switch (type.toUpperCase()) {
      case 'ADD':
        for (const item of this.selectedFromLeft) {
          const watchbyObj = { ContactEml: item.value, ContactNam: item.text };
          const conObj = { email: item.value };

          this.ChildWatchByRecords.push(watchbyObj);
          this.Contacts = this.Contacts.filter(con => con.email !== conObj.email);
        }
        break
      case 'ADDALL':
        for (const item of this.Contacts) {
          const watchbyObj = { ContactEml: item.email, ContactNam: item.FullName };

          this.ChildWatchByRecords.push(watchbyObj);
          this.Contacts = [];
        }
        break
      case 'REMOVE':
        for (const item of this.selectedFromRight) {
          const conObj = { FullName: item.text, email: item.value };
          const watchbyObj = { ContactEml: item.value };

          this.Contacts.push(conObj);
          this.ChildWatchByRecords = this.ChildWatchByRecords.filter(wcb => wcb.ContactEml !== watchbyObj.ContactEml);
        }
        break
      case 'REMOVEALL':
        for (const item of this.ChildWatchByRecords) {
          const conObj = { FullName: item.ContactNam, email: item.ContactEml };

          this.Contacts.push(conObj);
          this.ChildWatchByRecords = [];
        }
        break
    }
  }

  CancelWatchBy() {
    this.onCancelwatchbyform.emit();
  }

  SaveWatchBy() {
    let watchBydata = [];
    for (const watch of this.ChildWatchByRecords) {
      watchBydata.push({ ContactEml: watch.ContactEml, ContactNam: watch.ContactNam });
    }
    const deleteWatchByCall = this.ticketService.deleteAllWatchBy(this.ApiKey, this.TicketID)
      .subscribe((delWatchBy) => {
        if (watchBydata.length > 0) {
          const addWatchByCall = this.ticketService.addWatchByRecords(this.ApiKey, this.TicketID, watchBydata)
            .subscribe((addWatchByRecs) => {
              //alert('Watch By saved successfully.');
              this.notificationService.soffrontalert('Watch By saved successfully.');
              addWatchByCall.unsubscribe();
            });
        }
        //this.onCancelwatchbyform.emit();
        deleteWatchByCall.unsubscribe();
      });
  }
}
