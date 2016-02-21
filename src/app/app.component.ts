import { Component, ViewChild }       from 'angular2/core';
import { RouteConfig,
         ROUTER_DIRECTIVES,
         ROUTER_PROVIDERS,
         Location }                   from 'angular2/router';
import { Http, HTTP_PROVIDERS }       from 'angular2/http'

import { DashboardComponent }         from './components/dashboard/dashboard.component'

import { GraylogManagerConfigs }      from './shared/logmanager/managerconfigs.component';
import { GraylogClientConfigService } from './shared/logmanager/logmanager.service';

import { AuthenticationService }      from './shared/auth/auth.service';
import { LoginForm }                  from './shared/auth/login.component';
import { APIRequestOptions }          from './shared/rest/http.overrides';

import { Config }                     from './shared/config/config.service';


@Component({
  selector: 'pciwake',
  directives: [ROUTER_DIRECTIVES, LoginForm],
  providers: [
    ROUTER_PROVIDERS,
    Config,
    GraylogClientConfigService,
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
    path: "/logmanager",
    name: "Log Manager",
    component: GraylogManagerConfigs
  }
])
export class App {
  @ViewChild(LoginForm) loginForm: LoginForm;

  constructor(private _location: Location,
              public authService: AuthenticationService) {}

  // true on a path match, false for the rest
  isActive(path) {
    return this._location.path().indexOf(path) > -1;
  }

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