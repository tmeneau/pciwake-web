import { Injectable, Inject }          from "angular2/core";
import { Http,
         RequestOptions,
         Headers,
         Response }  from "angular2/http";
import { Config }                         from "./config.service";

import { APIRequestOptions }              from "../http/http.overrides";
import { Observable }                     from 'rxjs/observable';

@Injectable()
export class AuthenticationService {
  private _authenticated: boolean

  constructor(private _http: Http,
              private _config: Config) {
    // TODO: Use official Angular2 CORS support when merged (https://github.com/angular/angular/issues/4231).
    let _build = (<any> _http)._backend._browserXHR.build;
    (<any> _http)._backend._browserXHR.build = () => {
      let _xhr =  _build();
      _xhr.withCredentials = true;
      return _xhr;
    };
  }

  private _getLoginPath(): string {
    return this._config.pciwakeLoginPath;
  }

  authenticate(username: String, password: String) : Observable<Response> {
    let args = new RequestOptions();
    args.headers = new Headers({
      "Authorization": ("Basic " + btoa(username + ":" + password)),
      "Content-Type": "application/json"
    });
    let observable = this._http.get(this._config.pciwakeHost + "/login", args);
    observable.subscribe(
      (res) => {
        let headers = res.headers
        APIRequestOptions.setCSRFToken(this._http, headers.get('CSRF-TOKEN'));
        this._authenticated = true;
        console.log("Success!", res);
      },
      (err) => {
        this._authenticated = false;
        console.log("Failure!", err);
      }
    );
    return observable;
  }

  isAuthenticated(): boolean {
    return this._authenticated
  }
}