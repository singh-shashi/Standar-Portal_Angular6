import { Serializable } from 'selenium-webdriver';
import { JsonApiService } from '../../core/api/json-api.service';

export class Ticket implements Serializable<Ticket> {
  TicketID: number;
  AssignTo: string;
  Synopsis: string;
  Status: string;
  Severity: string;
  Priority: string;
  Detail: string;
  CallTime: Date;
  DueDate: Date;
  SpptResDat: Date;
  LastMod: Date;
  Category: string;
  Cat2: string;
  Product: string;
  Contact: string;
  EndUser: string;
  Environ: string;
  TQueue: string;
  ResolvDT: Date;
  Account: string;
  Closedat: Date;
  Solution: string;
  CustType: string;
  PVersion: string;
  BusImpact: string;
  Risk: string;
  Classifica: string;
  TestCaseq: string;
  BrowserVer: string;
  Source: string;
  Urgency: string;
  Company: string;
  SerialNum: string;
  SiteGroup: string;
  ContctName: string;
  OrgDD: Date;
  P: string;
  Remark:number;


  constructor(ticketid?: number, assignTo?: string, synopsis?: string, status?: string, severity?: string,
    priority?: string, detail?: string, calltime?: Date, duedate?: Date, spptResDat?: Date, lastMod?: Date, category?: string,
    cat2?: string, environ?: string, tQueue?: string, resolvDT?: Date, account?: string, closedat?: Date,
    product ?: string, contctName?: string, endUser?: string, solution?: string, custtype?: string, pversion?: string,
    busimpact?: string, risk?: string, classifica?: string, testcaseq?: string, browserver?: string, source?: string,
     urgency?: string , company?: string, siteGroup?: string, serialnum?: string, orgDD?: Date, remark?: number) {
    this.TicketID = ticketid;
    this.AssignTo = assignTo;
    this.Synopsis = synopsis;
    this.Status = status;
    this.Severity = severity;
    this.Priority = priority;
    this.Detail = detail;
    this.CallTime = calltime;
    this.SpptResDat = spptResDat;
    this.LastMod = lastMod;
    this.Category = category;
    this.Product = product;
    this.Cat2 = cat2;
    this.Contact = contctName;
    this.EndUser = endUser;
    this.Environ = environ;
    this.TQueue = tQueue;
    this.ResolvDT = resolvDT;
    this.Account = account;
    this.Closedat = closedat;
    this.Solution = solution;
    this.CustType = custtype;
    this.PVersion = pversion;
    this.BusImpact = busimpact;
    this.Risk = risk;
    this.Classifica = classifica;
    this.TestCaseq = testcaseq;
    this.BrowserVer = browserver;
    this.Source = source;
    this.Urgency = urgency;
    this.DueDate = duedate;
    this.Company = company;
    this.SerialNum = serialnum;
    this.SiteGroup = siteGroup;
    this.ContctName = contctName;
    this.P = product;
    this.OrgDD = orgDD;
    this.Remark = remark;
  }
  serialize() {
    return this;
  }

  saveticket(apikey: string, parentobj: string, parentid: number, objectname: string, jsonApiService: JsonApiService,
     LinkData?: Array<any>) {

      Object.keys(this).forEach(key => {
        if (this[key] === undefined) {
          this[key] = '';
        }
      });

    // const str = JSON.stringify(this);
    // const odata = JSON.parse(str);

    return jsonApiService.AddRecFun(apikey, parentobj, parentid, objectname, this, LinkData);
  }

  uploadfiles(apikey: string, parentobj: string, parentid: number, username: string, formdata: object,
    jsonApiService: JsonApiService) {
    return jsonApiService.AddAttachmentFun(apikey, parentobj, parentid, username, formdata);
  }

  deserialize(input) {
    this.TicketID = input.TicketID;
    this.AssignTo = input.AssignTo;
    this.Synopsis = input.Synopsis;
    this.Status = input.Status;
    this.Severity = input.Severity;
    this.Priority = input.Priority;
    this.Detail = input.Detail;
    this.CallTime = input.CallTime;
    this.SpptResDat = input.SpptResDat;
    this.LastMod = input.LastMod;
    this.Category = input.Category;
    this.Product = input.Product;
    this.Cat2 = input.Cat2;
    this.Contact = input.Contact;
    this.EndUser = input.EndUser;
    this.Environ = input.Environ;
    this.TQueue = input.TQueue;
    this.ResolvDT = input.ResolvDT;
    this.Account = input.Account;
    this.Closedat = input.Closedat;
    this.Solution = input.Solution;
    this.CustType = input.CustType;
    this.PVersion = input.PVersion;
    this.BusImpact = input.BusImpact;
    this.Risk = input.Risk;
    this.Classifica = input.Classifica;
    this.TestCaseq = input.TestCaseq;
    this.BrowserVer = input.BrowserVer;
    this.Source = input.Source;
    this.Urgency = input.Urgency;
    this.DueDate = input.DueDate;
    this.Company = input.Company;
    this.ContctName = input.ContctName;
    this.SiteGroup = input.SiteGroup;
    this.SerialNum = input.SerialNum;
    this.OrgDD = input.orgDate;
    this.P = input.P;
    this.Remark = input.Remark;
    return this;
  }
}
