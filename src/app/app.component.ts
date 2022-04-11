import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { JsonApiService } from './core/api/json-api.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  public title = 'app works!';
  public config: any;

  public constructor(private router: Router, public jsonApiService: JsonApiService) { }

  ngOnInit() {
    this.jsonApiService.fetchConfig().subscribe(data => {
      this.config = data;

      if (environment.production) {
        if (location.protocol === 'http:') {
         window.location.href = location.href.replace('http', 'https');
        }
       }

      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0)
      });
    })
  }
}
