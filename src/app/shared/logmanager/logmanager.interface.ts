import { Deserializable } from "../util/deserializable";

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

export abstract class QueryConfig implements Deserializable<QueryConfig> {
  public id: number;
  abstract fromJson(json: Object): QueryConfig;
}

export abstract class LogManagerClientConfig<Q extends QueryConfig>
                      implements Deserializable<LogManagerClientConfig<Q>> {
  public id: number
  public name: string
  public connectionConfig: ConnectionConfig
  public queryConfig: Q
  _class: string; // subclasses must define

  abstract newQueryConfig(): Q;

  fromJson(json: Object): LogManagerClientConfig<Q> {
    this.id = json['id'];
    this.name = json['name'];
    this.connectionConfig = new ConnectionConfig()
                              .fromJson(json['connectionConfig']);
    this.queryConfig = <Q> this.newQueryConfig().fromJson(json['queryConfig']);
    return this;
  }
}
