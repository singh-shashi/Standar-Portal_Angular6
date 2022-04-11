import {Routes, RouterModule} from '@angular/router';


export const routes: Routes = [
  {
    path: '', redirectTo: 'soffrontdashboard', pathMatch: 'full'
  },
  // {
  //   path: 'analytics',
  //   loadChildren: './+analytics/analytics.module#AnalyticsModule',
  // },
  // {
  //   path: 'social',
  //   loadChildren: './+social/social.module#SocialModule',
  // },
  {
    path: 'soffrontdashboard',
    loadChildren: './+soffrontdashboard/soffrontdashboard.module#SoffrontDashboardModule',
  }
];

export const routing = RouterModule.forChild(routes);
