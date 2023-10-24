import axios from 'axios'
import queryString from 'query-string'
import {YandexResponseGeocoder} from 'data/interfaces/IYandexGeocoder'
import {IYandexSuggestItem} from 'data/interfaces/IYandexSuggest'
import { LngLat} from '@yandex/ymaps3-types'

interface IYandexGeocodeRequest{
  geocode: string|LngLat
  kind?: 'house'
  rspn?: boolean,
  ll?: number[]
  spn?: number[]
  bbox?: number[][]
  lang?: 'ru_RU' | 'be_BY' | 'en_RU' | 'en_US' | 'tr_TR'
  results?: number
}
interface IYandexSuggestRequest{
  text: string,
  //center?: LngLat;
  //span?: LngLat;
  bbox: number[][],
  //countries: 'ru',
  type: 'tp'
  //limit: number,
  // localOnly?: number,
  highlight: boolean,
}
const jsonp = require('jsonp')

export default class GeocodingRepository {
  static async geocodeYandex(params: IYandexGeocodeRequest): Promise<YandexResponseGeocoder> {
    const query = {...params,
      apikey: '7cd75a8b-037e-4152-b0c5-3755e6914531',
      // apikey: '78a1f2d1-073f-4feb-804d-8aebe3deb14b',
      format: 'json',
      results: params.results ?? 10,
      rspn: params.rspn ? '1' : '0',
      ll: params.ll?.length > 1 ? `${params.ll[0]},${params.ll[1]}` : undefined,
      spn: params.spn?.length > 1 ? `${params.spn[0]},${params.spn[1]}` : undefined,
      bbox: params.bbox&&`${params.bbox[0][0]}, ${params.bbox[0][1]}~${params.bbox[1][0]}, ${params.bbox[1][1]}`
    }

    const res = await axios.request({
      url: `https://geocode-maps.yandex.ru/1.x?${ queryString.stringify(query)}`,
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      validateStatus: (status) => status >= 200 && status <= 299
    })
    return res.data
  }

  /*
  apikey:
7cd75a8b-037e-4152-b0c5-3755e6914531
bbox:
37.057361,55.350331,38.429321,56.070876
highlight:
true
limit:
100
n:
100
text:
Акаде
type:
tp
v:
9
   */
  static async suggestYandex(params: IYandexSuggestRequest): Promise<IYandexSuggestItem[]> {


    const query = {...params,
      highlight: params.highlight ? '1' : '0',
      lang: 'ru_RU',
      apikey: '7cd75a8b-037e-4152-b0c5-3755e6914531',
      bbox: `${params.bbox[0][0]},${params.bbox[0][1]},${params.bbox[1][0]},${params.bbox[1][1]}`,
      v: 9,
      n: 100,
      //  callback:'jsonp_ymaps3_suggest_1',
    }

    return new Promise((resolve, reject) => {
      jsonp(`https://suggest-maps.yandex.ru/suggest-geo?${ queryString.stringify(query)}`, null, (err: any, data: any) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(data.results)
        }
      })
    })



  }

}
