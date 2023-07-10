import queryString from 'query-string'
export class Routes {
  static  restaurant(regionSlug: string, brandSlug: string, placeSlug?: string) {
    return `/${regionSlug}/rest/${brandSlug}${placeSlug ? '?' : ''}${queryString.stringify({place: placeSlug}, {skipNull: true, skipEmptyString: true})}`
  }

  static index(regionSlug?: string) {
    return `/${regionSlug ? '?' : ''}${queryString.stringify({regionSlug}, {skipNull: true, skipEmptyString: true})}`
  }



}
