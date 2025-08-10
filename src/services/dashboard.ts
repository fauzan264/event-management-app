import { IEvent } from "@/features/event/types";
import { IEventOrganizer } from "@/features/eventOrganizer/types";
import axiosInstance from "@/lib/axiosInstances";

export const dashboard = ({
  eventOrganizerId,
  token,
}: Pick<IEvent, "eventOrganizerId"> & { token: string }) => {
  return axiosInstance.get(`/dashboard/${eventOrganizerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
