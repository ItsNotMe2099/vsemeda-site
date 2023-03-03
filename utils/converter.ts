import {GeoObject} from 'data/interfaces/IYandexGeocoder'
import {IUserAddress} from 'data/interfaces/IUserAddress'

export default class Converter {
  static hexToRgbA(hex: string, opacity: number) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})` : null
  }

  static getObjectDotsKeys(obj: any, prefix?: string | null): any {
    const flatMap = (a: any[], cb: (v: any, i: number) => any) => [].concat(...a.map(cb))
    if (typeof obj !== 'object') throw new Error('Invalid argument, must be an object')
    return flatMap(Object.keys(obj), (key) => {
      const value = obj[key]
      const fullKey = prefix ? `${prefix}.${key}` : key

      if (Array.isArray(value)) {
        return flatMap(value, (v: any, i: number) => {
          const arrKey = `${fullKey}[${i}]`
          if (typeof v === 'object') return this.getObjectDotsKeys(v, arrKey)
          return arrKey
        })
      }

      if (typeof value === 'object') return this.getObjectDotsKeys(value, fullKey)
      return fullKey
    })

  }

  static convertStringCoordinatesToLatLng(coordinates: string){
    return   coordinates.split(' ').map(i => parseFloat(i))
  }

  static convertGeoObjectToUserAddress(geoObject: GeoObject): IUserAddress {
    const components = geoObject.metaDataProperty.GeocoderMetaData.Address.Components
    const point = geoObject.Point
    return {
      address: this.convertGeoObjectToString(geoObject),
      city: components
          ?.find((element) => element.kind == 'locality')
          ?.name ??
        '',
      street: components
          ?.find((element) => element.kind == 'street')
          ?.name ??
        '',
      house: components
          ?.find((element) => element.kind == 'house')
          ?.name ??
        '',

      location: {lat: this.convertStringCoordinatesToLatLng(point.pos)[1], lng: this.convertStringCoordinatesToLatLng(point.pos)[0]}
    }
  }

  static convertGeoObjectToString(geoObject: GeoObject): string | null {
    return geoObject.name
  }
}
