export default class CookiesUtils {
  static decodeJson<T>(value: string): T | null {
    try{
      return value ? JSON.parse(decodeURI(value)) : null
    }catch (e) {

    }
  }
  static encodeJson(value: any): string {
    try{
      return value ? encodeURI(JSON.stringify(value)) : null
    }catch (e) {

    }
  }
}

