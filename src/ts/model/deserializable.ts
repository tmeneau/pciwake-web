export interface Deserializable<T> {
  fromJson(json: Object): T;
}