import { Injectable, Inject, OnInit }     from "angular2/core";
import { Http,
         RequestOptions,
         Headers,
         Response }  from "angular2/http";
import { Config }                         from "../config/config.service";

import { APIRequestOptions }              from "../rest/http.overrides";
import { RestResult }                     from "../rest/rest.interface";
import { Observable }                     from 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
  private _authenticated: boolean;
  private _csrfToken: string;

  constructor(private _http: Http,
              private _config: Config,
              private _requestOpts: APIRequestOptions) {
    // TODO: Use official Angular2 CORS support when merged (https://github.com/angular/angular/issues/4231).
    let _build = (<any> _http)._backend._browserXHR.build;
    (<any> _http)._backend._browserXHR.build = () => {
      let _xhr =  _build();
      _xhr.withCredentials = true;
      return _xhr;
    };
  }

  isAuthenticated(): boolean {
    return this._authenticated;
  }

  csrfEndpoint(): string {
    return this._config.pciwakeHost + "/get-csrf-token";
  }

  authEndpoint(): string {
    return this._config.pciwakeHost + "/login";
  }

  logoutEndpoint(): string {
    return this._config.pciwakeHost + "/logout";
  }

  authOpts(): RequestOptions {
    let opts = new RequestOptions({
      headers: this._requestOpts.getDefualtHeaders()
    });
    opts.headers.set("Content-Type", "application/x-www-form-urlencoded");
    return opts;
  }

  private _setCsrfToken(token: string) {
    this._csrfToken = token
    this._requestOpts.setCSRFToken(this._http, this._csrfToken);
  }

  /*
   * Because we're not injecting any server-side variables into the page's
   * HTML we need to manually retrieve the CSRF token from the server before
   * we can interact with any of the services. This will do that, updating
   * the headers used with the Http client and stored privately in this class.
   */
  private _loadCsrfToken(): Observable<RestResult<boolean>> {
    let result = <Observable<RestResult<boolean>>> Observable.create((observer) => {
      let request = this._http.get(this.csrfEndpoint());
      request.subscribe(
          response => {
            var data = { token: response.headers.get(APIRequestOptions.CSRF_HEADER)};
            this._setCsrfToken(data.token);
            observer.next(new RestResult(
              true, "Successfully retrieved CSRF token", response)
            );
          }, err =>
            observer.error(new RestResult(
              false, "Failed to retrieve CSRF Token", err)
          ), () => observer.complete()
      );
      return function() { /* cancel request */ }
    });
    return result;
  }

  private _removeCsrfToken() {
    this._csrfToken = null;
    this._requestOpts.setCSRFToken(this._http, null);
  }

  private _getAuthErrorMessage(response: Response): string {
    if (response.type == 3) { // TODO!!
      return "Failed to connect to PCI Wake instance";
    }
    return "Invalid credentials"; // TODO!!
  }

  /*
   * Attempts to authenticate using the supplied credentials
   */
  authenticate(username: String, password: String) : Observable<RestResult<boolean>> {
    let result = <Observable<RestResult<boolean>>> Observable.create((observer) => {
      var creds = "username=" + username + "&password=" + password;
      let request = this._http.post(this.authEndpoint(), creds, this.authOpts());
        request.subscribe(
            response => {
              this._authenticated = true;
              /*
               * Spring requires we retrieve an updated CSRF token after
               * authentication success
               */
              this._loadCsrfToken().subscribe(
                (data) => observer.next(new RestResult(
                  true,
                  "Successfully authenticated",
                  response)
                ),
                (err) => observer.onError(err),
                () => observer.complete()
              );
            },
            err => {
              this._authenticated = false;
              observer.error(new RestResult(
                false, this._getAuthErrorMessage(err), err));
              observer.complete();
            }
        );
    });
    return result;
  }

  destroySession(): Observable<RestResult<boolean>> {
    let result = <Observable<RestResult<boolean>>> Observable.create((observer) => {
      let request = this._http.post(this.logoutEndpoint(), this._csrfToken);
      request.subscribe(
        response => {
          /*
           * Spring requires we retrieve an updated CSRF token after
           * logout success to be able to log back in
           *
           * TODO: don't return success until the new CSRF token has been loaded
           */
          this._loadCsrfToken().subscribe(
            (data) => {
              this._authenticated = false;
              observer.next(new RestResult(
                true,
                "Successfully logged out",
                response
              ));
            },
            (error) => {
              this._authenticated = false;
              observer.error(error)
            }
          );
        },
        error => {
          observer.error(false, "Failed to log out", error);
          observer.complete()
        }
      );
    });
    return result;
  }

  /*
   * Issues a request against the authentication endpoint to see whether the
   * user's browser is loged in
   */
  checkAuthentication(): Observable<RestResult<boolean>> {
    let result = <Observable<RestResult<boolean>>> Observable.create(observer => {
      let observable = this._http.get(this.authEndpoint());
      observable.subscribe(
        data => {
          this._authenticated = true;
          observer.next(new RestResult(true, "Currently authenticated", data));
        },
        err => {
          this._authenticated = false;
          observer.next(new RestResult(false, "Not authenticated", err));
        },
        () => observer.complete()
      );
    });
    return result;
  }
}