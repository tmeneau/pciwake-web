import { Injectable }           from 'angular2/core';

import { Http }                 from 'angular2/http';
import { Config }               from '../../config/config.service';
import { GraylogClientConfig }  from './graylog.interface';

import { AbstractCrudService }  from '../../rest/crud.service';

@Injectable()
export class GraylogConfigService
             extends AbstractCrudService<GraylogClientConfig> {

    private getBaseEndpoint(): string {
      return this._config.pciwakeHost + "/logmanager/graylog/config/client/"
    }

    constructor(protected _http: Http,
                protected _config: Config) {
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

    fromJson(json: Object): GraylogClientConfig {
      return new GraylogClientConfig().fromJson(json);
    }
}