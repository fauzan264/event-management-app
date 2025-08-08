"use client";
import { IEvent } from "@/features/event/types";
import { detailEvent } from "@/services/event";
import camelcaseKeys from "camelcase-keys";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formattingDateTime } from "../../../../../../utils/formattingDate";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<IEvent | null>(null);

  const getDetailEvent = async () => {
    if (!id) return;
    const res = await detailEvent({ id });

    setEvent(camelcaseKeys(res?.data?.data) as IEvent);
  };

  useEffect(() => {
    getDetailEvent();
  }, []);

  return (
    <div className="mx-auto w-11/12 my-10">
      <h1 className="text-2xl text-gray-200">Detail Event</h1>
      <div className="card bg-gray-800 my-5">
        <div className="card-body">
          <div className="flex justify-between items-start p-6 flex-col md:flex-row-reverse">
            <div className="w-60 h-60 bg-slate-700 flex items-center justify-center text-gray-400 rounded my-5">
              {event?.imageUrl && (
                <figure className="w-60 h-60 block relative">
                  <Image
                    src={event?.imageUrl}
                    alt={`${event?.eventName} image`}
                    fill
                    className="object-cover"
                  />
                </figure>
              )}
            </div>
            <div className="space-y-3">
              <h1 className="text-xl text-gray-200 font-semibold">
                Event Info
              </h1>
              <div className="flex flex-col md:flex-row">
                <p className="text-gray-300 w-40 flex-grow-0">Event Name</p>
                <p className="font-semibold text-gray-200 flex-grow-0">
                  {event?.eventName}
                </p>
              </div>
              <div className="flex flex-col md:flex-row">
                <p className="text-gray-300 w-40 flex-grow-0">Category</p>
                <p className="font-semibold text-gray-200 flex-grow-0">
                  {event?.category}
                </p>
              </div>
              <div className="flex flex-col md:flex-row">
                <p className="text-gray-300 w-40 flex-grow-0">Start Date</p>
                <p className="font-semibold text-gray-200 flex-grow-0">
                  {event?.startDate
                    ? formattingDateTime({ date: event?.startDate })
                    : ""}
                </p>
              </div>
              <div className="flex flex-col md:flex-row">
                <p className="text-gray-300 w-40 flex-grow-0">End Date</p>
                <p className="font-semibold text-gray-200 flex-grow-0">
                  {event?.endDate
                    ? formattingDateTime({ date: event?.endDate })
                    : ""}
                </p>
              </div>
              <div className="flex flex-col md:flex-row">
                <p className="text-gray-300 w-40 flex-grow-0">
                  Available Ticket
                </p>
                <p className="font-semibold text-gray-200 flex-grow-0">
                  {event?.availableTicket}
                </p>
              </div>
              <div className="flex flex-col md:flex-row">
                <p className="text-gray-300 w-40 flex-grow-0">Price</p>
                <p className="font-semibold text-gray-200 flex-grow-0">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(Number(event?.price))}
                </p>
              </div>
              <div className="flex flex-col md:flex-row">
                <p className="text-gray-300 w-40 flex-grow-0">Created At</p>
                <p className="font-semibold text-gray-200 flex-grow-0">
                  {event?.createdAt
                    ? formattingDateTime({
                        date: new Date(event?.createdAt).toISOString(),
                      })
                    : ""}
                </p>
              </div>
              <div className="flex flex-col md:flex-row">
                <p className="text-gray-300 w-40 flex-grow-0">Updated At</p>
                <p className="font-semibold text-gray-200 flex-grow-0">
                  {event?.updatedAt
                    ? formattingDateTime({
                        date: new Date(event?.updatedAt).toISOString(),
                      })
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-gray-800 my-5">
        <div className="card-body">
          <h1 className="text-xl text-gray-200">Description</h1>
          <p className="text-gray-200">{event?.description}</p>
        </div>
      </div>
      <div className="card bg-gray-800 my-5">
        <div className="card-body">
          <h1 className="text-xl text-gray-200">List of Participants</h1>
          <table className="table border-border-gray-100">
            <thead>
              <tr>
                <th className="text-gray-200">Full Name</th>
                <th className="text-gray-200">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-gray-200">Ucup</td>
                <td className="text-gray-200">ucup@mania.com</td>
              </tr>
              <tr>
                <td className="text-gray-200">Jaya</td>
                <td className="text-gray-200">jaya@mail.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
