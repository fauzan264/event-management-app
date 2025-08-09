import { IAuth } from "@/features/auth/types";
import axiosInstance from "@/lib/axiosInstances";

export const myEventOrganizer = ({
  id,
  token,
}: Pick<IAuth, "id"> & { token: string }) => {
  return axiosInstance.get(`/users/${id}/event-organizer`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const myProfile = ({ token }: { token: string }) => {
  return axiosInstance.get(`/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
