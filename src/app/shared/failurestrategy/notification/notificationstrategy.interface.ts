import { PersistentEntity } from "../../rest/rest.interface";
import { ParseUtils }       from "../../util/deserializable";
import { MailConfig }       from "../../notification/mail/mail.interface";

export class NotificationStrategy
             implements PersistentEntity<NotificationStrategy> {
  id: number;

  constructor(public name: string = null,
              public notifications: MailConfig[] = []) {}

  fromJson(json: Object): NotificationStrategy {
    this.id = json['id'];
    this.name = json['name'];
    this.notifications = <MailConfig[]> ParseUtils.parseArray(
      json['notifications'],
      (item) => new MailConfig().fromJson(item)
    );

    return this;
  }
}