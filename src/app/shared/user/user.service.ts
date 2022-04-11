
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';


import {JsonApiService} from "../../core/api/json-api.service";
import { Subject ,  Observable } from 'rxjs';

@Injectable()
export class UserService {

  public user: Subject<any>;

  public userInfo = {
    username: 'Guest'
  };

  constructor(private jsonApiService:JsonApiService) {
    this.user = new Subject();
  }

  getLoginInfo():Observable<any> {
    return this.jsonApiService.fetch('/user/login-info.json').pipe(
      tap((user)=>{
        this.userInfo = user;
      this.user.next(user)
    }))
  }

}
