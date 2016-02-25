import { Deserializable }        from '../util/deserializable';
import { LogManagerClientConfig } from '../logmanager/logmanager.interface';
import { NotificationConfig }     from '../notification/notification.interface';

export class LogReviewJobConfig implements Deserializable<LogReviewJobConfig>{
    logmanager: LogManagerClientConfig<any>;
    noIncidentNotifications: NotificationConfig[];
    incidentNotifications: NotificationConfig[];
    resolvedNotifications: NotificationConfig[];
    failureStrategy: any; // TODO
    cronExpression: any; // TODO

    constructor(logmanager?: LogManagerClientConfig<any>,
                noIncidentNotifications?: NotificationConfig[],
                incidentNotifications?: NotificationConfig[],
                resolvedNotifications?: NotificationConfig[],
                failureStrategy?: any,
                cronExpression?: any) {
      this.logmanager = logmanager;
      this.noIncidentNotifications = noIncidentNotifications;
      this.incidentNotifications = incidentNotifications;
      this.resolvedNotifications = resolvedNotifications;
      this.failureStrategy = failureStrategy;
      this.cronExpression = cronExpression;
    }

    fromJson(json: Object): LogReviewJobConfig {
      this.logmanager = json['logmanager'];
      this.noIncidentNotifications = json['noIncidentNotifications'];
      this.incidentNotifications = json['incidentNotifications'];
      this.resolvedNotifications = json['resolvedNotifications'];
      this.failureStrategy = json['failureStrategy'];
      this.cronExpression = json['cronExpression'];
      return this;
    }
}