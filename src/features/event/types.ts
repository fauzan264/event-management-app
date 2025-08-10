import { IEventOrganizer } from "../eventOrganizer/types";

export interface IVenue {
  venueName: string;
  venueCapacity: number;
  address: string;
}

export interface IEvent {
  id: string;
  eventName: string;
  category: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  description: string;
  availableTicket: number;
  price: number;
  eventOrganizerId: string;
  venueId: string;
  createdAt: Date;
  updatedAt: Date;
  eventOrganizer: Pick<IEventOrganizer, "companyName">;
  venue: IVenue;
}
