import { Injectable }           from 'angular2/core';

import { Http }                 from 'angular2/http';
import { Config }               from '../../config/config.service';
import { GraylogQueryConfig }   from './graylog.interface';

import { AbstractCrudService }  from '../../rest/crud.service';

@Injectable()
export class GraylogQueryService
             extends AbstractCrudService<GraylogQueryConfig> {

    private getBaseEndpoint(): string {
      return this._config.pciwakeHost + "/logmanager/graylog/config/query/";
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

    fromJson(json: Object): GraylogQueryConfig {
      return new GraylogQueryConfig().fromJson(json);
    }
}