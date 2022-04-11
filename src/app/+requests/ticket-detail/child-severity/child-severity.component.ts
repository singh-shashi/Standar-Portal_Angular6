import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JsonApiService } from '../../../core/api/json-api.service';
import { FadeInTop } from '../../../shared/animations/fade-in-top.decorator'      // "../../shared/animations/fade-in-top.decorator";
import { NotificationService } from './../../../shared/utils/notification.service';
import { AuthService } from '../../../+auth/auth.service';

declare var $: any;

@FadeInTop()

@Component({
  selector: 'app-childseverity',
  templateUrl: './child-severity.component.html',
  styleUrls: ['./child-severity.component.css']
})
export class ChildSeverityComponent implements OnInit {
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() TicketID: number;
  @Input() Status: string;
  @Output() onCancelcloseticform = new EventEmitter<void>();
  @Output() onrefreshdetailviewform = new EventEmitter<void>();

  public loading = false;
  public starsrating;
  public starsratingcus;
  public serverity_Comment: any;
  public showFeedBackButton=false;


  constructor(private authService: AuthService ,private notificationService: NotificationService) { }

  ngOnInit() {
    this.starsratingcus = '';
    this.starsrating = '';
    this.serverity_Comment ='';
    this.getfeedbackData();
  }

  functiondosurvey() {
    this.functicketclose();
    this.ngOnInit();
  }
  cancelticketclose() {
    this.onCancelcloseticform.emit();
  }
  functicketclose() {
    const data = {
      'Remark': this.starsratingcus,
      'Comment': this.serverity_Comment
    };
    this.loading = true;
    this.JsonApiService.UpdateRecFun(this.ApiKey, 'Ticket', this.TicketID, data).subscribe(
      (d) => {
        // alert('Success');
        if(d.Object !=null && d.Object !=undefined){
        this.notificationService.soffrontalert('Thanks for your feedback.');
        this.loading = false;
        this.onrefreshdetailviewform.emit();
        }
      })


  }

  getfeedbackData(){
    this.loading = true;
    this.JsonApiService.SearchByPost(this.ApiKey, 'Ticket', 'Remark,Comment', 0,0,'', '','Formid='+ this.TicketID).subscribe(
      (data) => {
        // alert('Success');
        if(data.Object.RESULTS !== undefined && data.Object.RESULTS.length>0 && data.Object.RESULTS!== null){
          if(data.Object.RESULTS[0].Remark === null || data.Object.RESULTS[0].Remark === undefined || data.Object.RESULTS[0].Remark ===''){
            $("#projectTitle").removeAttr('disabled');
            $("#stars-rating-1").removeAttr('disabled');
            $("#stars-rating-2").removeAttr('disabled');
            $("#stars-rating-3").removeAttr('disabled');
            $("#stars-rating-4").removeAttr('disabled');
            $("#stars-rating-5").removeAttr('disabled');
            this.starsratingcus = '';
            this.starsrating = '';
            this.serverity_Comment ='';
            this.showFeedBackButton=true;
            this.loading = false;
          }
          else
          {
            this.starsratingcus = data.Object.RESULTS[0].Remark;
            this.starsrating = '';
            this.serverity_Comment = data.Object.RESULTS[0].Comment;
            $('#SurveyComment').attr('disabled', 'disabled');
            $('#stars-rating-1').attr('disabled', 'disabled');
            $('#stars-rating-2').attr('disabled', 'disabled');
            $('#stars-rating-3').attr('disabled', 'disabled');
            $('#stars-rating-4').attr('disabled', 'disabled');
            $('#stars-rating-5').attr('disabled', 'disabled');
            this.showFeedBackButton=false;
            this.loading = false;
          }       

        }
      })
  }


}
