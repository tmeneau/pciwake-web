import { Injectable }           from 'angular2/core';

import { Http }                 from 'angular2/http';

import { Config }               from '../../config/config.service';
import { JobRecoveryStrategy }  from './jobrecoverystrategy.interface';

import { AbstractCrudService }  from '../../rest/crud.service';

@Injectable()
export class JobRecoveryStrategyService extends AbstractCrudService<JobRecoveryStrategy> {

    private getBaseEndpoint(): string {
      return this._config.pciwakeHost + "/logmanager/failure/jobrecovery";
    }

    constructor(protected _http: Http, protected _config: Config) {
      super(_http, _config);
    }

    getFindAllEndpoint(): string {
      return this.getBaseEndpoint();
    }

    getFindOneEndpoint(id: number): string {
      return this.getBaseEndpoint() + id;
    }

    getCreateEndpoint(): string {
      return this.getBaseEndpoint();
    }

    getSaveEndpoint(id: number): string {
      return this.getBaseEndpoint() + id;
    }

    getDeleteEndpoint(id: number): string {
      return this.getBaseEndpoint() + id;
    }

    fromJson(json: Object): JobRecoveryStrategy {
      return new JobRecoveryStrategy().fromJson(json);
    }
}