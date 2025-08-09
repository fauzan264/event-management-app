"use client";
import { createEvent } from "@/services/event";
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

export default function EditEventPage() {
  const { token } = useAuthStore();
  const onCreateEvent = async ({
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
    | "eventName"
    | "category"
    | "startDate"
    | "endDate"
    | "description"
    | "availableTicket"
    | "price"
  > &
    Pick<IVenue, "venueName" | "venueCapacity" | "address"> & {
      image: string;
      token: string;
    }) => {
    try {
      const res = await createEvent({
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
    } catch (error: unknown) {}
  };

  const formik = useFormik({
    initialValues: {
      eventName: "",
      category: "",
      startDate: "",
      endDate: "",
      description: "",
      availableTicket: "",
      price: "",
      venueName: "",
      venueCapacity: "",
      address: "",
      image: "",
    },
    // validationSchema: registerSchema,
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
      onCreateEvent({
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

  return (
    <div className="mx-auto w-11/12 my-10">
      <h1 className="text-2xl text-gray-200">Create Event</h1>
      <div className="card bg-gray-800 my-5">
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap -mx-1">
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
                      type="date"
                      name="startDate"
                      id="startDate"
                      onChange={formik.handleChange}
                      value={formik.values.startDate}
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
                      type="date"
                      name="endDate"
                      id="endDate"
                      onChange={formik.handleChange}
                      value={formik.values.endDate}
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
                  ></textarea>
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
                      value={formik.values.venueCapacity}
                    />
                  </label>
                  {formik.errors.venueCapacity &&
                    formik.touched.venueCapacity && (
                      <div className="feedback text-red-600">
                        {formik.errors.venueCapacity}
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
                    value={formik.values.address}
                  ></textarea>
                  {formik.errors.address && formik.touched.address && (
                    <div className="feedback text-red-600">
                      {formik.errors.address}
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
