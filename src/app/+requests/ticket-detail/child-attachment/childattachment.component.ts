import { JsonApiService } from './../../../core/api/json-api.service';
import { OnInit, Component, Input } from '@angular/core';
import { AuthService } from '../../../+auth/auth.service';

@Component({
  selector: 'app-childattachment',
  templateUrl: './childattachment.component.html',
  styleUrls:['./childattachment.component.css']
})
export class ChildAttachmentComponent implements OnInit {
  kbsize = 0;
  public loading = false;
  public apikey = '';
  @Input() ChildAttachmentRecord: any;
  @Input() TicketID: any;
  constructor(public jsonApiService: JsonApiService, private authService: AuthService) { }
  ngOnInit() {

this.apikey = this.authService.ApiKey;
    if (this.ChildAttachmentRecord) {
      this.kbsize = (this.ChildAttachmentRecord.DOCSIZE / 1000)
    }
    let fName = this.ChildAttachmentRecord.DOCNAME.replace(/[.]/g, '♥');
      fName = fName.replace(/[&]/g, '♦');
     this.ChildAttachmentRecord.DownloadUrl = this.jsonApiService.DownloadAttachment('Downloadattach/' + this.apikey,
      this.ChildAttachmentRecord.DOCPATH.split('\\')[1].split('_')[0], this.ChildAttachmentRecord.DOCPATH.split('\\')[1].split('_')[1],
       fName);
  }
}
