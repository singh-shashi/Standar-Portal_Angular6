import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { JsonApiService } from '../../core/api/json-api.service';
import { Contact } from '../../shared/models/contact';
import { AuthService } from '../../+auth/auth.service';
import { NotificationService } from '../../shared/utils/notification.service';
declare var $: any;

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
// export class ContactAddComponent implements OnInit {
//   loading=false;
//   @Input() ApiKey: string;
//   @Input() JsonApiService: JsonApiService;

//   @Output() onCancelContact = new EventEmitter<boolean>();
//   public browserclass;
//   public contact_data: Contact;

//   constructor(private authService: AuthService, private notificationService : NotificationService) { }
//   ngOnInit() {
//     this.ResetContact();
//     this.browserclass="true";
//   }

//   public CancelContact() {
//     this.onCancelContact.emit(false);
//   }
//   ResetContact() {
//     this.contact_data = new Contact();
//     this.contact_data.Status = 'Customer';
//     this.contact_data.Company = this.authService.LoggedInUser.selectedAccount.Company;
//     this.contact_data.Nletstat = 'Good';
//     this.contact_data.PortalAcc = 'Yes';
//     this.contact_data.RelNotif = 'No';
//     this.contact_data.PAccessTyp = 'User';
//     this.contact_data.Pswd = 'P@ssw0rd';
//     this.contact_data.FName='';
//     this.contact_data.LName='';
//     this.contact_data.BPhone='';
//   }
//   SubmitContact() {
//     this.browserclass="true";
//     if(this.contact_data.Company  =='' || this.contact_data.Company  == undefined)
//     {      
//       this.browserclass="false";
//        return false;
       
//     }
//     else if( this.contact_data.FName  =='' || this.contact_data.FName  == undefined)
//     {
//       this.browserclass="false";
//       return false;
//     }
//     else if( this.contact_data.LName  =='' || this.contact_data.LName  == undefined)
//     {
//       this.browserclass="false";
//       return false;
//     }
//     else if( this.contact_data.BPhone  =='' || this.contact_data.BPhone  == undefined)
//     {
//       this.browserclass="false";
//       return false;
//     }
//     this.loading=true;
//     this.contact_data.add(this.ApiKey, this.JsonApiService, 'Account', this.authService.LoggedInUser.selectedAccount.AcctID)
//       .subscribe(() => {
//         this.notificationService.soffrontalert('Contact has been submitted successfully');
//        this.ResetContact();
//           this.onCancelContact.emit(false);
//           this.loading=false;
//         });
//   }
// }

export class ContactAddComponent implements OnInit {
 
  @Input() ApiKey: string;
 @Input() JsonApiService: JsonApiService;
 public FormName = 'Contact';
 public displayedColumns = [];
 public FieldData = [];
  public tableFooterColumns = '';
  public dynamicvar: any;
  public dynamicSaveRec = {};
  public loading = true;
  public AddAttch: any;
  selectedRowIndex: any;
  public NoRecords = false;
  public  files;
  public filesps;
  public formData: FormData = new FormData();
  public TotalFileSize: any;
  @ViewChild('fileInput') fileInput; 

  @Output() onCancelContact = new EventEmitter<boolean>();
  public browserclass;
  public contact_data: Contact;

  constructor(private authService: AuthService, private notificationService : NotificationService) { }
  ngOnInit() {
    this.loading = true;
    sessionStorage.setItem('sTicketDetData', null);
    this.displayedColumns = [];
    this.FieldData = [];
    this.getFieldInfos();
    this.AddAttch = (this.JsonApiService.SFConfig.showAddAttachment==true && this.FormName =='Ticket') ? true : false; 
   }
   handleFileInput(event) {
    const file: File = event.target.files[0];
    this.formData = new FormData();
    this.formData.append('uploadFile', file, file.name);

    this.files.forEach(element => {
      this.formData.append('file', element);
    });
}

getFieldInfos() {
  this.loading = true;
  this.dynamicvar = {};
  const formName = this.FormName;
  const TDetils = this.JsonApiService._getFieldInfo(this.ApiKey, formName + ':CPSubmit')
      .subscribe((fieldInfo) => {
        this.FieldData = fieldInfo.Object;
        if (this.FieldData != null && this.FieldData !== undefined) {
          this.NoRecords = true;
          // tslint:disable-next-line:max-line-length
          this.FieldData = fieldInfo.Object.filter(f => (f.FieldType === 0 ||  f.FieldType === 1 || f.FieldType === 2 || f.FieldType === 4 || f.FieldType === 5 || f.FieldType === 9 || f.FieldType === 12  || f.FieldType === 16) && (f.isHidden === false));

          for (let index = 0; index < this.FieldData.length; index++) {
            if (this.FieldData[index].ISEXTERNAL === 'Y' && this.FieldData[index].DEPENDFLDID === 0) {
              this.loading = true;
              const fldValues =  this.JsonApiService._getFieldValue(this.ApiKey, this.FieldData[index].FORMNAME,
                this.FieldData[index].FieldName, null)
                .subscribe((fldVals) => {
                this.FieldData[index].FieldValues = fldVals.Object !== '' ? fldVals.Object.join(',') : '';
                fldValues.unsubscribe();
                this.loading = false;
              });
            } else if (this.FieldData[index].DEPENDFLDID > 0) {
              if (!this.dynamicvar.hasOwnProperty(this.FieldData[index].DEPENDFLDNAME)) {
                this.dynamicvar[this.FieldData[index].DEPENDFLDNAME] = {};
              }
              this.dynamicvar[this.FieldData[index].DEPENDFLDNAME][this.FieldData[index].FieldName] = [];
            }
          }
        }
        this.loading = false;
    }, error => {
      this.FieldData.length = 0;
      this.loading = false;
      this.NoRecords = true;
    });
}

_LoadDependentdrpdown(_selectfldVal, formName, fldName) {
  if (_selectfldVal.srcElement === undefined) {
   return false;
  } else {
    if (this.dynamicvar.hasOwnProperty(fldName)) {
      this.loading = true;
   const childNames: string[] = Object.getOwnPropertyNames(this.dynamicvar[fldName]);
   const selectedval = _selectfldVal.srcElement.value;
   for (let index = 0; index < childNames.length; index++) {
     this.JsonApiService._getFieldValue(this.ApiKey, formName,
      childNames[index], selectedval)
      .subscribe((fldVals) => {
        this.dynamicvar[fldName][childNames[index]] = fldVals.Object;
        this.loading = false;
      });
   }
  }
  }
}
submitRecords() {
  let tFsize=0;
  const uname =  this.authService.LoggedInUser.contact.FullName; //this.LoggedInUser.contact.FullName;
  //this.LoggedInUser.contact.Contact.toString()

  if (this.FieldData.length > 0) {
    for (let index = 0; index < this.FieldData.length; index++) {
     this.dynamicSaveRec[this.FieldData[index].FieldName] = $('#' + this.FieldData[index].FieldName).val();
     if (this.FieldData.filter(f => f.FieldName === this.FieldData[index].FieldName)[0].IsRequired === true) {
      if (this.dynamicSaveRec[this.FieldData[index].FieldName] === ''
        || this.dynamicSaveRec[this.FieldData[index].FieldName] === undefined) {
          this.notificationService.soffronterroralert(this.FieldData[index].LabelText + ' can not be blank');
          return false;
      }
     }
    }
    if ( this.dynamicSaveRec === undefined ||  this.dynamicSaveRec === '') {
           this.notificationService.soffronterroralert('Please enter/select atleast one value');
           return false;
    }
   
    if (this.FormName.toUpperCase() === 'TICKET') {
      this.dynamicSaveRec['EndUser'] = this.authService.LoggedInUser.contact.FullName; // this.LoggedInUser.contact.FullName;
      this.dynamicSaveRec['ContctName'] = this.authService.LoggedInUser.contact.FullName; // this.LoggedInUser.contact.FullName;
      this.dynamicSaveRec['Source'] = 'Portal';
      this.dynamicSaveRec['CallTime'] = '';
    }

    if (this.FormName.toUpperCase() === 'CONTACT') {
      this.dynamicSaveRec['Company'] = this.authService.LoggedInUser.accounts[0].Company;
    }
    const fileBrowser1 = this.fileInput.nativeElement;
    if ( fileBrowser1.files.length > 0) {

      for (let i = 0; i < fileBrowser1.files.length; i++) {// debugger;
        if(fileBrowser1.files[i].name.indexOf('.msi') >=0 || fileBrowser1.files[i].name.indexOf('.exe') >=0 || fileBrowser1.files[i].name.indexOf('.bat')>=0) 
        {
          this.notificationService.soffronterroralert('Executable file can not be allowed.');
            this.fileInput.nativeElement.value = '';
            this. filesps= null;
            return false;
        }
        if (fileBrowser1.files[i].name.search(/[<>|{}\=~`/:;,*!@$%^*+]/) >= 0)
        {
            this.notificationService.soffronterroralert('File name should not consist with special character (e.g. <>|{}\=~`/:;,*!@$%^*+)');
            this.fileInput.nativeElement.value = '';
            this. filesps= null;
            return false;
        }
        const sizel = fileBrowser1.files[i].size / 1000000;
        tFsize = tFsize + sizel;
        if ( tFsize >= 10) {
          this.notificationService.soffronterroralert('Maximum size of file (individual) is 10Mb.');
          this.fileInput.nativeElement.value = '';
          this.filesps = [];
          return false;
        }
      }
    }
    this.loading = true;
    // tslint:disable-next-line:max-line-length this.authService.LoggedInUser.selectedAccount.Contact //this.LoggedInUser.contact.Contact
    const _fieldData = this.JsonApiService.AddRecFun(this.ApiKey, 'Account',  this.authService.LoggedInUser.selectedAccount.AcctID, this.FieldData[0].FORMNAME.split(':')[0],
     this.dynamicSaveRec, [
       {'Contact': this.authService.LoggedInUser.contact.Contact}
     ],uname)
    .subscribe(data => {
      if (data.Object !== null && data.Object !== undefined) {
        const fileBrowser = this.fileInput.nativeElement;
        if ( fileBrowser.files.length > 0) {
          const formDaata = new FormData();

          for (let i = 0; i < fileBrowser.files.length; i++) {// debugger;
            formDaata.append(i.toString(), fileBrowser.files[i]);
          }
          this.JsonApiService.AddAttachmentFun(this.ApiKey,'Ticket',data.Object , uname ,formDaata)
          .subscribe(data => {
            if (data.Object === true) {
               this.notificationService.soffrontalert('Ticket has been submitted successfully.');
               this.fileInput.nativeElement.value = '';
            } else {
            this.notificationService.soffronterroralert('File not attached');
            }
            for (let index = 0; index < this.FieldData.length; index++) {
              if (! this.FieldData[index].IsNonEditable) {
               $('#' + this.FieldData[index].FieldName).val('');
              }
             }
               this.fileInput.nativeElement.value = '';
               this. filesps= null;
               this.loading = false;
           });
        }
        else {
        this.notificationService.soffrontalert(this.FieldData[0].FORMNAME.split(':')[0] + ' has been submitted successfully.');
        for (let index = 0; index < this.FieldData.length; index++) {
          if (! this.FieldData[index].IsNonEditable) {
           $('#' + this.FieldData[index].FieldName).val('');
          }
         }
         this.loading = false;
      }
         
      }
      _fieldData.unsubscribe();
    });
  }
}

onChange(event: any) {
  this. filesps = [].slice.call(event.target.files);
}

  public CancelContact() {
    this.onCancelContact.emit(false);
  }
 
}
