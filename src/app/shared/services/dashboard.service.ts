import { Injectable } from '@angular/core';
import { JsonApiService } from '../../core/api/json-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardService {
  private _apiKey: string;
  private jsonApiService;
  private _tickresp;
  private _tickids: string;
  constructor(jsonApiSrv: JsonApiService) {
    this.jsonApiService = jsonApiSrv;
  }


  publicgetalerts(apiKey: string, whereCondition: string): Observable<any> {
    // debugger;
    this._apiKey = apiKey;
    whereCondition = whereCondition === '' ? 'IsDeleted = 0' : (whereCondition + ' And IsDeleted = 0');
    return this.jsonApiService.SearchByPost(this._apiKey, 'Alerts', 'ID,DisText,URLText,AlertDate,Details', 1
      , 5, 'AlertDate', 'DESC', whereCondition)
  }

  getlinkednotesrec(apiKey: string, parentID: number, numofrecords: number, viewlist: string): Observable<any> {
    this._apiKey = apiKey;
    return this.jsonApiService.SearchByTopLinkPost(this._apiKey, parentID, viewlist, numofrecords)
  }

  getstatuslistcount(apikey: string, arryobject: object): Observable<any> {
    // debugger;
    return this.jsonApiService.getstatuswisecount(apikey, arryobject);

  }
  updateprofilerecord(apiKey: string, datas: object, parentID: number) {
    this._apiKey = apiKey;
    return this.jsonApiService.sendToSFApi(
      'update/' +
      this._apiKey + '/Contact/' + parentID, datas)
  }

  public getAllContactlatestDocument(apiKey: string, CurrContactId: number, whereCondition: string): Observable<any> {
    this._apiKey = apiKey;
    whereCondition = whereCondition === '' ? 'IsDeleted = 0' : (whereCondition + ' And IsDeleted = 0');
    return this.jsonApiService.SearchLatestDocument(this._apiKey, 'CONTACT', CurrContactId, 0
      , 0, 'FormId', 'DESC', whereCondition);
}
public getContactAttachments(apiKey: string, ACCID: number, childObjectName: string, childViewList: string
  , whereCondition: string, start: number
  , length: number, sortColumn: string, sortOrder: string): Observable<any> {
  this._apiKey = apiKey;
  const pageNumber = Math.ceil((start + 1) / length);
  sortColumn = (sortColumn === '') ? 'FormID' : sortColumn;
  sortOrder = (sortOrder === '') ? 'Desc' : sortOrder;

  const OrderBy = sortColumn + ' ' + sortOrder;

  return this.jsonApiService.SearchByLinkRelated(this._apiKey, 'ACCOUNT', ACCID, childObjectName
    , childViewList, pageNumber, length, OrderBy, whereCondition);
}
}




