import { Injectable } from 'angular2/core';

import { LogReviewJobConfig }         from '../../shared/logreview/logreview.interface';
import { GraylogClientConfig }        from '../../shared/logmanager/graylog/graylog.interface';
import { MailConfig }                 from '../../shared/notification/mail/mail.interface';

@Injectable()
export class WizardContextService {
  jobConfig: LogReviewJobConfig = new LogReviewJobConfig(
    new GraylogClientConfig(),
    [new MailConfig()],
    [new MailConfig()],
    [new MailConfig()]
  );
}