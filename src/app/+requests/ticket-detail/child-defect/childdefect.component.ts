import { OnInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-childdefect',
  templateUrl: './childdefect.component.html'
})
export class ChildDefectComponent implements OnInit {

  public loading = false;
  @Input() ChildDefectRecord: any;
  constructor() { }
  ngOnInit() {
  // debugger;
  this.ChildDefectRecord.Details =  this.ChildDefectRecord.Details
  .replace(/\r\n/gi, '<br/>').replace(/\n\r/gi, '<br/>').replace(/\n/gi, '<br/>')

  this.ChildDefectRecord.Steps =  this.ChildDefectRecord.Steps
  .replace(/\r\n/gi, '<br/>').replace(/\n\r/gi, '<br/>').replace(/\n/gi, '<br/>')
  }
}
