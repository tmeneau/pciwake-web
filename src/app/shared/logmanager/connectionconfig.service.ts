import { Injectable }           from 'angular2/core';

import { Http }                 from 'angular2/http';
import { Config }               from '../config/config.service';
import { ConnectionConfig,
         AuthContext }          from './logmanager.interface';

import { AbstractCrudService }  from '../rest/crud.service';

@Injectable()
export class ConnectionConfigService
             extends AbstractCrudService<ConnectionConfig> {

    private getBaseEndpoint(): string {
      return this._config.pciwakeHost + "/logmanager/config/connection/";
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

    fromJson(json: Object): ConnectionConfig {
      return new ConnectionConfig().fromJson(json);
    }
}