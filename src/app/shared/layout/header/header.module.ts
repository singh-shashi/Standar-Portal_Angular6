import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";

import {PopoverModule} from "ngx-popover";

import {CollapseMenuComponent} from "./collapse-menu/collapse-menu.component";
import {RecentProjectsComponent} from "./recent-projects/recent-projects.component";
import {FullScreenComponent} from "./full-screen/full-screen.component";

import {ActivitiesComponent} from "./activities/activities.component";
import {ActivitiesMessageComponent} from "./activities/activities-message/activities-message.component";
import {ActivitiesNotificationComponent} from "./activities/activities-notification/activities-notification.component";
import {ActivitiesTaskComponent} from "./activities/activities-task/activities-task.component";
import {HeaderComponent} from "./header.component";

import {UtilsModule} from "../../utils/utils.module";
import {I18nModule} from "../../i18n/i18n.module";
import {UserModule} from "../../user/user.module";
import {VoiceControlModule} from "../../voice-control/voice-control.module";
import {BsDropdownModule} from "ngx-bootstrap";
import { LinkedAccountsComponent } from "./linked-accounts/linked-accounts.component";



@NgModule({
  imports: [
    CommonModule,

    FormsModule,

    VoiceControlModule,

    BsDropdownModule,

    UtilsModule, I18nModule, UserModule, PopoverModule,
  ],
  declarations: [
    ActivitiesMessageComponent,
    ActivitiesNotificationComponent,
    ActivitiesTaskComponent,
    RecentProjectsComponent,
    LinkedAccountsComponent,
    FullScreenComponent,
    CollapseMenuComponent,
    ActivitiesComponent,
    HeaderComponent,
    
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule{}
