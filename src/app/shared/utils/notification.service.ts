import {Injectable} from '@angular/core';

declare var $: any;

@Injectable()
export class NotificationService {

  constructor() {
  }

  smallBox(data, cb?) {
    $.smallBox(data, cb)
  }

  soffrontalert(msg) {
    const params= {
      title: "Success",
      content: "<i>"+ msg + "</i>",
      color: "#296191",
      iconSmall: "fa fa-thumbs-up bounce animated",
      timeout: 4000
    };

    $.smallBox(params)
  }

  soffronterroralert(msg){
    const params= {
      title: "Warning!",
      content: "<i>"+ msg + "</i>",
      color: "#FF544E",
      iconSmall: "fa fa-exclamation-triangle bounce animated",
      timeout: 4000
    };
    $.smallBox(params)
  }

  bigBox(data, cb?) {
    $.bigBox(data, cb)
  }

  smartMessageBox(data, cb?) {
    $.SmartMessageBox(data, cb)
  }

}
