"use client";
import { detailEvent, updateEvent } from "@/services/event";
import useAuthStore from "@/store/useAuthStore";
import { IEvent, IVenue } from "@/features/event/types";
import { useFormik } from "formik";
import {
  MdDateRange,
  MdEventNote,
  MdLocationOn,
  MdGroups2,
} from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { FaTicketAlt } from "react-icons/fa";
import { updateEventSchema } from "@/features/event/schemas/eventSchema";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import camelcaseKeys from "camelcase-keys";
import Image from "next/image";
import AuthGuard from "@/hoc/AuthGuard";

function EditEventPage() {
  const router = useRouter();
  const { token } = useAuthStore();
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<IEvent | null>(null);

  const getDetailEvent = async () => {
    if (!id) return;
    const res = await detailEvent({ id });

    setEvent(camelcaseKeys(res?.data?.data, { deep: true }) as IEvent);
  };

  useEffect(() => {
    getDetailEvent();
  }, []);

  const onEditEvent = async ({
    id,
    eventName,
    category,
    startDate,
    endDate,
    description,
    availableTicket,
    price,
    venueName,
    venueCapacity,
    address,
    image,
    token,
  }: Pick<
    IEvent,
    | "id"
    | "eventName"
    | "category"
    | "startDate"
    | "endDate"
    | "description"
    | "availableTicket"
    | "price"
  > &
    Pick<IVenue, "venueName" | "venueCapacity" | "address"> & {
      image: File[];
      token: string;
    }) => {
    if (!id) return;

    Swal.fire({
      title: `Are you sure you want to edit this event?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, edit it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await updateEvent({
            id,
            eventName,
            category,
            startDate,
            endDate,
            description,
            availableTicket,
            price,
            venueName,
            venueCapacity,
            address,
            image,
            token,
          });

          Swal.fire(res.data.message, "", "success");

          router.push("/app/events");
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
      eventName: "",
      category: "",
      startDate: "",
      endDate: "",
      description: "",
      availableTicket: 0,
      price: 0,
      venueName: "",
      venueCapacity: 0,
      address: "",
      image: [] as File[],
    },
    validationSchema: updateEventSchema,
    onSubmit: ({
      eventName,
      category,
      startDate,
      endDate,
      description,
      availableTicket,
      price,
      venueName,
      venueCapacity,
      address,
      image,
    }) => {
      onEditEvent({
        id,
        eventName,
        category,
        startDate,
        endDate,
        description,
        availableTicket,
        price,
        venueName,
        venueCapacity,
        address,
        image,
        token,
      });
    },
  });

  useEffect(() => {
    if (event) {
      formik.setValues({
        image: [],
        eventName: event.eventName || "",
        category: event.category || "",
        startDate: event.startDate
          ? new Date(event.startDate).toISOString().slice(0, 16)
          : "",
        endDate: event.endDate
          ? new Date(event.endDate).toISOString().slice(0, 16)
          : "",
        description: event.description || "",
        availableTicket: event.availableTicket || 0,
        price: event.price || 0,
        venueName: event.venue?.venueName || "",
        venueCapacity: event.venue?.venueCapacity || 0,
        address: event.venue?.address || "",
      });
    }
  }, [event]);

  return (
    <div className="mx-auto w-11/12 my-10">
      <h1 className="text-2xl text-gray-200">Create Event</h1>
      <div className="card bg-gray-800 my-5">
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap -mx-1">
              <div className="w-full">
                {event?.imageUrl && (
                  <figure className="w-40 h-40 block relative rounded">
                    <Image
                      src={event?.imageUrl}
                      alt={`${event?.eventName} image`}
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
                    id="image"
                    name="image"
                    type="file"
                    className="file-input file-input-success w-full md:w-1/3"
                    onChange={(event) => {
                      const files = Array.from(
                        event?.currentTarget.files || []
                      );
                      formik.setFieldValue("image", files);
                    }}
                    multiple
                  />
                  {formik.errors.image && formik.touched.image && (
                    <div className="feedback text-red-600">
                      {formik?.touched?.image && formik?.errors?.image && (
                        <div>{formik?.errors.image.toString()}</div>
                      )}
                    </div>
                  )}
                </fieldset>
              </div>
              <div className="w-full md:w-1/2 px-1">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-200">
                    Event Name
                  </legend>
                  <label
                    htmlFor=""
                    className="input input-accent validator w-full"
                  >
                    <MdEventNote />
                    <input
                      type="text"
                      name="eventName"
                      id="eventName"
                      onChange={formik.handleChange}
                      value={formik.values.eventName}
                    />
                  </label>
                  {formik.errors.eventName && formik.touched.eventName && (
                    <div className="feedback text-red-600">
                      {formik.errors.eventName}
                    </div>
                  )}
                </fieldset>
              </div>
              <div className="w-full md:w-1/2 px-1">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-200">
                    Category
                  </legend>
                  <select
                    name="category"
                    id="category"
                    className="select select-accent w-full"
                    onChange={formik.handleChange}
                    value={formik.values.category}
                  >
                    <option value="MUSIC">Music</option>
                    <option value="SPORT">Sport</option>
                    <option value="EDUCATION">Education</option>
                  </select>
                  {formik.errors.category && formik.touched.category && (
                    <div className="feedback text-red-600">
                      {formik.errors.category}
                    </div>
                  )}
                </fieldset>
              </div>

              <div className="w-full md:w-1/2 px-1">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-200">
                    Start Date
                  </legend>
                  <label
                    htmlFor=""
                    className="input input-accent validator w-full"
                  >
                    <MdDateRange />
                    <input
                      type="datetime-local"
                      name="startDate"
                      id="startDate"
                      onChange={formik.handleChange}
                      value={
                        event?.startDate
                          ? new Date(event.startDate).toISOString().slice(0, 16)
                          : formik.values.startDate
                      }
                    />
                  </label>
                  {formik.errors.startDate && formik.touched.startDate && (
                    <div className="feedback text-red-600">
                      {formik.errors.startDate}
                    </div>
                  )}
                </fieldset>
              </div>

              <div className="w-full md:w-1/2 px-1">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-200">
                    End Date
                  </legend>
                  <label
                    htmlFor=""
                    className="input input-accent validator w-full"
                  >
                    <MdDateRange />
                    <input
                      type="datetime-local"
                      name="endDate"
                      id="endDate"
                      onChange={formik.handleChange}
                      value={
                        event?.endDate
                          ? new Date(event.endDate).toISOString().slice(0, 16)
                          : formik.values.endDate
                      }
                    />
                  </label>
                  {formik.errors.endDate && formik.touched.endDate && (
                    <div className="feedback text-red-600">
                      {formik.errors.endDate}
                    </div>
                  )}
                </fieldset>
              </div>

              <div className="w-full">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-200">
                    Description
                  </legend>
                  {/* <FiLink /> */}
                  <textarea
                    className="textarea w-full"
                    placeholder="Description"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                  {formik.errors.description && formik.touched.description && (
                    <div className="feedback text-red-600">
                      {formik.errors.description}
                    </div>
                  )}
                </fieldset>
              </div>

              <div className="w-full md:w-1/2 px-1">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-200">
                    Available Ticket
                  </legend>
                  <label
                    htmlFor=""
                    className="input input-accent validator w-full"
                  >
                    <FaTicketAlt />
                    <input
                      type="number"
                      name="availableTicket"
                      id="availableTicket"
                      onChange={formik.handleChange}
                      value={formik.values.availableTicket}
                    />
                  </label>
                  {formik.errors.availableTicket &&
                    formik.touched.availableTicket && (
                      <div className="feedback text-red-600">
                        {formik.errors.availableTicket}
                      </div>
                    )}
                </fieldset>
              </div>

              <div className="w-full md:w-1/2 px-1">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-200">
                    Price
                  </legend>
                  <label
                    htmlFor=""
                    className="input input-accent validator w-full"
                  >
                    <IoMdPricetag />
                    <input
                      type="number"
                      name="price"
                      id="price"
                      onChange={formik.handleChange}
                      value={formik.values.price}
                    />
                  </label>
                  {formik.errors.price && formik.touched.price && (
                    <div className="feedback text-red-600">
                      {formik.errors.price}
                    </div>
                  )}
                </fieldset>
              </div>

              <div className="w-full md:w-1/2 px-1">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-200">
                    Venue Name
                  </legend>
                  <label
                    htmlFor=""
                    className="input input-accent validator w-full"
                  >
                    <MdLocationOn />
                    <input
                      type="text"
                      name="venueName"
                      id="venueName"
                      onChange={formik.handleChange}
                      value={formik.values.venueName}
                    />
                  </label>
                  {formik.errors.venueName && formik.touched.venueName && (
                    <div className="feedback text-red-600">
                      {formik.errors.venueName}
                    </div>
                  )}
                </fieldset>
              </div>

              <div className="w-full md:w-1/2 px-1">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-200">
                    Venue Capacity
                  </legend>
                  <label
                    htmlFor=""
                    className="input input-accent validator w-full"
                  >
                    <MdGroups2 />
                    <input
                      type="text"
                      name="venueCapacity"
                      id="venueCapacity"
                      onChange={formik.handleChange}
                      value={event?.venue.venueCapacity}
                    />
                  </label>
                  {formik.errors.venueCapacity &&
                    formik.touched.venueCapacity && (
                      <div className="feedback text-red-600">
                        {formik.values.venueCapacity}
                      </div>
                    )}
                </fieldset>
              </div>

              <div className="w-full">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-200">
                    Address
                  </legend>
                  {/* <FiLink /> */}
                  <textarea
                    className="textarea w-full"
                    placeholder="Address"
                    name="address"
                    onChange={formik.handleChange}
                    value={event?.venue.address}
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

export default AuthGuard(EditEventPage, ["EVENT_ORGANIZER"]);
