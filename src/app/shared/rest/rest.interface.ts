import { Response }   from 'angular2/http';

import { Deserializable } from '../util/deserializable';

 export class RestResult<T> {
  constructor(data?: T, message?: string, response?: Response) {
    this.data = data;
    this.message = message;
    this.response = response;
  }
  data: T;
  message: string;
  response: Response;
}

export interface PersistentEntity<T> extends Deserializable<T> {
  id: number;
}