import {LayoutIcon} from 'data/enum/LayoutIcon'
export interface IUnitCardLayoutPosBg {
  color: string;
  opacity?: number;
}
export interface IUnitCardLayoutItemIcon {
  val: LayoutIcon; // Тип иконки
  color?: string; // Цвет иконки
}
export interface IUnitCardLayoutItemText {
  val: string; // текст
  color?: string; // Цвет текста
}
export enum UnitCardLayoutItemType {
  priceRating = 'priceRating',
  badge = 'badge',
  custom = 'custom',
}
export enum UnitCardLayoutPosItemsType {
  ListDot = 'listDot', //Список разделенный точками
  List = 'list', // список разделеннный margin например рейтинг с доставкой
}

export enum UnitCardLayoutPosType {
  ImgTl = 'imgTl',
  ImgTr = 'imgTr',
  ImgBl = 'imgBl',
  ImgBr = 'imgBr',
  CardT = 'cardT',
  CardC = 'cardC',
  CardB = 'cardB',
}
export interface IUnitCardLayoutItem {
  type: UnitCardLayoutItemType;
  text?: IUnitCardLayoutItemText;
  icon?: IUnitCardLayoutItemIcon;
}

export interface IUnitCardLayoutPos {
  type: UnitCardLayoutPosItemsType;
  bg?: IUnitCardLayoutPosBg;
  items: IUnitCardLayoutItem[];
}

export interface IUnitCardLayout {
  [UnitCardLayoutPosType.ImgTl]?: IUnitCardLayoutPos;
  [UnitCardLayoutPosType.ImgTr]?: IUnitCardLayoutPos;
  [UnitCardLayoutPosType.ImgBl]?: IUnitCardLayoutPos;
  [UnitCardLayoutPosType.ImgBr]?: IUnitCardLayoutPos;
  [UnitCardLayoutPosType.CardT]?: IUnitCardLayoutPos;
  [UnitCardLayoutPosType.CardC]?: IUnitCardLayoutPos;
  [UnitCardLayoutPosType.CardB]?: IUnitCardLayoutPos;
}
