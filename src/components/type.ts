export interface IEventList {
  id: string;
  event_name: string;
  image_url: string;
  description: string;
  start_date: string;
  end_date: string;
  venue: IVenue;
  price: number;
  category: string;
  available_ticket: number;
}

export interface IVenue {
  venue_name: string;
  address: string;
}

export interface IPurchaseOrder {
  orderId: string;
  userId: string;
  fullName: string;
  email: string;
  eventName: string;
  quantity: number;
  price: number;
  discountValue: number;
  userPointsUsed: number;
  finalPrice: number;
  orderStatus: string;
  paymentProof: string;
  expiredAt: string;
  createdAt: string;
}

export interface ITransaction {
  id: string;
  imageUrl: string;
  eventName: string;
  startDate: string; 
  quantity: number;
  finalPrice: number;
  orderStatus: string;
  createdAt: string;
}

export interface IPromo {
  id: string;
  discountValue: number | '';
  description: string;
  availableCoupon: number | '';
  eventId: string;
  startDate: string;
  endDate: string;
  
}