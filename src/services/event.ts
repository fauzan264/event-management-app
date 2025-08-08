import { IEvent } from "@/features/event/types";
import axiosInstance from "@/lib/axiosInstances";

export const detailEvent = ({ id }: Pick<IEvent, "id">) => {
  return axiosInstance.get(`/events/${id}`);
};
