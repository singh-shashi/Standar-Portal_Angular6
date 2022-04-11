import { Injectable } from '@angular/core';
import { JsonApiService } from '../../core/api/json-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class ContactService {
  private _apiKey: string;
  private jsonApiService;
  constructor(jsonApiSrv: JsonApiService) {
    this.jsonApiService = jsonApiSrv;
  }

  public getContacts(apiKey: string, parentObj: string, parentID: number, whereCondition: string
    , start: number, length: number, sortColumn: string, sortOrder: string, fldName: string): Observable<any> {
    this._apiKey = apiKey;
    const pageNumber = Math.ceil((start + 1) / length);
    sortColumn = (sortColumn === '') ? 'Contact' : sortColumn;
    sortOrder = (sortOrder === '') ? 'DESC' : sortOrder;

    if (fldName === '') {
      fldName = 'Contact,Status,Company,JobTitle,ConRole,FName,LName,BPhone,Fax,Address1,' +
      'Mobile,email,City,Country,StatePr,ZipPost,FullName,PortalAcc,PAccessTyp,AcctPhone,AddlInfo,' +
      'Address2,DownNotif,Location,Nletstat,MrMs,Pswd,RelNotif,Resellee';
    }
    const OrderBy = sortColumn + ' ' + sortOrder;

    return this.jsonApiService.SearchByLinkRelated(this._apiKey, parentObj, parentID, 'CONTACT'
      , fldName, pageNumber, length, OrderBy, whereCondition);
  }
  public getContactChildren(apiKey: string, contactID: number, childObjectName: string, childViewList: string
    , whereCondition: string, start: number
    , length: number, sortColumn: string, sortOrder: string): Observable<any> {
    this._apiKey = apiKey;
    const pageNumber = Math.ceil((start + 1) / length);
    sortColumn = (sortColumn === '') ? 'FormID' : sortColumn;
    sortOrder = (sortOrder === '') ? 'DESC' : sortOrder;

    const OrderBy = sortColumn + ' ' + sortOrder;

    return this.jsonApiService.SearchByLinkRelated(this._apiKey, 'CONTACT', contactID, childObjectName
      , childViewList, pageNumber, length, OrderBy, whereCondition)
  }
}
