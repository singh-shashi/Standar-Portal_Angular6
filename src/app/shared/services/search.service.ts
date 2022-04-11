import { Injectable } from '@angular/core';
import { JsonApiService } from '../../core/api/json-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class SearchService {
  private _apiKey: string;
  private jsonApiService;
  constructor(jsonApiSrv: JsonApiService) {
    this.jsonApiService = jsonApiSrv;
  }

}
