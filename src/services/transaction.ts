import { IPurchaseOrder } from "@/components/type";
import axiosInstance from "@/lib/axiosInstances";
import snakecaseKeys from "snakecase-keys";

export const confirmTransaction = ({
  id,
  orderStatus,
  token,
}: Pick<IPurchaseOrder, "orderStatus"> & { id: string; token: string }) => {
  return axiosInstance.post(
    `/purchase-order/confirm/${id}`,
    snakecaseKeys({ orderStatus }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const detailTransaction = ({
  orderId,
  token,
}: {
  orderId: string;
  token: string;
}) => {
  return axiosInstance.get(`/purchase-order/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
