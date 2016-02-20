import { Component, ViewChild }                  from 'angular2/core';
import { RouteConfig,
         ROUTER_DIRECTIVES,
         ROUTER_PROVIDERS,
         Location }                   from 'angular2/router';
import { Http, HTTP_PROVIDERS }       from 'angular2/http'

import { GraylogClientConfig }        from '../model/logmanager.interface';

import { LoginForm }                  from './login.component';
import { Dashboard }                  from './dashboard.component';
import { GraylogManagerConfigs }      from './managerconfigs.component';

import { Config }                     from '../service/config.service';
import { APIRequestOptions }          from "../http/http.overrides";

import { AuthenticationService }      from '../service/authentication.service';
import { GraylogClientConfigService } from '../service/logmanager.service';

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
  templateUrl: 'template/html/app.component.html',
  styleUrls: ['template/css/app.component.css']
})
@RouteConfig([
  {
    path: "/home",
    name: "Home",
    component: Dashboard,
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
              public authService: AuthenticationService) {
  }
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
}