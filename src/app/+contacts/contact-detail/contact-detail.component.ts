import { ContactService } from './../../shared/services/contacts.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JsonApiService } from '../../core/api/json-api.service';
import { Contact } from '../../shared/models/contact';
import { NotificationService } from '../../shared/utils/notification.service';
import { AuthService } from '../../+auth/auth.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: [
    './contact-detail.component.css'
  ]
})
export class ContactDetailComponent implements OnInit {
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() ContactData: any;
  @Output() onSetHide = new EventEmitter<boolean>();
  copyContactData: any;
  ShowChildrenAside = false;
  ShowChildForm = false;
  EditMode = 'readonly';
  ShowChildren = '';
  ShowChildrenTitle = '';
  ChildRecords = [];
  private contactservice: ContactService;
  ShowChildAdd = false;
  loading = false;
  hasAddPermission = false;
  get contact_data(): Contact {
    if (this.ContactData == null) {
      return new Contact();
    } else {
      return (new Contact()).deserialize(this.ContactData);
    }
  }

  set contact_data(contact: Contact) {
    this.ContactData = Contact;
  }

  constructor(private notificationService: NotificationService, private authService: AuthService) {
    const loggedInUser = this.authService.LoggedInUser;
    this.hasAddPermission = loggedInUser.contact.PAccessTyp.replace(/\s/g, '').toUpperCase() === 'ADMIN';
  }

  ngOnInit() {
    this.contactservice = new ContactService(this.JsonApiService);
    const loggedInUser = this.authService.LoggedInUser;
  }
  BacktoList() {
    this.ShowChildrenAside = false;
    this.ShowChildAdd = false;
    this.ShowChildren = '';
    this.ShowChildrenTitle = '';
    this.EditMode = 'readonly';
    this.onSetHide.emit(false);
  }
  OpenChildren() {
    this.ShowChildren = 'SHIPITEM';
    this.ShowChildrenTitle = 'Shipped Items';
    const childShipItemdata = this.contactservice.getContactChildren(this.ApiKey, this.contact_data.Contact, 'SHIPITEM', ''
      , '', 1, 5, 'FormID', 'Desc')
      .subscribe((shipitems) => {
        if (shipitems.Object.RESULTS) {
          this.ChildRecords = shipitems.Object.RESULTS;
          childShipItemdata.unsubscribe();
          this.ShowChildrenAside = true;
        }
      });
  }

  OpenModifyContact() {
    this.copyContactData = JSON.stringify(this.contact_data);
    this.EditMode = null;
  }

  SaveContact() {
    this.loading = true;
    const contactDataCall = this.contact_data.update(this.ApiKey, this.JsonApiService).subscribe((contactData) => {
      this.notificationService.soffrontalert('Contact has been updated successfully');
      contactDataCall.unsubscribe();
      this.loading = false;
      this.EditMode = 'readonly';
    });
  }

  CancelModifyForm() {
    this.ContactData = JSON.parse(this.copyContactData);
    this.EditMode = 'readonly';
  }
}
