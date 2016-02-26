import { Component }                  from 'angular2/core';

import { ConnectionConfig }           from './logmanager.interface';
import { ConnectionConfigService }    from './connectionconfig.service';

import { AbstractCrudView }           from '../rest/crudview.component';

import { PasswordCovnertPipe }        from '../util/password.pipe';

@Component({
  selector: "connection-config",
  templateUrl: 'app/shared/logmanager/connectionconfig.component.html',
  pipes: [PasswordCovnertPipe],
  inputs: ['entity']
})
export class ConnectionConfigView extends AbstractCrudView<ConnectionConfig> {
  constructor(private _crudService: ConnectionConfigService) {
    super();
  }

  getCrudService(): ConnectionConfigService {
    return this._crudService
  }
}