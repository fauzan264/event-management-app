import { IEvent, IVenue } from "@/features/event/types";
import axiosInstance from "@/lib/axiosInstances";

export const detailEvent = ({ id }: Pick<IEvent, "id">) => {
  return axiosInstance.get(`/events/${id}`);
};

export const createEvent = ({
  eventName,
  category,
  startDate,
  endDate,
  description,
  availableTicket,
  price,
  venueName,
  venueCapacity,
  address,
  image,
  token,
}: Pick<
  IEvent,
  | "eventName"
  | "category"
  | "startDate"
  | "endDate"
  | "description"
  | "availableTicket"
  | "price"
> &
  Pick<IVenue, "venueName" | "venueCapacity" | "address"> & {
    image: string;
    token: string;
  }) => {
  return axiosInstance.post(
    "/events",
    {
      eventName,
      category,
      startDate,
      endDate,
      description,
      availableTicket,
      price,
      venueName,
      venueCapacity,
      address,
      image,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateEvent = ({
  id,
  eventName,
  category,
  startDate,
  endDate,
  description,
  availableTicket,
  price,
  venueName,
  venueCapacity,
  address,
  image,
  token,
}: Pick<
  IEvent,
  | "id"
  | "eventName"
  | "category"
  | "startDate"
  | "endDate"
  | "description"
  | "availableTicket"
  | "price"
> &
  Pick<IVenue, "venueName" | "venueCapacity" | "address"> & {
    image: string;
    token: string;
  }) => {
  return axiosInstance.put(
    `/events/${id}`,
    {
      eventName,
      category,
      startDate,
      endDate,
      description,
      availableTicket,
      price,
      venueName,
      venueCapacity,
      address,
      image,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteEvent = ({
  id,
  token,
}: Pick<IEvent, "id"> & {
  token: string;
}) => {
  return axiosInstance.delete(`/events/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
