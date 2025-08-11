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
    image: File[];
    token: string;
  }) => {
  const formData = new FormData();
  formData.append("event_name", eventName);
  formData.append("category", category);
  formData.append("start_date", startDate);
  formData.append("end_date", endDate);
  formData.append("description", description);
  formData.append("available_ticket", String(availableTicket));
  formData.append("price", String(price));
  formData.append("venue_name", venueName);
  formData.append("venue_capacity", String(venueCapacity));
  formData.append("address", address);
  (image as File[]).forEach((imageItem) => {
    formData.append("image", imageItem);
  });

  return axiosInstance.post("/events", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
    image: File[];
    token: string;
  }) => {
  const formData = new FormData();
  formData.append("event_name", eventName);
  formData.append("category", category);
  formData.append("start_date", startDate);
  formData.append("end_date", endDate);
  formData.append("description", description);
  formData.append("available_ticket", String(availableTicket));
  formData.append("price", String(price));
  formData.append("venue_name", venueName);
  formData.append("venue_capacity", String(venueCapacity));
  formData.append("address", address);
  (image as File[]).forEach((imageItem) => {
    formData.append("image", imageItem);
  });

  return axiosInstance.put(`/events/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

export const detailEventAttendees = ({
  eventId,
  token,
}: {
  eventId: string;
  token: string;
}) => {
  return axiosInstance.get(`/events/${eventId}/attendees`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const detailEventTransactions = ({
  eventId,
  token,
}: {
  eventId: string;
  token: string;
}) => {
  return axiosInstance.get(`/events/${eventId}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
