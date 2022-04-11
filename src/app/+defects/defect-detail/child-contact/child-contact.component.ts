import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-childcontact',
  templateUrl: './child-contact.component.html'
})
export class ChildContactComponent implements OnInit {
  @Input() ChildContactRecord: any;

  constructor() { }
  ngOnInit() { }
}
