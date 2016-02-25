import { Component }            from 'angular2/core';

import { Router,
         RouteConfig,
         ROUTER_DIRECTIVES }    from 'angular2/router';

import { WizardContextService } from './wizard-context.service';

import { MailConfigView }       from '../../shared/notification/mail/mailconfigview.component';

@Component({
  selector: 'no-incident-notifications',
  directives: [MailConfigView],
  providers: [WizardContextService],
  template: `
    <div *ngFor="#notification of _context.jobConfig.noIncidentNotifications">
      <mail-config [entity]="notification" [editMode]="true"></mail-config>
    </div>
  `
})
export class NoIncidentNotifications {
  constructor(private _context: WizardContextService) {}
}

@Component({
  selector: 'incident-notifications',
  directives: [MailConfigView],
  providers: [WizardContextService],
  template: `
    <div *ngFor="#notification of _context.jobConfig.incidentNotifications">
      <mail-config [entity]="notification" [editMode]="true"></mail-config>
    </div>
  `
})
export class IncidentNotifications {
  constructor(private _context: WizardContextService) {}
}

@Component({
  selector: 'resolved-notifications',
  directives: [MailConfigView],
  providers: [WizardContextService],
  template: `
    <div *ngFor="#notification of _context.jobConfig.resolvedNotifications">
      <mail-config [entity]="notification" [editMode]="true"></mail-config>
    </div>
  `
})
export class ResolvedNotifications {
  constructor(private _context: WizardContextService) {}
}

@Component({
  selector: 'wizard-notifications',
  templateUrl: "app/components/review-job-config-wizard/notificationstep.component.html",
  providers: [WizardContextService],
  directives: [MailConfigView, ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: "/noincidentfound", component: NoIncidentNotifications, as: 'No Incident', useAsDefault: true },
  { path: '/incidentfound', component: IncidentNotifications, as: 'Incident' },
  { path: '/incidentresolved', component: ResolvedNotifications, as: 'Resolved' }
])
export class NotificationStep {
  constructor(private _context: WizardContextService,
              private _router: Router) {}
}