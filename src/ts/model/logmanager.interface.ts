import { Deserializable } from "./deserializable";

export class AuthContext implements Deserializable<AuthContext> {
  public id: number;
  public username: string;
  public password: string;
  fromJson(json: Object): AuthContext {
      this.id = json['id'];
      this.username = json['username'];
      this.password = json['password'];
      return this;
  }
}

export class ConnectionConfig implements Deserializable<ConnectionConfig> {
  public id: number;
  public authContext: AuthContext;
  public host: string;
  fromJson(json: Object): ConnectionConfig {
    this.id = json['id'];
    this.authContext = new AuthContext().fromJson(json['authContext']);
    this.host = json['host'];
    return this;
  }
}

export class GraylogQueryConfig implements Deserializable<GraylogQueryConfig> {
  public id: number;
  public queryString: string;

  fromJson(json: Object): GraylogQueryConfig {
    this.id = json['id'];
    this.queryString = json['queryString'];
    return this;
  }
}

export class GraylogClientConfig implements Deserializable<GraylogClientConfig> {
  public id: number;
  public name: string;
  public connectionConfig: ConnectionConfig;
  public queryConfig: GraylogQueryConfig;
  public webHost: string;
  private _class: string = "com.xetus.pci.wake.manager.graylog.GraylogClientConfig";

  fromJson(json: Object): GraylogClientConfig {
    this.id = json['id'];
    this.name = json['name'];
    this.webHost = json['webHost'];
    this.connectionConfig = new ConnectionConfig()
                              .fromJson(json['connectionConfig']);
    this.queryConfig = new GraylogQueryConfig()
                              .fromJson(json['queryConfig']);
    return this;
  }
}