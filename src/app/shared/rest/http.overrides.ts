import { Injectable }         from 'angular2/core';
import { Http,
         Headers,
         BaseRequestOptions } from 'angular2/http';

@Injectable()
export class APIRequestOptions extends BaseRequestOptions {

  public static CSRF_HEADER = "X-CSRF-TOKEN";

  constructor() {
    super();
    this.headers.append(APIRequestOptions.CSRF_HEADER, "");
    this.headers.append("Content-Type", "application/json");
  }

  public getDefualtHeaders(): Headers {
    let copy = new Headers();
    this.headers.forEach((value, key) => {
      copy.set(key, value);
    });
    return copy;
  }

  public setCSRFToken(http: Http, token: string) {
    this.headers.set(APIRequestOptions.CSRF_HEADER, token);
    http._defaultOptions.headers.set(APIRequestOptions.CSRF_HEADER, token);
  }
}