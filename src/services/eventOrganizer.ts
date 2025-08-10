import { IEvent } from "@/features/event/types";
import { IEventOrganizer } from "@/features/eventOrganizer/types";
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

export const updateEventOrganizer = ({
  id,
  companyName,
  email,
  phoneNumber,
  address,
  websiteUrl,
  bankAccount,
  bannerUrl,
  token,
}: Pick<
  IEventOrganizer,
  | "id"
  | "companyName"
  | "email"
  | "phoneNumber"
  | "address"
  | "websiteUrl"
  | "bankAccount"
> & {
  bannerUrl: File[];
  token: string;
}) => {
  const formData = new FormData();
  formData.append("company_name", companyName);
  formData.append("email", email);
  formData.append("phone_number", phoneNumber);
  formData.append("address", address);
  formData.append("website_url", websiteUrl);
  formData.append("bank_account", bankAccount);
  (bannerUrl as File[]).forEach((bannerItem) => {
    formData.append("banner_url", bannerItem);
  });

  return axiosInstance.put(`/event-organizers/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
