import { Component,
         Output,
         OnInit,
         EventEmitter }                      from 'angular2/core';

import { CrudListingSelector }               from '../../rest/crudlistingview.component';

import { JobRecoveryStrategyListingContext,
         JobRecoveryStrategyListing }        from './jobrecoverystrategylisting.component';

import { JobRecoveryStrategyService }        from './jobrecoverystrategy.service';
import { JobRecoveryStrategyView }           from './jobrecoverystrategyview.component';
import { JobRecoveryStrategy }               from './jobrecoverystrategy.interface';

@Component({
  selector: 'job-recovery-strategy-config-selector',
  providers: [JobRecoveryStrategyService, JobRecoveryStrategyListingContext],
  directives: [JobRecoveryStrategyView, CrudListingSelector],
  properties: ['listingContext.selectedEntity:entity'],
  templateUrl: 'app/shared/failurestrategy/jobrecovery/jobrecoverystrategyselector.component.html'
})
export class JobRecoveryStrategySelector extends JobRecoveryStrategyListing
                                         implements OnInit {

  _original: JobRecoveryStrategy = null;

  @Output() entityChosen: EventEmitter<JobRecoveryStrategy> =
    new EventEmitter<JobRecoveryStrategy>();
  @Output() canceled: EventEmitter<JobRecoveryStrategy> =
    new EventEmitter<JobRecoveryStrategy>();

  constructor(public listingContext: JobRecoveryStrategyListingContext) {
    super(listingContext);
  }

  ngOnInit() {
    this._original = this.listingContext.selectedEntity;
  }

  cancel() {
    this.listingContext.selectedEntity = this._original;
    this.canceled.next(this._original);
  }
}