import { PersistentEntity }           from '../../rest/rest.interface';
import { NotificationConfig }         from '../notification.interface';

export class MailConfig extends NotificationConfig {
  id: number;
  name: string;
  smtpConfig: SmtpConfig;
  targetAddresses: string[] = [];
  subjectTemplate: string;
  messageTemplate: string;
  contentType: string;

  _class: string = "com.xetus.pci.wake.notification.mail.MailNotification";

  constructor(smtpConfig?: SmtpConfig) {
    super();
    if (smtpConfig == null) {
      smtpConfig = new SmtpConfig();
    }
    this.smtpConfig = smtpConfig;
  }

  fromJson(json: Object): MailConfig {
    super.fromJson(json);
    this.smtpConfig = new SmtpConfig().fromJson(json['smtpConfig']);
    this.targetAddresses = json['targetAddresses'];
    this.subjectTemplate = json['subjectTemplate'];
    this.messageTemplate = json['messageTemplate'];
    this.contentType = json['contentType'];
    return this;
  }
}

export class SmtpConfig implements PersistentEntity<SmtpConfig> {
  id: number;
  name: string;
  smtpHost: string;
  smtpPort: string;
  smtpFrom: string;
  smtpUser: string;
  smtpPass: string;

  fromJson(json: Object): SmtpConfig {
    this.id = json['id'];
    this.name = json['name'];
    this.smtpHost = json['smtpHost'];
    this.smtpPort = json['smtpPort'];
    this.smtpFrom = json['smtpFrom'];
    this.smtpUser = json['smtpUser'];
    this.smtpPass = json['smtpPass'];
    return this;
  }

}