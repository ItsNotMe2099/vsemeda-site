import {LayoutIcon} from 'data/enum/LayoutIcon'

export enum ProductCardLayoutPosType {
  ImgT = 'imgTl',
  CardT = 'cardT',
}

export interface IProductCardLayoutCardItem {
  type?: string;
  img?: LayoutIcon;
  clr?: string;
  txt?: string;
  promoId?: number;
}
export interface IProductCardLayoutImgItem {
  img?: LayoutIcon;
  clr?: string;
}

export interface IProductCardLayout {
  [ProductCardLayoutPosType.ImgT]?: IProductCardLayoutImgItem[];
  [ProductCardLayoutPosType.CardT]?: IProductCardLayoutCardItem[];
}
