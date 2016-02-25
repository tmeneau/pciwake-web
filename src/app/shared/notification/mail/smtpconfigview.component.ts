import { Component }          from 'angular2/core';

import { SmtpConfig }         from './mail.interface';
import { SmtpConfigService }  from './smtpconfig.service';
import { AbstractCrudView }   from '../../rest/crudview.component';

@Component({
  selector: 'smtp-config',
  templateUrl: 'app/shared/notification/mail/smtpconfigview.component.html',
  providers: [SmtpConfigService],
  inputs: ['entity']
})
export class SmtpConfigView extends AbstractCrudView<SmtpConfig> {
  constructor(private _crudService: SmtpConfigService) {
    super();
  }

  getCrudService(): SmtpConfigService {
    return this._crudService;
  }
}