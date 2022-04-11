import { JsonApiService } from '../../core/api/json-api.service';
import { Serializable } from 'selenium-webdriver';

export class Contact implements Serializable<Contact> {
  Contact = 0;
  Status = '';
  Company = '';
  JobTitle = '';
  ConRole = '';
  FName = '';
  LName = '';
  BPhone = '';
  Fax = '';
  Address1 = '';
  Address2 = '';
  Mobile = '';
  email = '';
  City = '';
  Country = '';
  StatePr = '';
  ZipPost = '';
  FullName = '';
  PortalAcc = '';
  PAccessTyp = '';
  MrMs = '';
  Resellee = '';
  Location = '';
  AcctPhone = '';
  Nletstat = '';
  RelNotif = '';
  DownNotif = '';
  AddlInfo = '';
  Pswd = '';

  constructor(contactid?: number, status?: string, company?: string, jobTitle?: string, conRole?: string,
    fName?: string, lName?: string, bPhone?: string, fax?: string, address1?: string, address2?: string,
    mobile?: string, emailid?: string, city?: string, country?: string, statePr?: string, zipPost?: string,
    fullName?: string, portalAcc?: string, pAccessTyp?: string, mrMs?: string, resellee?: string,
    location?: string, acctPhone?: string, nletstat?: string, relNotif?: string, downNotif?: string,
    addlInfo?: string, pswd?: string) {
    this.Contact = contactid;
    this.Company = company;
    this.Status = status;
    this.JobTitle = jobTitle;
    this.ConRole = conRole;
    this.FName = fName;
    this.LName = lName;
    this.BPhone = bPhone;
    this.Fax = fax;
    this.Address1 = address1;
    this.Address2 = address2;
    this.Mobile = mobile;
    this.email = emailid;
    this.City = city;
    this.Country = country;
    this.StatePr = statePr;
    this.ZipPost = zipPost;
    this.FullName = fullName;
    this.PortalAcc = portalAcc;
    this.PAccessTyp = pAccessTyp;
    this.MrMs = mrMs;
    this.Resellee = resellee;
    this.Location = location;
    this.AcctPhone = acctPhone;
    this.Nletstat = nletstat;
    this.RelNotif = relNotif;
    this.DownNotif = downNotif;
    this.AddlInfo = addlInfo;
    this.Pswd = pswd;
  }

  serialize() {
    return this;
  }

  update(apikey: string, jsonApiService: JsonApiService) {
    const recordId = this.Contact;
    const contactConfig = jsonApiService.getSoffrontContactConfig();
    const ContactRecordData = Object.assign({}, this);
    Object.keys(ContactRecordData).forEach(key => {
      if (ContactRecordData[key] === undefined) {
        ContactRecordData[key] = '';
      }
      if (key === 'FullName') {
        jsonApiService.ChangeKeyName(ContactRecordData, key, contactConfig.FullNameField);
      }
      if (key === 'Pswd') {
        jsonApiService.ChangeKeyName(ContactRecordData, key, contactConfig.PasswordField);
      }
      if (key === 'email') {
        jsonApiService.ChangeKeyName(ContactRecordData, key, contactConfig.UserEmailField);
      }
      if (key === 'PortalAcc') {
        jsonApiService.ChangeKeyName(ContactRecordData, key, contactConfig.PortalAccessField);
      }

      if (key === 'PAccessTyp') {
        jsonApiService.ChangeKeyName(ContactRecordData, key, contactConfig.PortalAccessTypeField);
      }
    });

    return jsonApiService.UpdateRecFun(apikey, 'Contact', recordId, ContactRecordData);

   // return jsonApiService.sendToSFApi('update/' + apikey + '/Contact/' + recordId, this.stringify())
  }

  add(apikey: string, jsonApiService: JsonApiService, parentObjectName: string, parentRecordId: number) {
    const contactConfig = jsonApiService.getSoffrontContactConfig();
    const ContactRecordData = Object.assign({}, this);
    Object.keys(ContactRecordData).forEach(key => {
      if (ContactRecordData[key] === undefined) {
        ContactRecordData[key] = '';
      }
      if (key === 'FullName') {
        jsonApiService.ChangeKeyName(ContactRecordData, key, contactConfig.FullNameField);
      }
      if (key === 'Pswd') {
        jsonApiService.ChangeKeyName(ContactRecordData, key, contactConfig.PasswordField);
      }
      if (key === 'email') {
        jsonApiService.ChangeKeyName(ContactRecordData, key, contactConfig.UserEmailField);
      }
      if (key === 'PortalAcc') {
        jsonApiService.ChangeKeyName(ContactRecordData, key, contactConfig.PortalAccessField);
      }

      if (key === 'PAccessTyp') {
        jsonApiService.ChangeKeyName(ContactRecordData, key, contactConfig.PortalAccessTypeField);
      }
    });

    return jsonApiService.AddRecFun(apikey, parentObjectName, parentRecordId, 'CONTACT', ContactRecordData);

    // return jsonApiService.AddRecFun(apikey, parentObjectName, parentRecordId, 'CONTACT', this);

    // return jsonApiService.sendToSFApi('addrelated/' + apikey + '/' + parentObjectName + '/'
    //   + parentRecordId.toString() + '/CONTACT', JSON.stringify(cAddObj))
  }

  validate() {
    this.Company = this.Company === undefined ? '' : this.Company;
    this.Status = this.Status === undefined ? '' : this.Status;
    this.JobTitle = this.JobTitle === undefined ? '' : this.JobTitle;
    this.ConRole = this.ConRole === undefined ? '' : this.ConRole;
    this.FName = this.FName === undefined ? '' : this.FName;
    this.LName = this.LName === undefined ? '' : this.LName;
    this.BPhone = this.BPhone === undefined ? '' : this.BPhone;
    this.Fax = this.Fax === undefined ? '' : this.Fax;
    this.Address1 = this.Address1 === undefined ? '' : this.Address1;
    this.Address2 = this.Address2 === undefined ? '' : this.Address2;
    this.Mobile = this.Mobile === undefined ? '' : this.Mobile;
    this.email = this.email === undefined ? '' : this.email;
    this.City = this.City === undefined ? '' : this.City;
    this.Country = this.Country === undefined ? '' : this.Country;
    this.StatePr = this.StatePr === undefined ? '' : this.StatePr;
    this.ZipPost = this.ZipPost === undefined ? '' : this.ZipPost;
    this.FullName = this.FullName === undefined ? '' : this.FullName;
    this.PortalAcc = this.PortalAcc === undefined ? '' : this.PortalAcc;
    this.PAccessTyp = this.PAccessTyp === undefined ? '' : this.PAccessTyp;
    this.MrMs = this.MrMs === undefined ? '' : this.MrMs;
    this.Resellee = this.Resellee === undefined ? '' : this.Resellee;
    this.Location = this.Location === undefined ? '' : this.Location;
    this.AcctPhone = this.AcctPhone === undefined ? '' : this.AcctPhone;
    this.Nletstat = this.Nletstat === undefined ? '' : this.Nletstat;
    this.RelNotif = this.RelNotif === undefined ? '' : this.RelNotif;
    this.DownNotif = this.DownNotif === undefined ? '' : this.DownNotif;
    this.AddlInfo = this.AddlInfo === undefined ? '' : this.AddlInfo;
    this.Pswd = this.Pswd === undefined ? '' : this.Pswd;
  }

  stringify() {
    this.validate();

    return JSON.stringify(this);
  }

  deserialize(input) {
    this.Contact = input.Contact;
    this.Company = input.Company;
    this.Status = input.Status;
    this.JobTitle = input.JobTitle;
    this.ConRole = input.ConRole;
    this.FName = input.FName;
    this.LName = input.LName;
    this.BPhone = input.BPhone;
    this.Fax = input.Fax;
    this.Address1 = input.Address1;
    this.Address2 = input.Address2;
    this.Mobile = input.Mobile;
    this.email = input.email;
    this.City = input.City;
    this.Country = input.Country;
    this.StatePr = input.StatePr;
    this.ZipPost = input.ZipPost;
    this.FullName = input.FullName;
    this.PortalAcc = input.PortalAcc;
    this.PAccessTyp = input.PAccessTyp;
    this.MrMs = input.MrMs;
    this.Resellee = input.Resellee;
    this.Location = input.Location;
    this.AcctPhone = input.AcctPhone;
    this.Nletstat = input.Nletstat;
    this.RelNotif = input.RelNotif;
    this.DownNotif = input.DownNotif;
    this.AddlInfo = input.AddlInfo;
    this.Pswd = input.Pswd;
    return this;
  }
}
