import { Component,
         ViewChild,
         AfterViewChecked }         from 'angular2/core';

import { MODAL_DIRECTIVES,
         ModalComponent }           from 'ng2-bs3-modal/dist/ng2-bs3-modal';

import { InputList }                  from '../../form/inputlist.component';

import { AbstractCrudView }         from '../../rest/crudview.component';

import { MailConfig, SmtpConfig }   from './mail.interface';
import { MailConfigService }        from './mailconfig.service';
import { SmtpConfigView }           from './smtpconfigview.component';
import { SmtpConfigSelector }       from './smtpconfigselector.component';


@Component({
  selector: 'mail-config',
  templateUrl: 'app/shared/notification/mail/mailconfigview.component.html',
  providers: [MailConfigService],
  directives: [MODAL_DIRECTIVES, SmtpConfigSelector, SmtpConfigView, InputList],
  inputs: ['entity']
})
export class MailConfigView extends AbstractCrudView<MailConfig> {

  @ViewChild(SmtpConfigView) smtpView: SmtpConfigView;

  @ViewChild(SmtpConfigSelector) smtpSelector: SmtpConfigSelector;
  @ViewChild('selectSmtpModal') selectSmtpModal: ModalComponent;

  constructor(private _crudService: MailConfigService) {
    super();
  }

  test() {
    console.log(this.entity);
  }

  getCrudService(): MailConfigService {
    return this._crudService;
  }
}