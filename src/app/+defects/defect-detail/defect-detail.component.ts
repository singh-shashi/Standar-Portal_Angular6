import { DefectService } from './../../shared/services/defects.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JsonApiService } from '../../core/api/json-api.service';
import { Defect } from '../../shared/models/defect';

@Component({
  selector: 'app-defect-detail',
  templateUrl: './defect-detail.component.html',
  providers: [DefectService],
  styleUrls: [
    './defect-detail.component.css'
  ]
})
export class DefectDetailComponent implements OnInit {
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() DefectData: any;
  @Output() onSetHide = new EventEmitter<boolean>();
  ShowChildrenAside = false;
  ShowChildForm = false;
  ShowChildren = '';
  ShowChildrenTitle = '';
  ChildRecords = [];
  private defectService: DefectService;
  ShowChildAdd = false;

  get defect_data(): Defect {
    if (this.DefectData == null) {
      return new Defect();
    } else {
      return (new Defect()).deserialize(this.DefectData);
    }
  }
  constructor() { }

  ngOnInit() {
    this.defectService = new DefectService(this.JsonApiService);
  }
  BacktoList() {
    this.ShowChildrenAside = false;
    this.ShowChildAdd = false;
    this.ShowChildren = '';
    this.ShowChildrenTitle = '';
    this.onSetHide.emit(false);
  }
  OpenChildren() {
    this.ShowChildren = 'CONTACT';
    this.ShowChildrenTitle = 'Contacts';
    const childContactdata = this.defectService.getDefectChildren(this.ApiKey, this.defect_data.DefectID, 
      'CONTACT', '', '', 1, 5, 'FormID', 'Desc')
      .subscribe((contacts) => {
        if (contacts.Object.RESULTS) {
          this.ChildRecords = contacts.Object.RESULTS;
          childContactdata.unsubscribe();
          this.ShowChildrenAside = true;
        }
      });
  }
}
