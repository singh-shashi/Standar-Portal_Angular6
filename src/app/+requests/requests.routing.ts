import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [
  {
    path: '', redirectTo: 'myopentickets', pathMatch: 'full'
  },
  {
    path: 'myopentickets',
    loadChildren: './+myopentickets/myopentickets.module#MyOpenTicketsModule',
  },
  {
    path: 'myaccounttickets',
    loadChildren: './+myaccounttickets/myaccounttickets.module#MyAccountTicketsModule',
  },
  {
    path: 'requestsawaitingreply',
    loadChildren: './+requestsawaitingreply/requestsawaitingreply.module#RequestsAwaitingReplyModule',
  },
  {
    path: 'requestswaitingverification',
    loadChildren: './+requestswaitingverification/requestswaitingverification.module#RequestsWaitingVerificationModule',
  },
  {
    path: 'searchrequest',
    loadChildren: './+searchresult/searchresult.module#SearchresultModule',
  },
  {
    path: 'advancesearchrequest/:statusfilter',
    loadChildren: './+advancesearchresult/advancesearchresult.module#AdvancesearchresultModule',
  },
  {
    path: 'drilldownrequests',
    loadChildren: './+drilldown/drilldown.module#DrillDownTicketModule',
  }
];

export const routing = RouterModule.forChild(routes);
