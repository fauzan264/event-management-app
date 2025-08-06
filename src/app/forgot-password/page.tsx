"use client";

import { forgotPasswordSchema } from "@/features/auth/forgot-password/schemas/forgotPasswordSchema";
import { IAuth } from "@/features/auth/types";
import { requestResetPassword } from "@/services/auth";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import Swal from "sweetalert2";

export default function ForgotPasswordPage() {
  const forgotPassword = async ({ email }: Pick<IAuth, "email">) => {
    try {
      const res = await requestResetPassword({ email });

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
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: ({ email }) => {
      forgotPassword({ email });
    },
  });

  return (
    <>
      <div className="min-h-screen flex items-center justify-center mt-15">
        <div className="card w-1/2 md:w-2/5 bg-purple-900 card-md shadow-sm py-5">
          <div className="card-body">
            <div className="card-title justify-center text-gray-200">
              Forgot Password
            </div>
            <form onSubmit={formik.handleSubmit}>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-gray-200">Email</legend>
                <label
                  htmlFor=""
                  className="input input-accent validator w-full"
                >
                  <MdEmail />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </label>
                {formik.errors.email && formik.touched.email && (
                  <div className="feedback text-red-600">
                    {formik.errors.email}
                  </div>
                )}
              </fieldset>

              <button
                type="submit"
                className="btn border-0 bg-pink-500 hover:bg-pink-600 active:bg-pink-600 transition ease-in-out duration-300 text-gray-200 w-full mt-5 focus:outline-none"
              >
                Send Request
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
