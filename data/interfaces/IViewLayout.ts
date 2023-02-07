import {ViewTemplateItemType} from 'data/enum/ViewTemplateItemType'
import {ViewTemplateItemView} from 'data/enum/ViewTemplateItemView'
import {IPromo} from 'data/interfaces/IPromo'
import {IUnit} from 'data/interfaces/IUnit'

export interface IViewLayoutItem {
  name: string;
  emoji: string;
  type: ViewTemplateItemType;
  view: ViewTemplateItemView;
  promos?: IPromo[];
  units?: IUnit[];
}
export interface IViewLayout {
  items: IViewLayoutItem[];
}
