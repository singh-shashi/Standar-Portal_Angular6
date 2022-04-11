import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JsonApiService } from '../../../core/api/json-api.service';
import { FadeInTop } from '../../../shared/animations/fade-in-top.decorator'      // "../../shared/animations/fade-in-top.decorator";
import { NotificationService } from './../../../shared/utils/notification.service';
import { AuthService } from '../../../+auth/auth.service';
declare var $: any;
@FadeInTop()

@Component({
  selector: 'app-closeticket',
  templateUrl: './closeticket.component.html',
  styleUrls: ['./closeticket.component.css']
})
export class CloseticketComponent implements OnInit {
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() TicketID: number;
  @Input() AssignTo: string;
  @Output() onCancelcloseticform = new EventEmitter<void>();
  @Output() onrefreshdetailviewform = new EventEmitter<void>();

  public loading = false;
  public callsatisfied;
  public callManager;
  public expAnalyst;
  public expSupport;
  public reasonableTimeFrame;
  public expAnalyst_note;
  public expSupport_note;
  public noteText;
  public starsrating;
  public starsratingcus;
  public analystnote;
  public supportnote;
  public QData : any;
  public RecData = {};

  constructor(private authService: AuthService ,private notificationService: NotificationService) { }

  ngOnInit() {
    this.callsatisfied = '';
    this.callManager = '';
    this.expAnalyst = '';
    this.expSupport = '';
    this.reasonableTimeFrame = '';
    this.expAnalyst_note = '';
    this.expSupport_note = '';
    this.noteText = '';
    this.analystnote = '';
    this.supportnote = '';
    this.starsratingcus = '';
    this.starsrating = '';
    this.getALLQuestion();
  }

  functiondosurvey() {
    // debugger;
    this.expAnalyst = this.starsratingcus;
    this.expSupport = this.starsrating;
    this.analystnote = this.expAnalyst_note;
    this.supportnote = this.expSupport_note;
    this.functicketclose('');
  }
  cancelticketclose() {
    this.onCancelcloseticform.emit();
  }
  functicketclose(vData: string) {
    this.loading = true;
      let Ans ;
      let QID = 0;
      let QuestionSetData = [];
      let linkdata = {};

if(this.QData!=undefined && this.QData.length>0){
     for(let i=0; i<this.QData.length; i++){
       if(this.QData[i].Type==='Text'){
        Ans= $('#DynamicFld_'+this.QData[i].FormID).val();
        Ans = Ans==undefined? '' : Ans;
        if(vData =='' && Ans=='')
        {
          this.notificationService.soffronterroralert("Please enter the answer to the given question :  " + this.QData[i].Question);
          this.loading = false;
          return false;
        }
        QID =this.QData[i].FormID;
        QuestionSetData.push({ FormId: QID, Question: this.QData[i].Question, Answer: Ans, QType: this.QData[i].Type, SrvDate:''});
        
       }
       else if(this.QData[i].Type==='Textarea'){
        Ans= $('#DynamicFld_'+this.QData[i].FormID).val();
        Ans = Ans==undefined? '' : Ans;
        if(vData =='' && Ans=='')
        {
          this.notificationService.soffronterroralert("Please enter the answer to the given question :  " + this.QData[i].Question);
          this.loading = false;
          return false;
        }
        QID =this.QData[i].FormID;
        QuestionSetData.push({ FormId: QID, Question: this.QData[i].Question, Answer: Ans, QType: this.QData[i].Type , SrvDate:''});

       }
       else if(this.QData[i].Type==='Boolean'){
         let n= 'DynamicFld_'+this.QData[i].FormID;
         Ans= $("input[name='"+ n +"']:checked").val();
         Ans = Ans==undefined? '' : Ans;
         if(vData =='' && Ans=='')
        {
          this.notificationService.soffronterroralert("Please enter the answer to the given question :  " + this.QData[i].Question);
          this.loading = false;
          return false;
        }
         QID =this.QData[i].FormID;
         QuestionSetData.push({FormId: QID, Question: this.QData[i].Question, Answer: Ans, QType: this.QData[i].Type, SrvDate:''});        
                
      }
      else if(this.QData[i].Type==='Rating'){
        let n1= 'DynamicFld_'+this.QData[i].FormID;
        Ans= $("input[name='"+ n1 +"']:checked").val();
        Ans = Ans==undefined? '' : Ans;
        if(vData =='' && Ans=='')
        {
          this.notificationService.soffronterroralert("Please enter the answer to the given question :  " + this.QData[i].Question);
          this.loading = false;
          return false;
        }
        QID =this.QData[i].FormID;
        QuestionSetData.push({FormId: QID, Question: this.QData[i].Question, Answer: Ans, QType: this.QData[i].Type, SrvDate:''});
      }
      let v= 'SrvItems_'+ this.QData[i].FormID;
      linkdata[v] = this.QData[i].FormID;  
     }
    }

  const data ={
    'Status':'Closed',
    'Closedat': ''
  }
  const updaterec =  this.JsonApiService.UpdateRecFun(this.ApiKey, 'Ticket', this.TicketID, data, 'Edit',this.authService.LoggedInUser.contact.FullName).subscribe(
      (upd) => {       
    if(QuestionSetData.length>0){
      let v= 'Ticket_'+ this.TicketID;
      let acc= 'Account_'+  this.authService.LoggedInUser.selectedAccount.AcctID;
      linkdata[v]=this.TicketID; 
      linkdata[acc]=this.authService.LoggedInUser.selectedAccount.AcctID;     
      const jsObjRecData = {
         'Recdata': QuestionSetData,
         'LinkData': linkdata
      };
        const addWatchByCall = this.JsonApiService.addRelatedRecords(this.ApiKey,  'Contact', this.authService.LoggedInUser.contact.Contact, 'SrvANS', jsObjRecData)
        .subscribe((addWatchByRecs) => {
          this.notificationService.soffrontalert('Survey submitted successfully');
          this.loading = false;
          this.onrefreshdetailviewform.emit();
          addWatchByCall.unsubscribe();
        });
      }
      if(QuestionSetData.length<=0){        
        this.notificationService.soffrontalert('Ticket has been successfully closed.');
        this.loading = false;
        this.onrefreshdetailviewform.emit();
      }
        updaterec.unsubscribe();
      });

   
  }

  getALLQuestion(){
     this.loading = true;
     let linkdata = {};
     linkdata['Account'] = 'SrvItems';    
     linkdata['Ticket'] = 'Account';
     linkdata['SrvANS'] = 'Ticket';
    
     const jsObjRecData = {
      'LinkData': linkdata
    };

     this.JsonApiService.LinkTable(this.ApiKey,  jsObjRecData)
     .subscribe((record) => {

       if(record.Object!=null && record.Object!=undefined) {
      let JoinTable="SrvItems inner join "+ record.Object["Account~SrvItems"] +" on SrvItems.ID="+ record.Object["Account~SrvItems"] +".SrvItems  inner join "+ record.Object["Ticket~Account"] +" on "+ record.Object["Account~SrvItems"] +".Account ="+ record.Object["Ticket~Account"] +".ACCOUNT  left join "+ record.Object["SrvANS~Ticket"] +" on "+ record.Object["Ticket~Account"] +".TICKET="+ record.Object["SrvANS~Ticket"] +".Ticket";
      let fields =""+ record.Object["Account~SrvItems"] +".Account,"+ record.Object["Ticket~Account"] +".TICKET,SrvItems.FormID,SrvItems.Question,SrvItems.Type,"+ record.Object["SrvANS~Ticket"] +".SrvAns";
      let wherecon="SrvItems.Status='Active' and "+ record.Object["Account~SrvItems"] +".IsDeleted=0 and SrvItems.IsDeleted=0 and "+ record.Object["Ticket~Account"] +".ACCOUNT="+ this.authService.LoggedInUser.selectedAccount.AcctID +" and "+ record.Object["Ticket~Account"] +".TICKET="+ this.TicketID;
     // let wherecon= "ISDELETED=0 AND  Acct='"+ this.authService.LoggedInUser.selectedAccount.Company +"' AND FORMID NOT IN(select SRVITEMS from "+ record.Object +" where IsDeleted=0)"
      this.JsonApiService.customQuery(this.ApiKey,JoinTable, fields,wherecon,'SrvItems.FormID desc',0,0).subscribe(
        (ReordsData) => {
        if(ReordsData.Object.RESULTS !== null && ReordsData.Object.RESULTS !== undefined && ReordsData.Object.RESULTS.length > 0 ){
          this.QData = ReordsData.Object.RESULTS.filter(x=>x.SrvAns==null || x.SrvAns=='');
          if(this.QData.length<=0)
          {
              let JoinTable="select a.FormID,a.Question,a.Type, b.TICKET,b.Account,b.SrvAns  from (select isnull(t.Account,1) as Account,SrvItems.FormID,SrvItems.Question,SrvItems.Type  from SrvItems inner join (select SrvItems.FormID,"+ record.Object["Account~SrvItems"] +".Account  from SrvItems left join "+ record.Object["Account~SrvItems"] +" on SrvItems.ID="+ record.Object["Account~SrvItems"] +".SrvItems) AS t  on SrvItems.ID=t.FormID  where SrvItems.Status='Active'  and SrvItems.IsDeleted=0 and t.Account is null ) a cross join (select "+ record.Object["Ticket~Account"] +".*, "+ record.Object["SrvANS~Ticket"] +".SrvAns from  "+ record.Object["Ticket~Account"] +"  left join "+ record.Object["SrvANS~Ticket"] +" on "+ record.Object["Ticket~Account"] +".TICKET="+ record.Object["SrvANS~Ticket"] +".Ticket where "+ record.Object["Ticket~Account"] +".ACCOUNT="+ this.authService.LoggedInUser.selectedAccount.AcctID +" and "+ record.Object["Ticket~Account"] +".TICKET="+ this.TicketID +") b  ORDER BY a.FormId Desc";
              let fields ="CUSTOM";
              let wherecon="";
                  this.JsonApiService.customQuery(this.ApiKey,JoinTable,fields,wherecon,'',0,0).subscribe(
                  (ReordsData) => {
                  if(ReordsData.Object.RESULTS !== null && ReordsData.Object.RESULTS !== undefined && ReordsData.Object.RESULTS.length > 0){      
                    this.QData = ReordsData.Object.RESULTS.filter(x=>x.SrvAns==null || x.SrvAns=='');
                    if(this.QData.length<=0){                  
                        this.functicketclose('');
                    }
                    else{
                    this.loading=false;
                    }
                    }                   
                   
                    });
            }
              else{
                    this.loading=false;
                  }
          }
          else
          {
            let JoinTable="select a.FormID,a.Question,a.Type, b.TICKET,b.Account,b.SrvAns  from (select isnull(t.Account,1) as Account,SrvItems.FormID,SrvItems.Question,SrvItems.Type  from SrvItems inner join (select SrvItems.FormID,"+ record.Object["Account~SrvItems"] +".Account  from SrvItems left join "+ record.Object["Account~SrvItems"] +" on SrvItems.ID="+ record.Object["Account~SrvItems"] +".SrvItems) AS t  on SrvItems.ID=t.FormID  where SrvItems.Status='Active'  and SrvItems.IsDeleted=0 and t.Account is null ) a cross join (select "+ record.Object["Ticket~Account"] +".*, "+ record.Object["SrvANS~Ticket"] +".SrvAns from  "+ record.Object["Ticket~Account"] +"  left join "+ record.Object["SrvANS~Ticket"] +" on "+ record.Object["Ticket~Account"] +".TICKET="+ record.Object["SrvANS~Ticket"] +".Ticket where "+ record.Object["Ticket~Account"] +".ACCOUNT="+ this.authService.LoggedInUser.selectedAccount.AcctID +" and "+ record.Object["Ticket~Account"] +".TICKET="+ this.TicketID +") b Order By a.FormId Desc";
              let fields ="CUSTOM";
              let wherecon="";
                  this.JsonApiService.customQuery(this.ApiKey,JoinTable,fields,wherecon,'',0,0).subscribe(
                  (ReordsData) => {
                  if(ReordsData.Object.RESULTS !== null && ReordsData.Object.RESULTS !== undefined && ReordsData.Object.RESULTS.length > 0){      
                    this.QData = ReordsData.Object.RESULTS.filter(x=>x.SrvAns==null || x.SrvAns=='');
                    if(this.QData.length<=0){                  
                        this.functicketclose('');
                    }
                    else{
                    this.loading=false;
                    }
                    }
                    else{
                      this.functicketclose('');
                    }                   
                   
                    });
          }    
         
        });
        }
        else{                  
          this.cancelticketclose();
          this.loading=false;
            }

     });  
       
   
  }


}




    
