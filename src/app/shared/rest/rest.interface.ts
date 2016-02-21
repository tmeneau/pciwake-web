import { Response }   from 'angular2/http';

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