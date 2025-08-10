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

export const updateProfile = ({
  id,
  idCardNumber,
  fullName,
  dateOfBirth,
  email,
  phoneNumber,
  profilePicture,
  token,
}: Pick<
  IAuth,
  "id" | "idCardNumber" | "fullName" | "dateOfBirth" | "email" | "phoneNumber"
> & { profilePicture: File[]; token: string }) => {
  const formData = new FormData();
  formData.append("id_card_number", idCardNumber);
  formData.append("full_name", fullName);
  formData.append("date_of_birth", dateOfBirth);
  formData.append("email", email);
  formData.append("phone_number", phoneNumber);
  (profilePicture as File[]).forEach((pictureItem) => {
    formData.append("profile_picture", pictureItem);
  });

  return axiosInstance.put(`/users/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
