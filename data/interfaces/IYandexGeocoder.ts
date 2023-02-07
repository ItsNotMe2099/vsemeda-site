export interface YandexResponseGeocoder {
  response: Response;
}
export interface Response {
  GeoObjectCollection: GeoObjectCollection;
}
export interface GeoObjectCollection {
  metaDataProperty: GeocoderResponseMetaData;
  featureMember: FeatureMember[];
}
export interface FeatureMember {
  GeoObject: GeoObject;
}
export interface GeoObject {
  name: string;
  description: string;
  Point: Point;
  boundedBy: BoundedBy;
  metaDataProperty: MetaDataProperty;
}
export interface MetaDataProperty {
  GeocoderMetaData: GeocoderMetaData;
}
export interface GeocoderMetaData {
  kind: string;
  text: string;
  precision: string;
  Address: Address;
}
export interface Address {
  country_code: string;
  postal_code: string;
  formatted: string;
  Components: IComponent[];
}
export interface IComponent {
  kind: string;
  name: string;
}
export interface BoundedBy {
  Envelope: Envelope;
}
export interface Envelope {
  lowerCorner: string;
  upperCorner: string;
}
export interface Point {
  pos: string;
}
export interface GeocoderResponseMetaData {
  found: string;
  request: string;
  results: string;
}
