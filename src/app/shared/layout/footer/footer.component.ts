import { Component, OnInit } from '@angular/core';
import { JsonApiService } from 'app/core/api/json-api.service';

@Component({
  selector: 'sa-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public FooterMsg='';
  public FooterIcon='';
  public arrIcon=[];

  constructor( private jsonAPiService : JsonApiService) {}

  ngOnInit() {
    this.FooterMsg = sessionStorage.getItem('sessionFooterMsg');
    this.FooterIcon = sessionStorage.getItem('Sessionsocialmedia');
    if(this.FooterIcon !=undefined && this.FooterIcon !=null)
       this.arrIcon=this.FooterIcon.split('|');

  }



}
