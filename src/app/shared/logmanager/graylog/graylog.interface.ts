import { LogManagerClientConfig,
         QueryConfig,
         ConnectionConfig }           from '../logmanager.interface';

export class GraylogQueryConfig extends QueryConfig {
  public queryString: string;

  fromJson(json: Object): GraylogQueryConfig {
    super.fromJson(json);
    this.id = json['id'];
    this.queryString = json['queryString'];
    return this;
  }
}

export class GraylogClientConfig extends LogManagerClientConfig<GraylogQueryConfig> {
  public webHost: string;
  _class: string = "com.xetus.pci.wake.manager.graylog.GraylogClientConfig";

  newQueryConfig(): GraylogQueryConfig {
    return new GraylogQueryConfig();
  }

  fromJson(json: Object): GraylogClientConfig {
    super.fromJson(json);
    this.webHost = json['webHost'];
    return this;
  }
}