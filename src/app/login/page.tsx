"use client";
import { loginSchema } from "@/features/auth/login/schemas/loginSchema";
import { IAuth } from "@/features/auth/types";
import { login } from "@/services/auth";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import Link from "next/link";
import useAuthStore from "@/store/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const onLoginAccount = async ({
    email,
    password,
  }: Pick<IAuth, "email" | "password">) => {
    try {
      const res = await login({ email, password });

      Swal.fire({
        title: res.data.message,
        icon: "success",
        showConfirmButton: false,
      });

      if (res.status == 200) {
        setAuth({
          token: res.data.data.token,
          fullname: res.data.data.full_name,
          userRole: res.data.data.role,
        });

        if (res.data.data.role == "EVENT_ORGANIZER") {
          router.push("/app");
        } else {
          router.push("/");
        }
      }
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
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: ({ email, password }) => {
      onLoginAccount({ email, password });
    },
  });

  return (
    <>
      <div className="min-h-screen flex items-center justify-center mt-15">
        <div className="card w-1/2 md:w-2/5 bg-purple-900 card-md shadow-sm py-5">
          <div className="card-body">
            <h2 className="card-title justify-center text-gray-200">Login</h2>
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
                  />
                </label>
                {formik.errors.password && formik.touched.password && (
                  <div className="feedback text-red-600">
                    {formik.errors.password}
                  </div>
                )}
              </fieldset>
              <div className="text-right mt-2">
                <Link href="/forgot-password" className="text-sm text-lime-400">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn border-0 bg-pink-500 hover:bg-pink-600 active:bg-pink-600 transition ease-in-out duration-300 text-gray-200 w-full mt-5 focus:outline-none"
              >
                Register
              </button>
            </form>
            <p className="mt-3 text-white">
              {"Don't have an account? "}
              <Link href="/register" className="text-lime-400">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
