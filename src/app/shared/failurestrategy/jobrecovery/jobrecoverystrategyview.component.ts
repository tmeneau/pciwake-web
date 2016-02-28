import { Component } from 'angular2/core';

import { AbstractCrudView }           from '../../rest/crudview.component';

import { JobRecoveryStrategy }        from './jobrecoverystrategy.interface';
import { JobRecoveryStrategyService } from './jobrecoverystrategy.service'

@Component({
  selector: 'job-recovery-strategy-config',
  templateUrl: 'app/shared/failurestrategy/jobrecovery/jobrecoverystrategyview.component.html',
  providers: [JobRecoveryStrategyService],
  inputs: ['entity']
})
export class JobRecoveryStrategyView
             extends AbstractCrudView<JobRecoveryStrategy> {
  constructor(private _crudService: JobRecoveryStrategyService) {
    super();
  }

  getCrudService(): JobRecoveryStrategyService {
    return this._crudService
  }
}