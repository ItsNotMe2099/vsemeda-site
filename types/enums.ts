
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
  Feedbacks = 'feedbacks',
  Search = 'search',
  ActiveOrder = 'activeOrderModal',
  CancelOrder = 'cancelOrder',
  OrderDetails = 'orderDetails',
  LeaveReview = 'leaveReview',
  Complaint= 'complaint',
  IFrame = 'iframe',
  ComplaintEndModal = 'complaintEndModal',
  AlertModal = 'alertModal'
}

export enum SnackbarType {
  error,
  success,
}

export enum CookiesType {
  accessToken = 'accessToken',
  sessionId = 'x-session',
  uuid = 'uuid',
  address = 'address',
  paymentMethod = 'payment-method'
}

export enum LocalStorageKey {
  addresses = 'addresses',
  currentAddressId = 'currentAddressId',
  filter = 'filter'
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

export enum RiveArtboard {
  loader_v1 = 'loader_v1',
  loader_v2 = 'loader_v2',
  loader_v3 = 'loader_v3',
  spinner = 'spinner',
  delivered = 'delivered',
  delivering = 'delivering',
  preparing = 'preparing',
  phone = 'phone'
}

export enum FileUploadAcceptType {
  Image = 'image',
  Video = 'video',
  Document = 'document',
  Scan = 'scan',
  Media = 'media',
  Archives = 'archives'
}
