import { Component, ViewChild }       from 'angular2/core';
import { RouteConfig,
         Router,
         ROUTER_DIRECTIVES,
         ROUTER_PROVIDERS,
         Location }                   from 'angular2/router';
import { Http, HTTP_PROVIDERS }       from 'angular2/http'

import { DashboardComponent }         from './components/dashboard/dashboard.component'
import { LogreviewJobConfigWizardComponent } from './components/review-job-config-wizard/wizard.component';

import { LogReviewConfigurationsEditor }  from './components/config-editor/configeditor.component';
import { GraylogConfigService }       from './shared/logmanager/graylog/graylogclientconfig.service';
import { GraylogQueryService }        from './shared/logmanager/graylog/graylogqueryconfig.service';
import { ConnectionConfigService }    from './shared/logmanager/connectionconfig.service';

import { AuthenticationService }      from './shared/auth/auth.service';
import { LoginForm }                  from './shared/auth/login.component';
import { APIRequestOptions }          from './shared/rest/http.overrides';

import { Config }                     from './shared/config/config.service';


@Component({
  selector: 'pciwake',
  directives: [ROUTER_DIRECTIVES, LoginForm],
  providers: [
    Config,
    GraylogConfigService,
    GraylogQueryService,
    ConnectionConfigService,
    AuthenticationService,
    APIRequestOptions
  ],
  templateUrl: 'app/app.component.html'
})
@RouteConfig([
  {
    path: "/home",
    name: "Home",
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: "/config-editor/...",
    name: "Configurations Editor",
    component: LogReviewConfigurationsEditor
  },
  {
    path: "/wizard/...",
    name: "Log Review Wizard",
    component: LogreviewJobConfigWizardComponent
  }
])
export class App {
  @ViewChild(LoginForm) loginForm: LoginForm;

  constructor(private _location: Location,
              private _router: Router,
              public authService: AuthenticationService) {}

  login(event?) {
    if (event) {
      event.preventDefault();
    }
    this.loginForm.open();
  }

  logout(event?) {
    if (event) {
      event.preventDefault();
    }
    this.loginForm.logout();
  }
}