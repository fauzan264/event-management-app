"use client";
import { changePasswordSchema } from "@/features/auth/change-password/schemas/changePasswordSchema";
import { changePassword } from "@/services/auth";
import useAuthStore from "@/store/useAuthStore";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { TbLockPassword } from "react-icons/tb";
import Swal from "sweetalert2";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { token } = useAuthStore();

  const onResetPassword = async ({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
    token: string;
  }) => {
    try {
      const res = await changePassword({ oldPassword, newPassword, token });

      Swal.fire({
        title: res.data.message,
        icon: "success",
        showConfirmButton: false,
      });

      router.push("/app/profile");
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
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: ({ oldPassword, newPassword }) => {
      if (!token) {
        Swal.fire("Token tidak ditemukan!", "", "error");
        return;
      }

      onResetPassword({ oldPassword, newPassword, token });
    },
  });

  return (
    <div className="mx-auto w-11/12 my-10">
      <h1 className="text-2xl text-gray-200">Create Event</h1>
      <div className="card bg-gray-800 my-5">
        <div className="card-body">
          <div className="card-title justify-center text-gray-200">
            Change Password
          </div>
          <form onSubmit={formik.handleSubmit}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-gray-200">
                Password
              </legend>
              <label htmlFor="" className="input input-accent validator w-full">
                <TbLockPassword />
                <input
                  type="password"
                  name="oldPassword"
                  id="oldPassword"
                  onChange={formik.handleChange}
                  value={formik.values.oldPassword}
                />
              </label>
              {formik.errors.oldPassword && formik.touched.oldPassword && (
                <div className="feedback text-red-600">
                  {formik.errors.oldPassword}
                </div>
              )}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-gray-200">
                New Password
              </legend>
              <label htmlFor="" className="input input-accent validator w-full">
                <TbLockPassword />
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  onChange={formik.handleChange}
                  value={formik.values.newPassword}
                />
              </label>
              {formik.errors.newPassword && formik.touched.newPassword && (
                <div className="feedback text-red-600">
                  {formik.errors.newPassword}
                </div>
              )}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-gray-200">
                Confirmation New Password
              </legend>
              <label htmlFor="" className="input input-accent validator w-full">
                <TbLockPassword />
                <input
                  type="password"
                  name="confirmNewPassword"
                  id="confirmNewPassword"
                  onChange={formik.handleChange}
                  value={formik.values.confirmNewPassword}
                />
              </label>
              {formik.errors.confirmNewPassword &&
                formik.touched.confirmNewPassword && (
                  <div className="feedback text-red-600">
                    {formik.errors.confirmNewPassword}
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
        </div>
      </div>
    </div>
  );
}
