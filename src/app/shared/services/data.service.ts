import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private paramDataSource = new BehaviorSubject<any>({ search: '' });
  currentData = this.paramDataSource.asObservable();

  constructor() { }

  changeData(dataString: string) {
    const stringObj = JSON.parse(dataString);
    let showDetail = false;
    let selectedNoteID = null;
    if (stringObj.ShowDetail) {
      showDetail = stringObj.ShowDetail;
    }
    if (stringObj.SelectedNoteID) {
      selectedNoteID = stringObj.SelectedNoteID;
    }
    this.paramDataSource.next({ search: stringObj.Condition, detail: showDetail, note: selectedNoteID });
  }
}
