import { PersistentEntity } from "../../rest/rest.interface";

export class JobRecoveryStrategy
             implements PersistentEntity<JobRecoveryStrategy> {
  id: number;
  name: string;
  cronExpression: string;
  retryLimit: number;

  fromJson(json: Object): JobRecoveryStrategy {
    this.id = json['id'];
    this.name = json['name'];
    this.cronExpression = json['cronExpression'];
    this.retryLimit = json['retryLimit'];

    return this;
  }
}