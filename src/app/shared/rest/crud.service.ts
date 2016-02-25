import { Component, Injectable }  from 'angular2/core';
import { Http }                   from 'angular2/http';
import { Observable }             from 'rxjs/Rx';

import { Config }                 from '../config/config.service';

import { PersistentEntity }         from './rest.interface';

@Injectable()
export abstract class AbstractCrudService<T extends PersistentEntity<any>> {
  private _cache: T[];

  abstract getFindAllEndpoint(): string;
  abstract getFindOneEndpoint(id: number): string;
  abstract getCreateEndpoint(): string;
  abstract getSaveEndpoint(id: number): string;
  abstract getDeleteEndpoint(id: number): string;

  abstract fromJson(json: Object): T;

  constructor(protected _http: Http,
              protected _config: Config) {}

  findAll(): Observable<T[]> {
    let result = Observable.create((observable) => {
      this._http.get(this.getFindAllEndpoint())
             .map(res => res.json())
             .map((entities: any) => {
               let result: T[] = [];
               if (entities) {
                 entities.forEach((instance) => {
                   result.push(this.fromJson(instance));
                 });
               }
               this._cache = result;
               return this._cache;
             }).subscribe(
               (data) => observable.next(data),
               (err) => observable.error(err),
               () => observable.complete()
             );
    });
    return result;
  }

  findOne(id: number): Observable<T> {
    let result = Observable.create((observable) => {
      this._http.get(this.getFindOneEndpoint(id))
             .map(res => res.json())
             .map((instance: any) => {
               if (instance) {
                 return (this.fromJson(instance));
               }
               return null;
             }).subscribe(
               (data) => observable.next(data),
               (err) => observable.error(err),
               () => observable.complete()
             );
    });
    return result;
  }

  create(obj: T): Observable<T> {
    let result = Observable.create((observable) => {
      this._http.post(this.getCreateEndpoint(), JSON.stringify(obj))
          .map(res => res.json())
          .map((instance: any) => {
            if (instance) {
              return (this.fromJson(instance));
            }
            return null;
          }).subscribe(
            (data) => observable.next(data),
            (err) => observable.error(err),
            () => observable.complete()
          );
    });
    return result;
  }

  save(obj: T): Observable<T> {
    let result = Observable.create((observable) => {
      this._http.post(this.getSaveEndpoint(obj.id), JSON.stringify(obj))
          .map(res => res.json())
          .map((instance: any) => {
            if (instance) {
              return (this.fromJson(instance));
            }
            return null;
          }).subscribe(
            (data) => observable.next(data),
            (err) => observable.error(err),
            () => observable.complete()
          );
     });
     return result;
  }

  delete(obj: T): Observable<any> {
    let result = Observable.create((observable) => {
      this._http.delete(this.getDeleteEndpoint(obj.id))
          .map(res => res.json())
          .subscribe(
            (data) => observable.next(data),
            (err) => observable.error(err),
            () => observable.complete()
          );
    });
    return result;
  }
}