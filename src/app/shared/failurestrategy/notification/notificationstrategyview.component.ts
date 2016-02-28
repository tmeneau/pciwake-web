import { Component,
         ViewChild,
         AfterViewInit }                from 'angular2/core';

import { AbstractCrudView }             from '../../rest/crudview.component';

import { EntityList }                   from '../../form/entitylist.component';

import { MailConfig }                   from '../../notification/mail/mail.interface';
import { MailConfigSelector }           from '../../notification/mail/mailconfigselector.component';

import { NotificationStrategy }         from './notificationstrategy.interface';
import { NotificationStrategyService }  from './notificationstrategy.service'

@Component({
  selector: 'notification-strategy-config',
  templateUrl: 'app/shared/failurestrategy/notification/notificationstrategyview.component.html',
  providers: [NotificationStrategyService],
  directives: [EntityList, MailConfigSelector],
  inputs: ['entity']
})
export class NotificationStrategyView
             extends AbstractCrudView<NotificationStrategy>
             implements AfterViewInit {

  constructor(private _crudService: NotificationStrategyService) {
    super();
  }

  ngAfterViewInit() {
    console.log("this: ", this);
  }

  getCrudService(): NotificationStrategyService {
    return this._crudService
  }

  createNotification(): MailConfig {
    return new MailConfig();
  }
}