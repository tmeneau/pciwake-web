import { PersistentEntity } from "../rest/rest.interface";

export class AuthContext implements PersistentEntity<AuthContext> {
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

export class ConnectionConfig implements PersistentEntity<ConnectionConfig> {
  public id: number;
  public name: string;
  public authContext: AuthContext;
  public host: string;

  constructor(authContext?: AuthContext) {
    if (authContext == null) {
      authContext = new AuthContext();
    }
    this.authContext = authContext;
  }

  fromJson(json: Object): ConnectionConfig {
    this.id = json['id'];
    this.name = json['name'];
    this.authContext = new AuthContext().fromJson(json['authContext']);
    this.host = json['host'];
    return this;
  }
}

export abstract class QueryConfig implements PersistentEntity<QueryConfig> {
  public id: number;
  public name: string;

  fromJson(json: Object): QueryConfig {
    this.id = json['id'];
    this.name = json['name'];
    return this;
  }
}

export abstract class LogManagerClientConfig<Q extends QueryConfig>
                      implements PersistentEntity<LogManagerClientConfig<Q>> {
  public id: number
  public name: string
  public connectionConfig: ConnectionConfig
  public queryConfig: Q

  // subclasses must define for server-side Jackson De-/Serialization
  _class: string;

  constructor(connectionConfig?: ConnectionConfig, queryConfig?: Q) {
    if (connectionConfig == null) {
      connectionConfig = new ConnectionConfig();
    }
    this.connectionConfig = connectionConfig;

    if (queryConfig == null) {
      queryConfig = this.newQueryConfig();
    }
    this.queryConfig = queryConfig;
  }

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
