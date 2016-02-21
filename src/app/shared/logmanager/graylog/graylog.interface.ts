import { Deserializable }             from '../../util/deserializable';
import { LogManagerClientConfig,
         ConnectionConfig }           from '../logmanager.interface';

export class GraylogQueryConfig implements Deserializable<GraylogQueryConfig> {
  public id: number;
  public queryString: string;

  fromJson(json: Object): GraylogQueryConfig {
    this.id = json['id'];
    this.queryString = json['queryString'];
    return this;
  }
}

export class GraylogClientConfig extends LogManagerClientConfig<GraylogQueryConfig> {
  public id: number;
  public name: string;
  public connectionConfig: ConnectionConfig;
  public queryConfig: GraylogQueryConfig;
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