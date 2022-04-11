import {Injectable} from '@angular/core';
import {JsonApiService} from '../../core/api/json-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class DocumentService {
  private _apiKey: string;

  constructor(private jsonApiService: JsonApiService) { }

  public getDocuments(apiKey: string, whereCondition: string): Observable<any> {
    this._apiKey = apiKey;
    return this.jsonApiService.fetchFromSFApi('findrelated/' +
      this._apiKey + '/Account/3/TRDOCMNT/DOCID,DOCNAME,DOCTYPE,CREATOR,DOCPATH/?condition=' +
      escape(whereCondition));
  }

  public downloadAttachment(apiKey: string, ObjName: string, RecId: string, FileName: string): Observable<any> {
    debugger;
    this._apiKey = apiKey;
    return this.jsonApiService.fetchFromSFApi('Downloadattach/' +
      this._apiKey + '/'+ ObjName +'/'+ RecId + '/'+ FileName);
  }
}
