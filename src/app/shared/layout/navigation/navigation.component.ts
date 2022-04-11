import {Component, OnInit} from '@angular/core';
import { JsonApiService } from 'app/core/api/json-api.service';

@Component({

  // tslint:disable-next-line:component-selector
  selector: 'sa-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public showMenuDefect = false;
  public showMenuContact = false;
  public showMenuRequest = false;

  constructor(private jsonAPiService: JsonApiService) {
  }

  ngOnInit() {
    if (this.jsonAPiService.SFConfig.showMenuDefect) {
      this.showMenuDefect = true;
    }
    if (this.jsonAPiService.SFConfig.showMenuContact) {
      this.showMenuContact = true;
    }
    if (this.jsonAPiService.SFConfig.showMenuRequest) {
      this.showMenuRequest = true;
    }
  }

}
