import { Component, Injectable }  from 'angular2/core';
import { Observable }             from 'rxjs/observable';
import { Http }                   from 'angular2/http';

import { Config }                 from './config.service';
import { GraylogClientConfig }    from '../model/logmanager.interface';

@Injectable()
export class GraylogClientConfigService {
  private static ENDPOINT: string = "/logmanager/graylog/config/client";

  private _configs: GraylogClientConfig[];

  constructor(private _http: Http,
              private _config: Config) {}

  getClientConfigs(): Observable<GraylogClientConfig[]> {
    return this._http.get(this._config.pciwakeHost +
                          GraylogClientConfigService.ENDPOINT)
                     .map(res => res.json())
                     .map((configs: any) => {
                       let result: GraylogClientConfig[] = [];
                       if (configs) {
                         configs.forEach((config) => {
                           result.push(new GraylogClientConfig().fromJson(config));
                         });
                       }
                       this._configs = result;
                       console.log("result: ", result);
                       return this._configs;
                     });
  }

  getClientConfig(id: number): Observable<GraylogClientConfig> {
    return this._http.get(this._config.pciwakeHost +
                          GraylogClientConfigService.ENDPOINT + "/" + id)
                     .map(res => res.json())
                     .map((config: any) => {
                       if (config) {
                         return (new GraylogClientConfig().fromJson(config));
                       }
                       return null;
                     });
  }

  createClientConfig(config: GraylogClientConfig): Observable<GraylogClientConfig> {
    let obs: Observable<GraylogClientConfig> = this._http.post(
            this._config.pciwakeHost + GraylogClientConfigService.ENDPOINT,
            JSON.stringify(config)
        )
        .map(res => res.json())
        .map((config: any) => {
          if (config) {
            return (new GraylogClientConfig().fromJson(config));
          }
          return null;
        });
    obs.subscribe();
    return obs;
  }

  saveClientConfig(config: GraylogClientConfig): Observable<GraylogClientConfig> {
    return this._http.post(this._config.pciwakeHost +
                           GraylogClientConfigService.ENDPOINT + "/" + config.id,
                           JSON.stringify(config))
                     .map(res => res.json())
                     .map((config: any) => {
                       if (config) {
                         return (new GraylogClientConfig().fromJson(config));
                       }
                       return null;
                     });
  }

  deleteClientConfig(config: GraylogClientConfig): Observable<any> {
    let obs: Observable<any> = this._http
      .delete(this._config.pciwakeHost +
              GraylogClientConfigService.ENDPOINT + "/" + config.id)
       .map(res => res.json());

    obs.subscribe((value) => {
                    console.log("result", value);
                    this._configs = this._configs.filter((cached) => {
                      return cached.id != config.id;
                    });
                  },
                  (error) => { console.log("error", error) });
    return obs;
  }
}