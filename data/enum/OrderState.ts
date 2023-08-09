export enum OrderState {
  Waiting = 'waiting',
  PaymentProcessing = 'paymentProcessing',
  PaymentError = 'paymentError',
  Sending = 'sending',
  Confirmed = 'confirmed',
  Preparing = 'preparing',
  Ready = 'ready',
  Assigned = 'assigned',
  Delivering = 'delivering',
  PausedDelivery = 'pausedDelivery',
  CancelDelivery = 'cancelDelivery',
  Canceled = 'canceled',
  Arrived = 'arrived',
  Delivered = 'delivered',
}

export enum OrderStateIcon {
  Phone = 'phone',
  Preparing = 'preparing',
  Delivering = 'delivering',
  Delivered = 'delivered',
  PaymentProcessing = 'paymentProcessing',
  PaymentSuccess = 'paymentSuccess',
  PaymentError = 'paymentError',
  Cancelled = 'cancelled',
  Waiting = 'waiting',
}

export enum OrderStateButton {
  Cancel = 'cancel',
  Pay = 'pay',
  Repeat = 'repeat',
}

export enum OrderStateColor {
  Light = 'light',
  Green = 'green',
  Orange = 'orange',
  Red = 'red',
}

export enum OrderCancelReason {
  ChangeOrder = 'changeOrder',
  ChangeMyMind = 'changeMyMind',
  Other = 'other',
}

export enum OrderInitType {
  Start =  'start',
  Stop = 'stop'
}
