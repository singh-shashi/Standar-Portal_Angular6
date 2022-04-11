import { Serializable } from 'selenium-webdriver';
import { JsonApiService } from '../../core/api/json-api.service';

export class Note implements Serializable<Note> {
  Record: number;
  Subject: string;
  NoteText: string;
  Status: string;
  Author: string;
  NoteDate: string;
  NoteType: string;
  NoteSource: string;
  RCode: string;

  constructor(record?: number, subject?: string, noteText?: string, status?: string, author?: string, noteDate?: string,
     noteType?: string, noteSource?: string, rcode?: string) {
      this.Record = record;
      this.Subject = subject;
      this.NoteText = noteText;
      this.Status = status;
      this.Author = author;
      this.NoteDate = noteDate;
      this.NoteType = noteType;
      this.NoteSource = noteSource;
      this.RCode = rcode;
  }

  serialize() {
    return this;
  }

  saveNote(apikey: string, parentobj: string, parentid: number, objectname: string, jsonApiService: JsonApiService,
     LinkData?: Array<any>, contName?:string) {

      Object.keys(this).forEach(key => {
        if (this[key] === undefined) {
          this[key] = '';
        }
      });

    // const str = JSON.stringify(this);
    // const odata = JSON.parse(str);

    return jsonApiService.AddRecFun(apikey, parentobj, parentid, objectname, this, LinkData,contName);
  }

  // deserialize(input) {
  //   this.TicketID = input.TicketID;
  //   this.AssignTo = input.AssignTo;
  //   this.Synopsis = input.Synopsis;
  //   this.Status = input.Status;
  //   this.Severity = input.Severity;
  //   this.Priority = input.Priority;
  //   this.Detail = input.Detail;
  //   this.CallTime = input.CallTime;
  //   this.SpptResDat = input.SpptResDat;
  //   this.LastMod = input.LastMod;
  //   this.Cat1 = input.Cat1;
  //   this.Cat2 = input.Cat2;
  //   this.ContctName = input.ContctName;
  //   this.EndUser = input.EndUser;
  //   this.Environ = input.Environ;
  //   this.TQueue = input.TQueue;
  //   this.ResolvDT = input.ResolvDT;
  //   this.Company = input.Company;
  //   this.Closedat = input.Closedat;
  //   this.Solution = input.Solution;
  //   this.CustType = input.CustType;
  //   this.Urgency = input.Urgency;
  //   this.BusImpact = input.BusImpact;
  //   this.Risk = input.Risk;
  //   this.Classifica = input.Classifica;
  //   this.TestCaseq = input.TestCaseq;
  //   this.BrowserVer = input.BrowserVer;
  //   this.Source = input.Source;
  //   return this;
  // }
}
