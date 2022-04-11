import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-childshipitem',
  templateUrl: './child-shipitem.component.html'
})
export class ChildShipitemComponent implements OnInit {
  @Input() ChildShipItemRecord: any;

  constructor() { }
  ngOnInit() {  }
}
