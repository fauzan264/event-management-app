"use client";
import { FaRegUser, FaRegAddressCard, FaPhone } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { FiLink } from "react-icons/fi";
import { MdDateRange } from "react-icons/md";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { IAuth } from "../../features/auth/types";
import { register } from "@/services/auth";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { registerSchema } from "../../features/auth/register/schemas/registerSchema";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const onRegisterAccount = async ({
    idCardNumber,
    fullName,
    dateOfBirth,
    email,
    password,
    phoneNumber,
    referralCode,
    userRole,
  }: Pick<
    IAuth,
    | "idCardNumber"
    | "fullName"
    | "dateOfBirth"
    | "email"
    | "password"
    | "phoneNumber"
    | "referralCode"
    | "userRole"
  >) => {
    try {
      const res = await register({
        idCardNumber,
        fullName,
        dateOfBirth,
        email,
        password,
        phoneNumber,
        referralCode,
        userRole,
      });

      Swal.fire({
        title: res.data.message,
        icon: "success",
        showConfirmButton: false,
      });

      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || "Something went wrong!";
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
      idCardNumber: "",
      fullName: "",
      dateOfBirth: "",
      email: "",
      password: "",
      phoneNumber: "",
      referralCode: "",
      userRole: "",
    },
    validationSchema: registerSchema,
    onSubmit: ({
      idCardNumber,
      fullName,
      dateOfBirth,
      email,
      password,
      phoneNumber,
      referralCode,
      userRole,
    }) => {
      onRegisterAccount({
        idCardNumber,
        fullName,
        dateOfBirth,
        email,
        password,
        phoneNumber,
        referralCode,
        userRole,
      });
    },
  });

  return (
    <>
      <div className="min-h-screen flex items-center justify-center mt-15">
        <div className="card w-10/12 md:w-2/5 bg-purple-900 card-md shadow-sm py-5">
          <div className="card-body">
            <h2 className="card-title justify-center text-gray-200">
              Register Account
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-wrap -mx-1">
                <div className="w-full md:w-1/2 px-1">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-gray-200">
                      Nomor Identitas
                    </legend>
                    <label
                      htmlFor=""
                      className="input input-accent validator w-full"
                    >
                      <FaRegAddressCard />
                      <input
                        type="text"
                        name="idCardNumber"
                        id="idCardNumber"
                        onChange={formik.handleChange}
                        value={formik.values.idCardNumber}
                      />
                    </label>
                    {formik.errors.idCardNumber &&
                      formik.touched.idCardNumber && (
                        <div className="feedback text-red-600">
                          {formik.errors.idCardNumber}
                        </div>
                      )}
                  </fieldset>
                </div>

                <div className="w-full md:w-1/2 px-1">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-gray-200">
                      Nama Lengkap
                    </legend>
                    <label
                      htmlFor=""
                      className="input input-accent validator w-full"
                    >
                      <FaRegUser />
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        onChange={formik.handleChange}
                        value={formik.values.fullName}
                      />
                    </label>
                    {formik.errors.fullName && formik.touched.fullName && (
                      <div className="feedback text-red-600">
                        {formik.errors.fullName}
                      </div>
                    )}
                  </fieldset>
                </div>

                <div className="w-full md:w-1/2 px-1">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-gray-200">
                      Email
                    </legend>
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
                </div>

                <div className="w-full md:w-1/2 px-1">
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
                </div>

                <div className="w-full md:w-1/2 px-1">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-gray-200">
                      Tanggal Lahir
                    </legend>
                    <label
                      htmlFor=""
                      className="input input-accent validator w-full"
                    >
                      <MdDateRange />
                      <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        onChange={formik.handleChange}
                        value={formik.values.dateOfBirth}
                      />
                    </label>
                    {formik.errors.dateOfBirth &&
                      formik.touched.dateOfBirth && (
                        <div className="feedback text-red-600">
                          {formik.errors.dateOfBirth}
                        </div>
                      )}
                  </fieldset>
                </div>

                <div className="w-full md:w-1/2 px-1">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-gray-200">
                      Phone Number
                    </legend>
                    <label
                      htmlFor=""
                      className="input input-accent validator w-full"
                    >
                      <FaPhone />
                      <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        onChange={formik.handleChange}
                        value={formik.values.phoneNumber}
                      />
                    </label>
                    {formik.errors.phoneNumber &&
                      formik.touched.phoneNumber && (
                        <div className="feedback text-red-600">
                          {formik.errors.phoneNumber}
                        </div>
                      )}
                  </fieldset>
                </div>

                <div className="w-full">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-gray-200">
                      Referral Code
                      <span className="text-lime-400 text-sm font-medium">
                        (Opsional)
                      </span>
                      <div
                        className="tooltip tooltip-right tooltip-success"
                        data-tip="Boleh dikosongkan jika tidak punya kode referral"
                      >
                        <span className="bg-gray-600 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
                          ?
                        </span>
                      </div>
                    </legend>
                    <label
                      htmlFor=""
                      className="input input-accent validator w-full"
                    >
                      <FiLink />
                      <input
                        type="text"
                        name="referralCode"
                        id="referralCode"
                        onChange={formik.handleChange}
                        value={formik.values.referralCode}
                      />
                    </label>
                    {formik.errors.referralCode &&
                      formik.touched.referralCode && (
                        <div className="feedback text-red-600">
                          {formik.errors.referralCode}
                        </div>
                      )}
                  </fieldset>
                </div>

                <div className="w-full">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-gray-200">
                      Daftar Sebagai
                    </legend>
                    <select
                      name="userRole"
                      id="userRole"
                      className="select select-accent w-full"
                      onChange={formik.handleChange}
                      value={formik.values.userRole}
                    >
                      <option value="CUSTOMER">Customer</option>
                      <option value="EVENT_ORGANIZER">Event Organizer</option>
                    </select>
                    {formik.errors.userRole && formik.touched.userRole && (
                      <div className="feedback text-red-600">
                        {formik.errors.userRole}
                      </div>
                    )}
                  </fieldset>
                </div>

                <button
                  type="submit"
                  className="btn border-0 bg-pink-500 hover:bg-pink-600 active:bg-pink-600 transition ease-in-out duration-300 text-gray-200 w-full mt-5 focus:outline-none"
                >
                  Register
                </button>
              </div>
            </form>
            <p className="mt-3 text-white">
              You have an account?{" "}
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
