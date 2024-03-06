import {SubscriptionStatus} from 'data/enum/SubscriptionStatus'

export interface ISubscription {
  id: number
  status: SubscriptionStatus
}
