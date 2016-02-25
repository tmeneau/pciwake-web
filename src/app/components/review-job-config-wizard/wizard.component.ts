import { Component }                      from 'angular2/core';

import { Router,
         RouteConfig,
         ROUTER_PROVIDERS,
         ROUTER_DIRECTIVES }              from 'angular2/router';

import { WizardContextService }           from './wizard-context.service';
import { LogManagerReviewStepComponent }  from './logmanagerstep.component';
import { NotificationStep }               from './notificationstep.component';

import { FailureStrategyConfigView }      from '../../shared/failurestrategy/failurestrategyconfigview.component';

import { LogReviewJobConfigView }         from '../../shared/logreview/jobconfigview.component';


@Component({
  selector: 'logreview-wizard',
  templateUrl: 'app/components/review-job-config-wizard/wizard.component.html',
  providers: [WizardContextService],
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/logmanager',       component: LogManagerReviewStepComponent, name: 'Manager', useAsDefault: true },
  { path: '/notification/...', component: NotificationStep, name: 'Notification' },
  { path: '/failstrategy',     component: FailureStrategyConfigView, name: 'Fail Strategy' },
  { path: '/jobconfig',        component: LogReviewJobConfigView, name: 'Job Config' }
])
export class LogreviewJobConfigWizardComponent {
  constructor(private _router: Router,
              private _context: WizardContextService) {}
}
