import { Injectable } from '@angular/core';
import { JsonApiService } from '../../core/api/json-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class DefectService {
  private _apiKey: string;
  private jsonApiService;
  constructor(jsonApiSrv: JsonApiService) {
    this.jsonApiService = jsonApiSrv;
  }

  public getDefects(apiKey: string, parentObj: string, parentID: number, whereCondition: string,
     start: number, length: number, sortColumn: string, sortOrder: string, fldName: string): Observable<any> {
    this._apiKey = apiKey;
    const pageNumber = Math.ceil((start + 1) / length);
    sortColumn = (sortColumn === '') ? 'DEFECTID' : sortColumn;
    sortOrder = (sortOrder === '') ? 'DESC' : sortOrder;

    // const fldName = 'DefectID,Synopsis,CateGory,SubCategry,Status,DefType,SubDate,Environ,' +
    //  'Developr,Submitter,QAPerson,FixDate,CertFix,Details,Steps,DPublic';
    const OrderBy = sortColumn + ' ' + sortOrder;

    return this.jsonApiService.SearchByLinkRelated(this._apiKey, parentObj, parentID, 'Defect', fldName,
     pageNumber, length, OrderBy, whereCondition);
  }
  public getDefectChildren(apiKey: string, defectID: number, childObjectName: string, childViewList: string
    , whereCondition: string, start: number
    , length: number, sortColumn: string, sortOrder: string): Observable<any> {
    this._apiKey = apiKey;
    const pageNumber = Math.ceil((start + 1) / length);
    sortColumn = (sortColumn === '') ? 'FormID' : sortColumn;
    sortOrder = (sortOrder === '') ? 'DESC' : sortOrder;


    const OrderBy = sortColumn + ' ' + sortOrder;

    return this.jsonApiService.SearchByLinkRelated(this._apiKey, 'DEFECT', defectID, childObjectName
      , childViewList, pageNumber, length, OrderBy, whereCondition)
  }
}
