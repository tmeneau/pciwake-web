import { Component }                      from 'angular2/core';

import { Router,
         RouteConfig,
         ROUTER_DIRECTIVES }              from 'angular2/router';

import { LogManagerConfigListing }        from '../../shared/logmanager/managerconfiglisting.component';
import { ConnectionConfigListing }        from '../../shared/logmanager/connectionconfiglisting.component';
import { QueryConfigListing }             from '../../shared/logmanager/queryconfiglisting.component';
import { MailConfigListing }              from '../../shared/notification/mail/mailconfiglisting.component';

@Component({
  selector: 'config-editor',
  templateUrl: 'app/components/config-editor/configeditor.component.html',
  directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
  { path: '/logmanager', component: LogManagerConfigListing, as: 'Manager', useAsDefault: true },
  { path: '/connection', component: ConnectionConfigListing, as: 'Connection' },
  { path: '/query/:id', component: QueryConfigListing, as: 'Query' },
  { path: '/notification', component: MailConfigListing, as: 'Mail' }
])
export class LogReviewConfigurationsEditor {
  constructor(private _router: Router) {}
}
