export enum ModalType {
  AddressForm = 'addressForm',
  AddressList = 'addressList',
  Product = 'product',
  Login = 'login',
  Profile = 'profile',
  ProfileMenu = 'profileMenu',
  Basket = 'basket',
  ProductModal = 'productModal',
  PreOrderForm = 'preOrderForm',
  IndexFilter = 'indexFilter',
  Confirm = 'confirm',
  Feedbacks = 'feedbacks'
}

export enum SnackbarType {
  error,
  success,
}

export enum CookiesType {
  accessToken = 'accessToken',
  sessionId = 'x-session',
  uuid = 'uuid',
  address = 'address'
}

export enum LocalStorageKey {
  addresses = 'addresses',
  currentAddressId = 'currentAddressId'
}

export enum Preset {
  /** 250px */
  xsResize,
  /** 250px */
  xsCrop,

  /** 500px */
  smResize,
  /** 500px */
  smCrop,

  /** 800px */
  mdResize,
  /** 800px */
  mdCrop,

  /** 1200px */
  lgResize,
  /** 1200px */
  lgCrop,

  /** 1800px */
  xlResize,
  /** 1800px */
  xlCrop,
}
