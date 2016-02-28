export interface Deserializable<T> {
  fromJson(json: Object): T;
}

export class ParseUtils {
  static parseArray(json: Object, parser: Function): Object[] {
    if (!json || !Array.isArray(json)) {
      return null;
    }

    var result = [];
    (<Object[]>json).forEach((item) => result.push(parser(item)));
    return result;
  }
}