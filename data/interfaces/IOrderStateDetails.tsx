import { OrderStateButton, OrderStateColor, OrderStateIcon } from "data/enum/OrderState";

export interface IOrderStateDetails {
    name: string;
    shortName?: string;
    desc?: string;
    icon: OrderStateIcon;
    color: OrderStateColor;
    buttons: OrderStateButton[];
  }