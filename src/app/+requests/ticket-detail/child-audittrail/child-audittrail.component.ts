import { OnInit, Component, Input } from '@angular/core';
import { TicketService } from '../../../shared/services/tickets.service';
import { JsonApiService } from '../../../core/api/json-api.service';

@Component({
  selector: 'app-childaudittrail',
  templateUrl: './child-audittrail.component.html',
  providers: [TicketService]
})
export class ChildAudittrailComponent implements OnInit {
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() TicketID: number;

  ChildAuditRecords = [];
  private ticketService: TicketService;
  loading = false;

  constructor() { }

  ngOnInit() {
    this.loading = true;
    this.ticketService = new TicketService(this.JsonApiService);
    this.initialiseValues();
  }
  private initialiseValues() {
    this.ChildAuditRecords = [];

    const allChildAuditTrailDataCall = this.ticketService.getTicketAuditTrail(this.ApiKey, this.TicketID)
      .subscribe((childAuditTrailData) => {
        if (childAuditTrailData.Object) {
          this.ChildAuditRecords = childAuditTrailData.Object;
          this.loading = false;
          allChildAuditTrailDataCall.unsubscribe();
        }
      });
  }
}
