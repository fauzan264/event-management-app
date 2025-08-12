"use client";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import axios from "axios";
import useAuthStore from "@/store/useAuthStore";
import { IPromo } from "@/components/type";
import Swal from "sweetalert2";
import { PromoSchema } from "@/features/event/schemas/eventSchema";
import { myEvents } from "@/services/eventOrganizer";
import { IEventOrganizer } from "@/features/eventOrganizer/types";
import { IEvent } from "@/features/event/types";
import { myEventOrganizer } from "@/services/user";
import camelcaseKeys from "camelcase-keys";

export default function CreatePromo() {
  const { token } = useAuthStore();
  const auth = useAuthStore();
  const [eventOrganizer, setEventOrganizer] = useState<IEventOrganizer | null>(
    null
  );
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  const getMyEventOrganizer = async () => {
    const res = await myEventOrganizer({ id: auth?.id, token });
    if (res) {
      setEventOrganizer(camelcaseKeys(res?.data.data));
    }
  };

  useEffect(() => {
    if (eventOrganizer?.id) {
      getMyEvents({
        eventOrganizerId: eventOrganizer?.id,
        eventName: "",
        category: "",
        page: "",
        limit: "1000",
        token,
      });
    }
  }, [eventOrganizer?.id, token]);

  const getMyEvents = async ({
    eventOrganizerId,
    eventName,
    category,
    page,
    limit,
    token,
  }: Pick<IEvent, "eventOrganizerId" | "eventName" | "category"> & {
    page: string;
    limit: string;
    token: string;
  }) => {
    const res = await myEvents({
      eventOrganizerId,
      eventName,
      category,
      page,
      limit,
      token,
    });

    setEvents(camelcaseKeys(res?.data.data.events, { deep: true }));
    setLoadingEvents(false);
  };

  useEffect(() => {
    if (auth?.id) {
      getMyEventOrganizer();
    }
  }, [auth?.id]);

  const initialValues: IPromo = {
    id: "",
    discountValue: "",
    description: "",
    availableCoupon: "",
    startDate: "",
    endDate: "",
    eventId: "",
  };

  const handleSubmit = async (
    values: IPromo,
    { setSubmitting, resetForm }: FormikHelpers<IPromo>
  ) => {
    try {
      const payload = {
        discountValue: values.discountValue,
        provider_type: "EVENT_ORGANIZER",
        providerId: eventOrganizer?.id,
        description: values.description,
        availableCoupon: values.availableCoupon,
        eventId: values.eventId,
        startDate: values.startDate,
        endDate: values.endDate,
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/coupon/promo`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Promo berhasil dibuat!",
        showConfirmButton: false,
        timer: 1500,
      });
      resetForm();
    } catch (error: unknown) {
      let message = "Terjadi kesalahan";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      Swal.fire({
        icon: "error",
        title: "Gagal membuat promo",
        text: message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4 py-12 font-inter">
      <Formik
        initialValues={initialValues}
        validationSchema={PromoSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-125 max-w-sm rounded-2xl bg-slate-800 p-8 shadow-2xl">
            <div className="bg-pink-600 text-white p-3 text-center font-bold text-xl rounded-t-xl -mt-8 mx-auto w-4/5 shadow-lg">
              Buat Promo
            </div>

            <div className="space-y-6 mt-8">
              {/* Nilai Diskon */}
              <div>
                <label
                  htmlFor="discountValue"
                  className="block text-sm font-medium text-pink-200 mb-1"
                >
                  Nilai Diskon (%)
                </label>
                <Field
                  id="discountValue"
                  type="number"
                  name="discountValue"
                  className="w-full rounded-lg border-transparent bg-slate-700 px-4 py-2 text-white placeholder-gray-400 focus:border-pink-600 focus:ring-pink-600 transition"
                  placeholder="0-100"
                />
                <ErrorMessage
                  name="discountValue"
                  component="div"
                  className="text-red-400 text-xs mt-1"
                />
              </div>

              {/* Penyedia (read-only) */}
              <div>
                <label
                  htmlFor="provider_type"
                  className="block text-sm font-medium text-pink-200 mb-1"
                >
                  Penyedia
                </label>
                <input
                  id="provider_type"
                  type="text"
                  className="w-full rounded-lg bg-gray-600 px-4 py-2 text-gray-300 cursor-not-allowed"
                  defaultValue="EVENT_ORGANIZER"
                  readOnly
                />
              </div>

              {/* Deskripsi */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-pink-200 mb-1"
                >
                  Deskripsi
                </label>
                <Field
                  id="description"
                  type="text"
                  name="description"
                  className="w-full rounded-lg border-transparent bg-slate-700 px-4 py-2 text-white placeholder-gray-400 focus:border-pink-600 focus:ring-pink-600 transition"
                  placeholder="mis., Diskon Early Bird"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-400 text-xs mt-1"
                />
              </div>

              {/* Kupon Tersedia */}
              <div>
                <label
                  htmlFor="availableCoupon"
                  className="block text-sm font-medium text-pink-200 mb-1"
                >
                  Kupon Tersedia
                </label>
                <Field
                  id="availableCoupon"
                  type="number"
                  name="availableCoupon"
                  className="w-full rounded-lg border-transparent bg-slate-700 px-4 py-2 text-white placeholder-gray-400 focus:border-pink-600 focus:ring-pink-600 transition"
                  placeholder="Jumlah kupon"
                />
                <ErrorMessage
                  name="availableCoupon"
                  component="div"
                  className="text-red-400 text-xs mt-1"
                />
              </div>

              {/* Nama Acara (Dropdown) */}
              <div>
                <label
                  htmlFor="eventId"
                  className="block text-sm font-medium text-pink-200 mb-1"
                >
                  Nama Acara
                </label>
                {loadingEvents ? (
                  <div className="text-pink-400">Loading events...</div>
                ) : (
                  <Field
                    as="select"
                    id="eventId"
                    name="eventId"
                    className="w-full rounded-lg border-transparent bg-slate-700 px-4 py-2 text-white focus:border-pink-600 focus:ring-pink-600 transition"
                  >
                    <option value="" disabled>
                      Pilih acara...
                    </option>
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.eventName}
                      </option>
                    ))}
                  </Field>
                )}
                <ErrorMessage
                  name="eventId"
                  component="div"
                  className="text-red-400 text-xs mt-1"
                />
              </div>

              {/* Tanggal Mulai */}
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-pink-200 mb-1"
                >
                  Tanggal Mulai
                </label>
                <Field
                  id="startDate"
                  type="datetime-local"
                  name="startDate"
                  className="w-full rounded-lg border-transparent bg-slate-700 px-4 py-2 text-white focus:border-pink-600 focus:ring-pink-600 transition"
                />
                <ErrorMessage
                  name="startDate"
                  component="div"
                  className="text-red-400 text-xs mt-1"
                />
              </div>

              {/* Tanggal Selesai */}
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-pink-200 mb-1"
                >
                  Tanggal Selesai
                </label>
                <Field
                  id="endDate"
                  type="datetime-local"
                  name="endDate"
                  className="w-full rounded-lg border-transparent bg-slate-700 px-4 py-2 text-white focus:border-pink-600 focus:ring-pink-600 transition"
                />
                <ErrorMessage
                  name="endDate"
                  component="div"
                  className="text-red-400 text-xs mt-1"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-6 w-full rounded-lg px-4 py-2 font-bold text-white transition-colors ${
                isSubmitting
                  ? "bg-pink-800 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700"
              }`}
            >
              Buat Promo
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
