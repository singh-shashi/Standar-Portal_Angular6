import {Component, OnInit, Input} from '@angular/core';

@Component({

  selector: 'sa-big-breadcrumbs',
  template: `
   <div><h1 class="page-title d-flex text-primary">
   <i class="fa-fw my-auto px-1 far fa-folder-open text-danger"></i>
   <div class="px-1 text-primary">{{items[0]}}</div>
   <span *ngFor="let item of items.slice(1)">> {{item}}</span>
</h1></div>
  `,
})
export class BigBreadcrumbsComponent implements OnInit {

  @Input() public icon: string;
  @Input() public items: Array<string>;
  constructor() {}

  ngOnInit() {
  }
}
