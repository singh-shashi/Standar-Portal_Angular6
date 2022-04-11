import { Injectable } from '@angular/core';
import { JsonApiService } from '../../core/api/json-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class EmailService {
    private _apiKey: string;
    private jsonApiService;
    constructor(jsonApiSrv: JsonApiService) {
        this.jsonApiService = jsonApiSrv;
    }
    public sendMail(apiKey: string, mailSubject: string, mailBody: string, mailToArray: Array<any>,
        mailCcArray?: Array<any>, mailBccArray?: Array<any>): Observable<any> {
        this._apiKey = apiKey;
        const mailData = {
            MAILSUBJECT: mailSubject,
            MAILBODY: mailBody,
            MAILTO: JSON.stringify(mailToArray),
            MAILCC: JSON.stringify([]),
            MAILBCC: JSON.stringify([])
        };

        if (mailCcArray != null) {
            mailData.MAILCC = JSON.stringify(mailCcArray)
        }

        if (mailBccArray != null) {
            mailData.MAILBCC = JSON.stringify(mailBccArray)
        }

        return this.jsonApiService.sendMail(this._apiKey, mailData);
    }
}
