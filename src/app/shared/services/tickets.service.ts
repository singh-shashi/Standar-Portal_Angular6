import { Injectable } from '@angular/core';
import { JsonApiService } from '../../core/api/json-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class TicketService {
  private _apiKey: string;
  private jsonApiService;
  constructor(jsonApiSrv: JsonApiService) {
    this.jsonApiService = jsonApiSrv;
  }

  public getTickets(apiKey: string, parentObj: string, parentID: number, whereCondition: string, start: number
    , length: number, sortColumn: string, sortOrder: string, fldName: string): Observable<any> {
    this._apiKey = apiKey;
    const pageNumber = Math.ceil((start + 1) / length);
    sortColumn = (sortColumn === '') ? 'TICKETID' : sortColumn;
    sortOrder = (sortOrder === '') ? 'DESC' : sortOrder;

    // const fldName = 'TicketID,AssignTo,Synopsis,Status,Severity,Priority,Detail,CallTime,SpptResDat,LastMod,' +
    //   'Cat1,Cat2,ContctName,EndUser,Environ,TQueue,ResolvDT,Company,Closedat,Solution,IsDeleted'
    const OrderBy = sortColumn + ' ' + sortOrder;

    return this.jsonApiService.SearchByLinkRelated(this._apiKey, parentObj, parentID, 'TICKET'
      , fldName, pageNumber, length, OrderBy, whereCondition)
  }

  public getTicketChildren(apiKey: string, ticketID: number, childObjectName: string, childViewList: string
    , whereCondition: string, start: number
    , length: number, sortColumn: string, sortOrder: string): Observable<any> {
    this._apiKey = apiKey;
    if (childObjectName.toLowerCase() === 'note') {
      whereCondition = 'status=\'public\'';
    }
    const pageNumber = Math.ceil((start + 1) / length);
    sortColumn = (sortColumn === '') ? 'FormID' : sortColumn;
    sortOrder = (sortOrder === '') ? 'Desc' : sortOrder;

    const OrderBy = sortColumn + ' ' + sortOrder;

    return this.jsonApiService.SearchByLinkRelated(this._apiKey, 'TICKET', ticketID, childObjectName
      , childViewList, pageNumber, length, OrderBy, whereCondition)
  }

  public getTicketAuditTrail(apiKey: string, ticketID: number): Observable<any> {
    this._apiKey = apiKey;
    return this.jsonApiService.GetAuditTrail(this._apiKey, 'TICKET', ticketID);
  }

  public deleteAllWatchBy(apiKey: string, ticketID: number): Observable<any> {
    this._apiKey = apiKey;
    return this.jsonApiService.deleteAllRelatedRecords(this._apiKey, 'TICKET', ticketID, 'WATCHBY');
  }

  public addWatchByRecords(apiKey: string, ticketID: number, RecorData: object): Observable<any> {
    this._apiKey = apiKey;
    return this.jsonApiService.addRelatedRecords(this._apiKey, 'TICKET', ticketID, 'WATCHBY', RecorData);
  }

  public getKBUrl() {
    return this.jsonApiService.getConfigElement('KBUrl');
  }
}
