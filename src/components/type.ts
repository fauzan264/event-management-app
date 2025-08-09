export interface IEventList {
    id : string,
    event_name : string,
    image_url : string,
    description: string
    start_date : string,
    end_date : string,
    venue : IVenue,
    price: number,
    category : string,
    available_ticket : number
}

export interface IVenue {
  venue_name: string,
  address : string
}

export interface IPurchaseOrder {
  
}