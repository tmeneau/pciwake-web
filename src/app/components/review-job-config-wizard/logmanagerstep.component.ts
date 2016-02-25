import { Component }            from 'angular2/core';

import { WizardContextService } from './wizard-context.service';

import { GraylogConfigView }    from '../../shared/logmanager/graylog/graylogconfigview.component';

@Component({
  selector: 'wizard-logmanager',
  templateUrl: "app/components/review-job-config-wizard/logmanagerstep.component.html",
  directives: [GraylogConfigView]
})
export class LogManagerReviewStepComponent {
  constructor(private _context: WizardContextService) {}
}