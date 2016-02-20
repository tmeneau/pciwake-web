import { Injectable }               from 'angular2/core';
import { Http, BaseRequestOptions } from 'angular2/http';

@Injectable()
export class APIRequestOptions extends BaseRequestOptions {

  constructor() {
    super();
    this.headers.append("X-XSRF-TOKEN", "");
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Accept", "application/json");
  }

  public static setCSRFToken(http: Http, token: string) {
    http._defaultOptions.headers.set("X-XSRF-TOKEN", token);
    console.log("this.csrfToken", token);
  }
}