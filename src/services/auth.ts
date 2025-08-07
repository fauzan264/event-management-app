import snakecaseKeys from "snakecase-keys";
import { IAuth } from "../features/auth/types";
import axiosInstance from "../lib/axiosInstances";

export const login = ({
  email,
  password,
}: Pick<IAuth, "email" | "password">) => {
  return axiosInstance.post("/auth/login", { email, password });
};

export const register = ({
  idCardNumber,
  fullname,
  dateOfBirth,
  email,
  password,
  phoneNumber,
  referralCode,
  userRole,
}: Pick<
  IAuth,
  | "idCardNumber"
  | "fullname"
  | "dateOfBirth"
  | "email"
  | "password"
  | "phoneNumber"
  | "referralCode"
  | "userRole"
>) => {
  return axiosInstance.post(
    "/auth/register",
    snakecaseKeys({
      idCardNumber,
      fullname,
      dateOfBirth,
      email,
      password,
      phoneNumber,
      referralCode,
      userRole,
    })
  );
};

export const requestResetPassword = ({ email }: Pick<IAuth, "email">) => {
  return axiosInstance.post("/auth/request-reset-password", { email });
};

export const resetPassword = ({
  password,
  token,
}: Pick<IAuth, "password"> & { token: string }) => {
  return axiosInstance.post(
    `/auth/reset-password`,
    { password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const changePassword = ({
  oldPassword,
  newPassword,
  token,
}: {
  oldPassword: string;
  newPassword: string;
  token: string;
}) => {
  return axiosInstance.post(
    `/auth/change-password`,
    snakecaseKeys({ oldPassword, newPassword }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const sessionLogin = ({ token }: { token: string }) => {
  return axiosInstance.get("/auth/session", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
