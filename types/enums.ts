
export enum ModalType {
  AddressForm = 'addressForm',
  AddressList = 'addressList',
  Product = 'product',
  Login = 'login',
  Profile = 'profile',
  ProfileMenu = 'profileMenu',
}
export enum SnackbarType {
  error,
  success,
}

export enum CookiesType {
  accessToken = 'accessToken',
  sessionId = 'sessionId',
  uuid = 'uuid'
}

export enum LocalStorageKey {
  addresses = 'addresses'
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
