import { Component, Injectable}       from "angular2/core";

import { AbstractCrudListingViewContext,
         CrudListingView,
         CrudListingSelector }        from '../../rest/crudlistingview.component';

import { JobRecoveryStrategy }        from './jobrecoverystrategy.interface';
import { JobRecoveryStrategyView }    from "./jobrecoverystrategyview.component";
import { JobRecoveryStrategyService } from "./jobrecoverystrategy.service";

@Injectable()
export class JobRecoveryStrategyListingContext
             extends AbstractCrudListingViewContext<JobRecoveryStrategy> {

  constructor(protected _configService: JobRecoveryStrategyService) {
    super();
  }

  getCrudService(): JobRecoveryStrategyService {
    return this._configService;
  }

  newEntity(): JobRecoveryStrategy {
      return new JobRecoveryStrategy();
  }

  entityTypeName(): string {
    return "Job Recovery Strategy"
  }
}

@Component({
  selector: 'job-recovery-strategy-config-listings',
  providers: [JobRecoveryStrategyService, JobRecoveryStrategyListingContext],
  directives: [JobRecoveryStrategyView, CrudListingSelector],
  templateUrl: 'app/shared/failurestrategy/jobrecovery/jobrecoverystrategylisting.component.html',
})
export class JobRecoveryStrategyListing extends CrudListingView<JobRecoveryStrategy> {
  constructor(public listingContext: JobRecoveryStrategyListingContext) {
    super(listingContext);
  }
}