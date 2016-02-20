import { provide }                        from 'angular2/core';
import { ROUTER_PROVIDERS }               from 'angular2/router';
import { HTTP_PROVIDERS, RequestOptions } from 'angular2/http';
import { bootstrap }                      from 'angular2/platform/browser';

import { APIRequestOptions }             from './http/http.overrides';

import { App }                            from './component/app.component';

// see https://github.com/angular/angular/issues/5632
import 'rxjs/Rx'

bootstrap(App,[
  HTTP_PROVIDERS,
  provide(RequestOptions, {useClass: APIRequestOptions})
]);