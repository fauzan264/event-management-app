"use client";
import { updateUserSchema } from "@/features/auth/schema/userSchema";
import { IAuth } from "@/features/auth/types";
import { myProfile, updateProfile } from "@/services/user";
import useAuthStore from "@/store/useAuthStore";
import { AxiosError } from "axios";
import camelcaseKeys from "camelcase-keys";
import { useFormik } from "formik";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegUser, FaRegAddressCard, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import Swal from "sweetalert2";

export default function EditProfilePage() {
  const router = useRouter();
  const { token } = useAuthStore();
  const [profile, setProfile] = useState<IAuth | null>(null);

  const onGetProfile = async () => {
    const res = await myProfile({ token });

    setProfile(camelcaseKeys(res.data.data));
  };

  useEffect(() => {
    if (token) onGetProfile();
  }, [token]);

  const onEditProfile = async ({
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
  > & {
    profilePicture: File[];
    token: string;
  }) => {
    if (!id) return;

    Swal.fire({
      title: `Are you sure you want to edit your profile?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, edit it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await updateProfile({
            id,
            idCardNumber,
            fullName,
            dateOfBirth,
            email,
            phoneNumber,
            profilePicture,
            token,
          });

          Swal.fire(res.data.message, "", "success");

          router.push("/app/profile");
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            const message =
              error.response?.data.message || "Something went wrong!";
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
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      idCardNumber: "",
      fullName: "",
      dateOfBirth: "",
      email: "",
      phoneNumber: "",
      profilePicture: [] as File[],
    },
    validationSchema: updateUserSchema,
    onSubmit: ({
      idCardNumber,
      fullName,
      dateOfBirth,
      email,
      phoneNumber,
      profilePicture,
    }) => {
      onEditProfile({
        id: profile?.id ?? "",
        idCardNumber,
        fullName,
        dateOfBirth,
        email,
        phoneNumber,
        profilePicture,
        token,
      });
    },
  });

  useEffect(() => {
    if (profile) {
      formik.setValues({
        profilePicture: [],
        idCardNumber: profile.idCardNumber || "",
        fullName: profile.fullName || "",
        dateOfBirth: profile.dateOfBirth || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
      });
    }
  }, [profile]);

  return (
    <div className="mx-auto w-11/12 my-10">
      <h1 className="text-2xl text-gray-200">Create Event</h1>
      <div className="card bg-gray-800 my-5">
        <div className="card-body">
          <div className="card-title justify-center text-gray-200">
            Edit Profile
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap -mx-1">
              <div className="w-full">
                {profile?.profilePicture && (
                  <figure className="w-40 h-40 block relative rounded">
                    <Image
                      src={profile?.profilePicture}
                      alt={`${profile?.fullName} image`}
                      fill
                      className="object-cover"
                    />
                  </figure>
                )}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-200">
                    Image
                  </legend>
                  <input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    className="file-input file-input-success w-full md:w-1/3"
                    onChange={(event) => {
                      const files = Array.from(
                        event?.currentTarget.files || []
                      );
                      formik.setFieldValue("profilePicture", files);
                    }}
                    multiple
                  />
                  {formik.errors.profilePicture &&
                    formik.touched.profilePicture && (
                      <div className="feedback text-red-600">
                        {formik?.touched?.profilePicture &&
                          formik?.errors?.profilePicture && (
                            <div>
                              {formik?.errors.profilePicture.toString()}
                            </div>
                          )}
                      </div>
                    )}
                </fieldset>
              </div>
              <div className="w-full">
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
                  {formik.errors.dateOfBirth && formik.touched.dateOfBirth && (
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
                  {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                    <div className="feedback text-red-600">
                      {formik.errors.phoneNumber}
                    </div>
                  )}
                </fieldset>
              </div>

              <button
                type="submit"
                className="btn border-0 bg-pink-500 hover:bg-pink-600 active:bg-pink-600 transition ease-in-out duration-300 text-gray-200 w-full mt-5 focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
