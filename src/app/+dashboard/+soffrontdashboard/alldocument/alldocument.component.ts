import { Component, OnInit, Input } from '@angular/core';
import { JsonApiService } from '../../../core/api/json-api.service';
import { PortalUser } from '../../../shared/models/portaluser';
import { trigger, style, transition, animate, state, keyframes } from '@angular/animations';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { AuthService } from '../../../+auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alldocument',
  templateUrl: './alldocument.component.html',
  styleUrls: ['./alldocument.component.css'],
  providers: [DashboardService]
})
// tslint:disable-next-line:class-name
export class alldocumentComponent implements OnInit {

  public alldocuments = [];
  public AttachData = [];
  public NoRecords = false;
  public downloadUrl;
  public wherecondition = '';
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() LoggedInUser: PortalUser;

  private dashboardservice: DashboardService;

  public loading = false;
  constructor( private auth: AuthService,  private router: Router) { }

  ngOnInit() {
    this.dashboardservice = new DashboardService(this.JsonApiService);
    this.getAllLatestAttachments();
  }
  getAllLatestAttachments() {
    this.loading = true;
    const ContactId = this.LoggedInUser.selectedAccount.AcctID;
    const allDocAttachletestver = this.dashboardservice.getContactAttachments(this.ApiKey, ContactId, 'TRDOCMNT', ''
    , '', 1, 5, '', '').subscribe((ContactAllDocument) => {
        if (ContactAllDocument.Object.RESULTS) {
          this.alldocuments = ContactAllDocument.Object.RESULTS;
          if (ContactAllDocument.Object.RESULTS <= 0 ) {
            this.NoRecords = true;
          } else {
            this.NoRecords = false;
          }
          this.loading = false;
          allDocAttachletestver.unsubscribe();
        }
        if (ContactAllDocument.Object.RESULTS === undefined) {
          this.NoRecords = true;
        }
        this.loading = false;
      });
  }
  downloadAttach(fileName: string, path: string) {
    if (!this.auth.IsLoggedIn) {
      this.auth.logout();
      this.router.navigate(['/auth/login']);
      return false;
    } else {
      let fName = fileName.replace(/[.]/g, '♥');
      fName = fName.replace(/[&]/g, '♦');
      this.downloadUrl = this.JsonApiService.DownloadAttachment('Downloadattach/' + this.ApiKey,
        path.split('\\')[1].split('_')[0], path.split('\\')[1].split('_')[1], fName);
      window.location.href = this.downloadUrl;
      return false;
    }
  }

  ViewFileOnline(fileName: string, path: string) {
    this.loading = true;
  if (!this.auth.IsLoggedIn) {
      this.auth.logout();
      this.router.navigate(['/auth/login']);
      return false;
  } else {
    // window.location.host + window.location.pathname +
    const username = this.LoggedInUser.contact.FullName;
    const phypath = 'assets/ViewFiles/' + username;
          let fName = fileName.replace(/[.]/g, '♥');
          fName = fName.replace(/[&]/g, '♦');

          // tslint:disable-next-line:max-line-length
          const Openfileinbroser = this.JsonApiService.viewFileInBrowser(this.ApiKey, path.split('\\')[1].split('_')[0].toString(), path.split('\\')[1].split('_')[1].toString(),
          fName, username).subscribe(data => {
            if (data.Object !== null && data.Object !== undefined) {
              window.open(phypath + '/' + fileName, '_blank');
            }
            this.loading = false;
            Openfileinbroser.unsubscribe();
          }, error => {
             console.log(error);
          });

       }
 }
}






