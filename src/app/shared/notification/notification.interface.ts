import { Deserializable }        from '../util/deserializable';

export class NotificationConfig implements Deserializable<NotificationConfig> {
  id: number;
  name: string;

  // subclasses must define for server-side Jackson De-/Serialization
  _class: string;

  fromJson(json: Object): NotificationConfig {
    this.id = json['id'];
    this.name = json['name'];
    return this;
  }
}