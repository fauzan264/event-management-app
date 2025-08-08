import { IEvent } from "@/features/event/types";
import axiosInstance from "@/lib/axiosInstances";

export const myEvents = ({
  eventOrganizerId,
  eventName,
  category,
  page,
  limit,
  token,
}: Pick<IEvent, "eventOrganizerId" | "eventName" | "category"> & {
  page: string;
  limit: string;
  token: string;
}) => {
  return axiosInstance.get(`/event-organizers/${eventOrganizerId}/events`, {
    params: {
      eventName,
      category,
      page,
      limit,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
