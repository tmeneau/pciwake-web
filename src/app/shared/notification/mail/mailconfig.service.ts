import { Injectable }           from 'angular2/core';

import { Http }                 from 'angular2/http';

import { Config }               from '../../config/config.service';
import { MailConfig }           from './mail.interface';

import { AbstractCrudService }  from '../../rest/crud.service';

@Injectable()
export class MailConfigService extends AbstractCrudService<MailConfig> {

    private getBaseEndpoint(): string {
      return this._config.pciwakeHost + "/notification/mail/";
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

    fromJson(json: Object): MailConfig {
      return new MailConfig().fromJson(json);
    }
}