import { throwError as observableThrowError, Observable } from 'rxjs';

import { catchError, map, delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'assets/smartadmin.config';
import { environment } from 'environments/environment';


@Injectable()
export class JsonApiService {

  private SoffrontCOnfig = config;
  public SFConfig: any;
  constructor(private http: HttpClient) {
    this.fetchConfig().subscribe(data => {
      this.SFConfig = data;
     });
  }

  public getConfigElement(key: string) {
    return this.SoffrontCOnfig[key];
  }

  public fetch(url): Observable<any> {
    return this.http.get(this.getBaseUrl() + config.API_URL + url).pipe(
      delay(100),
      map((data: any) => (data.data || data)),
      catchError(this.handleError))
  }

  public fetchConfig(): Observable<any> {
    return this.http.get('./assets/soffront.json');
  }

  public fetchFromSFApi(url: string): Observable<any> {
    return this.http.get(this.getSoffrontBaseUrl() + this.SFConfig.soffrontapi.webapi + url)
  }

  public fetchByRecordByPost(url: string, _findRec: object): Observable<any> {
    // debugger;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Content-Encoding', 'gzip');
    headers.append('Accept-Encoding', 'gzip');
    // let options = new RequestOptions({ headers: headers });

    const options = { headers };

    return this.http.post(this.getSoffrontBaseUrl() + this.SFConfig.soffrontapi.webapi + url,
      { 'Recdata': _findRec }, options);
  }

  public addRecord(url: string, RecorData: object): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Content-Encoding', 'gzip');
    headers.append('Accept-Encoding', 'gzip');
    const options = { headers };

    return this.http.post(this.getSoffrontBaseUrl() + this.SFConfig.soffrontapi.webapi + url,
      { 'RECORDDATA': RecorData }, options);
  }

  public addLinkRecords(url: string, ParentObject: string, ParentID: number, ChildObject: string , ChildIds: string, prvParentId? : string, prvcontact? : string): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Content-Encoding', 'gzip');
    headers.append('Accept-Encoding', 'gzip');
    const options = { headers };

    return this.http.post(this.getSoffrontBaseUrl() + this.SFConfig.soffrontapi.webapi + url + '/' + ParentObject + '/' + ParentID + '/' + ChildObject + '/' + ChildIds
     , options);
  }

  public addAttachment(url: string, objName: string, RecordId: number, username: string, RecorData: object): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/form-data');
    headers.append('Content-Encoding', 'gzip');
    headers.append('Accept-Encoding', 'gzip');
    const options = { headers };
    return this.http.post(this.getSoffrontBaseUrl() + this.SFConfig.soffrontapi.webapi + url + '/' +
      objName + '/' + RecordId + '/' + username,
      RecorData, options);
  }

  public updateRecord(url: string, objName: string, RecordId: number, RecorData: object, ActionName?: string ,conName?:string): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Content-Encoding', 'gzip');
    headers.append('Accept-Encoding', 'gzip');
    const options = { headers };

    return this.http.post(this.getSoffrontBaseUrl() + this.SFConfig.soffrontapi.webapi + url + '/' + objName + '/' + RecordId +
      (ActionName != null ? ('/' + ActionName) : '') + ((conName != '' && conName!=undefined) ? ('/' + conName) : ''),
      { 'RECORDDATA': RecorData }, options); 
  }

  public sendToSFApi(url: string, stringRecordData: string): Observable<any> {
    // debugger
    return this.http.post(this.getSoffrontBaseUrl() + this.SFConfig.soffrontapi.webapi + url, { 'RecordData': stringRecordData })
  }

  public getWidgetList(apiKey: string, objectName: string, viewlist: string, whereCondition: string) {
    const findData = {
      objectName: objectName,
      fieldsName: viewlist,
      condition: encodeURI(whereCondition)
    };
    return this.fetchByRecordByPost('findPortalRec/' + apiKey, findData);
  }

  public setWidgetList(apiKey: string, objectName: string, viewlist: string, whereCondition: string) {
    const findData = {
      objectName: objectName,
      fieldsName: encodeURI(viewlist),
      condition: encodeURI(whereCondition)
    };

    return this.fetchByRecordByPost('UpadtePortalRec/' + apiKey, findData);
  }

  public GetAllObject(apiKey: string) {
    const findData = {
      objectName: '',
    };
    return this.fetchByRecordByPost('CPAllForms/' + apiKey, findData);
  }
  public GetQueryName(apiKey: string, objName: string) {
    const findData = {
      objectName: objName,
      QRYID: ''
    };
    return this.fetchByRecordByPost('QueryEngine/' + apiKey, findData);
  }

  public _ExistForm(apiKey: string, ObjName: string) {
    const qData = {
      objectName: ObjName
    };
    return this.fetchByRecordByPost('FormFlag/' + apiKey, qData);
  }

  public ViewRecordFieldList(apiKey: string, ObjName: string) {
    const qData = {
      objectName: ObjName
    };
    return this.fetchByRecordByPost('ViewList/' + apiKey, qData);
  }

  public getSFToken(devloperkey: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.fetchFromSFApi('token/' + devloperkey + '/' + this.SFConfig.soffrontapi.webadminuser + '/' + this.SFConfig.soffrontapi.webadminuserpassword);
  }

  public getDeveloperKey(): Observable<any> {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.fetchFromSFApi('developerkey/' + this.SFConfig.soffrontapi.ServerName + '/'  + this.SFConfig.soffrontapi.ProjectName + '/' + this.SFConfig.soffrontapi.APPType);
  }
  private getBaseUrl() {
    return location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/';
  }

  private getSoffrontBaseUrl() {
    return (environment.production ? 'https://' : 'http://') + this.SFConfig.soffrontapi.webapiurl + '/';
  }

  public SearchByPost(apiKey: string, objectName: string, viewlist: string, pageNumber: number,
    pageSize: number, sortColumn: string, sortDirection: string, whereCondition: string) {
    const findData = {
      objectName: objectName,
      fieldsName: viewlist,
      pageNumb: pageNumber.toString(),
      pageSize: pageSize.toString(),
      sortColumn: sortColumn,
      sortOrdr: sortDirection,
      condition: escape(whereCondition)
    };

    return this.fetchByRecordByPost('find/' + apiKey, findData);
  }

  public getPrefrencedata(apiKey: string, Itemname: string) {
    const findData = {
      PortalItemName: Itemname
    
    };

    return this.fetchByRecordByPost('CPPrefrenceInfo/' + apiKey, findData);
  }

  // tslint:disable-next-line:max-line-length
  public ValidatePortalLoginWithData(apiKey: string, objectName: string, viewlist: string, UserFieldName: string , PasswordFieldName: string , UserFieldVal: string , PasswordFieldVal: string, whereCondition: string) {
    const findData = {
      OBJECTNAME: objectName,
      FIELDSNAME: viewlist,
      USERFIELDNAME: UserFieldName,
      PASSWORDFIELDNAME: PasswordFieldName,
      USERNAME: UserFieldVal,
      PASSWORD: PasswordFieldVal,
      WHERECONDITION: escape(whereCondition)
    };

    return this.fetchByRecordByPost('PortalLogin/' + apiKey, findData);
  }

  public SearchByLinkRelated(apiKey: string, PObjName: string, ParentId: number,
    childObjName: string, childfldName: string, PageNo: number, PageSize: number, OrderBy: string, whereCondition: string) {
    const linkRecrdData = {
      ParentobjectName: PObjName,
      ParentId: ParentId,
      childObjectName: childObjName,
      childfieldsName: escape(childfldName),
      PageNo: PageNo.toString(),
      PageSize: PageSize.toString(),
      OrderBy: OrderBy,
      condition: escape(whereCondition)
    };

    return this.fetchByRecordByPost('findrelated/' + apiKey + '/false', linkRecrdData);
  }

  public AddRecFun(apiKey: string, ParentobjName: string, ParentId: number, ObjName: string, Recordata: object, LinkData?: Array<any>, contName ?:string) {

    const oData = {
      PrentobjName: ParentobjName,
      ParentId: ParentId,
      ObjName: ObjName,
      cpUser: contName
    };

    if (LinkData == null) {
      LinkData = []
    }

    const jsObjRecData = {
      'oDataInfo': oData,
      'Recdata': Recordata,
      'LinkData': LinkData
    };

    return this.addRecord('AddRecord/' + apiKey, jsObjRecData);
  }

  public AddAttachmentFun(apiKey: string, objName: string, RecordId: number, username: string, Recordata: object) {
    return this.addAttachment('attach/' + apiKey, objName, RecordId, username, Recordata);
  }

  public UpdateRecFun(apiKey: string, ObjName: string, RecId: number, Recordata: object, ActionName?: string , ContName?: string) {
    return this.updateRecord('update/' + apiKey, ObjName, RecId, Recordata, ActionName,ContName);
  }

  public SearchByTopLinkPost(apiKey: string, ParentId: string, viewlist: string, No_OF_Rec: number) {
    const findTopLinkRec = {
      ParentID: ParentId,
      fieldsName: viewlist,
      NO_OF_REC: No_OF_Rec.toString()
    };

    return this.fetchByRecordByPost('ToplinkRecords/' + apiKey, findTopLinkRec);
  }

  public uploadfilessfapt(url: string, RecordData: object) {
    return this.http.post(this.getSoffrontBaseUrl() + this.SFConfig.soffrontapi.webapi + url, RecordData)
  }

  public DownloadAttachment(url: string, ObjName: string, RecId: string, fName: string) {
    return this.getSoffrontBaseUrl() + this.SFConfig.soffrontapi.webapi + url + '/' + ObjName + '/' + RecId + '/' + fName;
  }

  public getstatuswisecount(apikey: string, arryobject: object) {
    return this.fetchByRecordByPost('MultipleRecordCount/' + apikey, arryobject);
  }

  public GetAuditTrail(apiKey: string, PObjName: string, ParentId: number) {
    const senddData = {
      objectName: PObjName,
      RecordId: ParentId
    };
    return this.fetchByRecordByPost('AuditTrail/' + apiKey, senddData);
  }
  public SearchLatestDocument(apiKey: string, objectName: string, ContctId: number, pageNumber: number,
    pageSize: number, sortColumn: string, sortDirection: string, whereCondition: string) {
    const findData = {
      objectName: objectName,
      ID: ContctId.toString(),
      pageNumb: pageNumber.toString(),
      pageSize: pageSize.toString(),
      sortColumn: sortColumn,
      sortOrdr: sortDirection,
      condition: encodeURI(whereCondition)
    };

    return this.fetchByRecordByPost('ContactLatestAttachments/' + apiKey, findData);
  }

  public sendMail(apiKey: string, mailData: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Content-Encoding', 'gzip');
    headers.append('Accept-Encoding', 'gzip');
    const options = { headers };

    return this.http.post(this.getSoffrontBaseUrl() + this.SFConfig.soffrontapi.webapi + 'Mail/' +
      apiKey,
      { 'Recdata': mailData }, options);
  }

  public deleteAllRelatedRecords(apiKey: string, objName: string, RecordId: number, childObjName: string): Observable<any> {
    const jsObjRecData = {
      'objectName': objName,
      'RecordId': RecordId,
      'childObjectName': childObjName
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const options = { headers };

    return this.http.post(this.getSoffrontBaseUrl() + this.SFConfig.soffrontapi.webapi + 'DeleteRecord/' + apiKey,
      { 'Recdata': jsObjRecData }, options);
  }
  // tslint:disable-next-line:max-line-length
  public _runQuery(apiKey: string, QryId: string, PageNum: number, pageSize: number, PortalUserName: string, searchText: string, AccountId: string) {
    const qData = {
      objectName: '',
      PageNo: PageNum,
      PageSize: pageSize,
      QRYID: QryId,
      UserName: PortalUserName,
      CpAccountId : AccountId
    };

    if (searchText !== '') {
      qData['SearchExpr'] = searchText;
    }

    return this.fetchByRecordByPost('QueryEngine/' + apiKey, qData);
  }

  public _getFieldInfo(apiKey: string, FormName: string) {
    const fldData = {
      objectName: FormName,
    };
    return this.fetchByRecordByPost('Fields/' + apiKey, fldData);
  }

  public _getFieldValue(apiKey: string, FormName: string, fldVal: string, Pval: object) {
    const fldData = {
      ObjectName: FormName,
      FieldName: fldVal,
      ParentFieldValue: Pval
    };
    return this.fetchByRecordByPost('FieldValue/' + apiKey, fldData);
  }
  public viewFileInBrowser(apiKey: string, objectName: string, recordID: string, fileName: string,
    user: string) {
    const findData = {
      objectName: objectName,
      recordID: recordID,
      fileName: fileName.toString(),
      user: encodeURI(user.trim())
    };
    return this.fetchByRecordByPost('BrowserViwerFile/' + apiKey, findData);
  }

  public AddLink(apiKey: string, ParentObject: string, ParentID: number, ChildObject: string , ChildIds: string, prvParentId? : string, prvcontact? : string)
  {
 
    return this.addLinkRecords('linkrelatedmultiple/' + apiKey, ParentObject,ParentID,ChildObject,ChildIds);
  }
  public addRelatedRecords(apiKey: string, objName: string, RecordId: number, childObjName: string, RecorData: object): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Content-Encoding', 'gzip');
    headers.append('Accept-Encoding', 'gzip');
    const options = { headers };

    return this.http.post(this.getSoffrontBaseUrl() + this.SFConfig.soffrontapi.webapi + 'AddMultipleRecord/' +
      apiKey + '/' + objName + '/' + RecordId + '/' + childObjName,
      { 'RECORDDATA': RecorData }, options);
  }

  public customQuery(apiKey: string, joinTableformat: string, fields?: string, condition?: string, orderBy?: string, pageNo?: number, pagesize?: number): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Content-Encoding', 'gzip');
    headers.append('Accept-Encoding', 'gzip');
    const options = { headers };

    const RecorData = {
      joinTableFormat: joinTableformat,
      Fields: fields,
      Condition: condition,
      OrderBy: orderBy,
      PageNo: pageNo,
      PageSize: pagesize
    };

    return this.http.post(this.getSoffrontBaseUrl() + this.SFConfig.soffrontapi.webapi + 'CustomQuery/' +
      apiKey, { 'Recdata': RecorData }, options);
  }

  public LinkTable(apiKey: string, RecObject: object): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Content-Encoding', 'gzip');
    headers.append('Accept-Encoding', 'gzip');
    const options = { headers };

    

    return this.http.post(this.getSoffrontBaseUrl() + this.SFConfig.soffrontapi.webapi + 'LinkObject/' +
      apiKey, { 'RECORDDATA': RecObject }, options);
  }
  public getSoffrontContactConfig() {
    return this.SFConfig.soffrontcontact;
  }

  public getSoffrontAccountConfig() {
    return this.SFConfig.soffrontaccount;
  }

  public getSoffrontNoteConfig() {
    return this.SFConfig.soffrontnote;
  }

  public getTicketStatusQueryConfig() {
    return this.SFConfig.ticketstatusqueryconfig;
  }

  public getDataTableConfig() {
    return this.SFConfig.dataTableConfig;
  }

  public getSoffrontKBUrl() {
    return this.SFConfig.KBUrl;
  }

  KbSearchpost(obj, url) {
    url = this.SFConfig.KBUrl + '/Account/EmployeeLogin';
    const mapForm = document.createElement('form');
    mapForm.target = '_blank';
    mapForm.method = 'POST'; // or "post" if appropriate
    mapForm.action = url;
    Object.keys(obj).forEach(function (param) {
      const mapInput = document.createElement('input');
      mapInput.type = 'hidden';
      mapInput.name = param;
      mapInput.setAttribute('value', obj[param]);
      mapForm.appendChild(mapInput);
    });
    document.body.appendChild(mapForm);
    mapForm.submit();
  }

  public ChangeKeyName(o: any, old_key: string, new_key: string) {
    if (old_key !== new_key) {
      Object.defineProperty(o, new_key,
        Object.getOwnPropertyDescriptor(o, old_key));
      delete o[old_key];
    }
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return observableThrowError(errMsg);
  }

}


