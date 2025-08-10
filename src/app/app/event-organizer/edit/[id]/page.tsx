"use client";
import { updateEventOrganizerSchema } from "@/features/eventOrganizer/schemas/eventOrganizerSchema";
import { useFormik } from "formik";
import { MdEmail } from "react-icons/md";
import { FaBuilding, FaGlobe, FaPhone } from "react-icons/fa";
import { BiCreditCard } from "react-icons/bi";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { IEventOrganizer } from "@/features/eventOrganizer/types";
import { myEventOrganizer } from "@/services/user";
import camelcaseKeys from "camelcase-keys";
import Swal from "sweetalert2";
import { updateEventOrganizer } from "@/services/eventOrganizer";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import Image from "next/image";

export default function EditEventOrganizerPage() {
  const router = useRouter();
  const { token } = useAuthStore();
  const auth = useAuthStore();
  const [eventOrganizer, setEventOrganizer] = useState<IEventOrganizer | null>(
    null
  );

  const onGetDataEventOrganizer = async () => {
    const res = await myEventOrganizer({ id: auth?.id, token });

    setEventOrganizer(camelcaseKeys(res.data.data, { deep: true }));
  };

  useEffect(() => {
    if (auth?.id) onGetDataEventOrganizer();
  }, [auth?.id]);

  const onEditEventOrganizer = async ({
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
    Swal.fire({
      title: `Are you sure you want to edit your event organizer?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, edit it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await updateEventOrganizer({
            id,
            companyName,
            email,
            phoneNumber,
            address,
            websiteUrl,
            bankAccount,
            bannerUrl,
            token,
          });

          Swal.fire(res.data.message, "", "success");

          router.push("/app/event-organizer");
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
      companyName: "",
      email: "",
      phoneNumber: "",
      address: "",
      websiteUrl: "",
      bankAccount: "",
      bannerUrl: [] as File[],
    },
    validationSchema: updateEventOrganizerSchema,
    onSubmit: ({
      companyName,
      email,
      phoneNumber,
      address,
      websiteUrl,
      bankAccount,
      bannerUrl,
    }) => {
      if (!eventOrganizer) return;

      onEditEventOrganizer({
        id: eventOrganizer?.id,
        companyName,
        email,
        phoneNumber,
        address,
        websiteUrl,
        bankAccount,
        bannerUrl,
        token,
      });
    },
  });

  useEffect(() => {
    if (eventOrganizer) {
      formik.setValues({
        bannerUrl: [],
        companyName: eventOrganizer.companyName || "",
        email: eventOrganizer.email || "",
        phoneNumber: eventOrganizer.phoneNumber || "",
        address: eventOrganizer.address || "",
        websiteUrl: eventOrganizer.websiteUrl || "",
        bankAccount: eventOrganizer.bankAccount || "",
      });
    }
  }, [eventOrganizer]);

  return (
    <div className="mx-auto w-11/12 my-10">
      <h1 className="text-2xl text-gray-200">Update My Event Organizer</h1>
      <div className="card bg-gray-800 my-5">
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap -mx-1">
              <div className="w-full">
                {eventOrganizer?.bannerUrl && (
                  <figure className="w-40 h-40 block relative rounded">
                    <Image
                      src={eventOrganizer?.bannerUrl}
                      alt={`${eventOrganizer?.companyName} image`}
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
                    id="bannerUrl"
                    name="bannerUrl"
                    type="file"
                    className="file-input file-input-success w-full md:w-1/3"
                    onChange={(event) => {
                      const files = Array.from(
                        event?.currentTarget.files || []
                      );
                      formik.setFieldValue("bannerUrl", files);
                    }}
                    multiple
                  />
                  {formik.errors.bannerUrl && formik.touched.bannerUrl && (
                    <div className="feedback text-red-600">
                      {formik?.touched?.bannerUrl &&
                        formik?.errors?.bannerUrl && (
                          <div>{formik?.errors.bannerUrl.toString()}</div>
                        )}
                    </div>
                  )}
                </fieldset>
              </div>

              <div className="w-full md:w-1/2 px-1">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-200">
                    Company Name
                  </legend>
                  <label
                    htmlFor=""
                    className="input input-accent validator w-full"
                  >
                    <FaBuilding />
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      onChange={formik.handleChange}
                      value={formik.values.companyName}
                    />
                  </label>
                  {formik.errors.companyName && formik.touched.companyName && (
                    <div className="feedback text-red-600">
                      {formik.errors.companyName}
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

              <div className="w-full md:w-1/2 px-1">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-200">
                    Website URL
                  </legend>
                  <label
                    htmlFor=""
                    className="input input-accent validator w-full"
                  >
                    <FaGlobe />
                    <input
                      type="text"
                      name="websiteUrl"
                      id="websiteUrl"
                      onChange={formik.handleChange}
                      value={formik.values.websiteUrl}
                    />
                  </label>
                  {formik.errors.websiteUrl && formik.touched.websiteUrl && (
                    <div className="feedback text-red-600">
                      {formik.errors.websiteUrl}
                    </div>
                  )}
                </fieldset>
              </div>

              <div className="w-full md:w-1/2 px-1">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-200">
                    Bank Account
                  </legend>
                  <label
                    htmlFor=""
                    className="input input-accent validator w-full"
                  >
                    <BiCreditCard />
                    <input
                      type="text"
                      name="bankAccount"
                      id="bankAccount"
                      onChange={formik.handleChange}
                      value={formik.values.bankAccount}
                    />
                  </label>
                  {formik.errors.bankAccount && formik.touched.bankAccount && (
                    <div className="feedback text-red-600">
                      {formik.errors.bankAccount}
                    </div>
                  )}
                </fieldset>
              </div>

              <div className="w-full">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-200">
                    Address
                  </legend>
                  <textarea
                    className="textarea w-full"
                    placeholder="Address"
                    name="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                  {formik.errors.address && formik.touched.address && (
                    <div className="feedback text-red-600">
                      {formik.values.address}
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
