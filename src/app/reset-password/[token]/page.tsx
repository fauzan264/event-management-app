"use client";

import { resetPasswordSchema } from "@/features/auth/reset-password/schemas/resetPasswordSchema";
import { IAuth } from "@/features/auth/types";
import { resetPassword } from "@/services/auth";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useParams } from "next/navigation";
import { TbLockPassword } from "react-icons/tb";
import Swal from "sweetalert2";

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();

  const onResetPassword = async ({
    password,
    token,
  }: Pick<IAuth, "password"> & { token: string }) => {
    try {
      const res = await resetPassword({ password, token });

      Swal.fire({
        title: res.data.message,
        icon: "success",
        showConfirmButton: false,
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data.message || "Something went wrong!";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: ({ password }) => {
      if (!token) {
        Swal.fire("Token tidak ditemukan!", "", "error");
        return;
      }

      onResetPassword({ password, token });
    },
  });

  return (
    <>
      <div className="min-h-screen flex items-center justify-center mt-15">
        <div className="card w-1/2 md:w-2/5 bg-purple-900 card-md shadow-sm py-5">
          <div className="card-body">
            <div className="card-title justify-center text-gray-200">
              Reset Password
            </div>
            <form onSubmit={formik.handleSubmit}>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-gray-200">
                  Password
                </legend>
                <label
                  htmlFor=""
                  className="input input-accent validator w-full"
                >
                  <TbLockPassword />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </label>
                {formik.errors.password && formik.touched.password && (
                  <div className="feedback text-red-600">
                    {formik.errors.password}
                  </div>
                )}
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-gray-200">
                  Confirmation Password
                </legend>
                <label
                  htmlFor=""
                  className="input input-accent validator w-full"
                >
                  <TbLockPassword />
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                  />
                </label>
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && (
                    <div className="feedback text-red-600">
                      {formik.errors.confirmPassword}
                    </div>
                  )}
              </fieldset>

              <button
                type="submit"
                className="btn border-0 bg-pink-500 hover:bg-pink-600 active:bg-pink-600 transition ease-in-out duration-300 text-gray-200 w-full mt-5 focus:outline-none"
              >
                Submit
              </button>
            </form>
            <p className="mt-3 text-white">
              {"Remember your password? "}
              <Link href="/login" className="text-lime-400">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
