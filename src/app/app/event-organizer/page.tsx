"use client";
import { myEventOrganizer } from "@/services/user";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { IEventOrganizer } from "@/features/eventOrganizer/types";
import camelcaseKeys from "camelcase-keys";
import Image from "next/image";
import { formattingDateTime } from "../../../utils/formattingDate";
import Link from "next/link";
import AuthGuard from "@/hoc/AuthGuard";

function EventOrganizerPage() {
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

  return (
    <>
      <div className="mx-auto w-11/12 my-10">
        <div className="flex">
          <h1 className="text-2xl text-gray-200">My Event Organizer</h1>
          <Link
            href={`/app/event-organizer/edit/${eventOrganizer?.id}`}
            className="btn btn-sm bg-blue-700 ml-auto text-gray-200 hover:bg-blue-800 active:bg-blue-800 transition ease-in-out duration-300 focus:outline-none focus:ring-0 border-0"
          >
            Edit
          </Link>
        </div>
        <div className="card bg-gray-800 my-5">
          <div className="card-body">
            <div className="flex justify-between items-start p-6 flex-col md:flex-row-reverse">
              <div className="w-60 h-60 bg-slate-700 flex items-center justify-center text-gray-400 rounded my-5">
                {eventOrganizer?.bannerUrl && (
                  <figure className="w-60 h-60 block relative">
                    <Image
                      src={eventOrganizer?.bannerUrl}
                      alt={`${eventOrganizer?.companyName} image`}
                      fill
                      className="object-cover"
                    />
                  </figure>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row">
                  <p className="text-gray-300 w-40 flex-grow-0">Company Name</p>
                  <p className="font-semibold text-gray-200 flex-grow-0">
                    {eventOrganizer?.companyName}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row">
                  <p className="text-gray-300 w-40 flex-grow-0">Email</p>
                  <p className="font-semibold text-gray-200 flex-grow-0">
                    {eventOrganizer?.email}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row">
                  <p className="text-gray-300 w-40 flex-grow-0">Phone Number</p>
                  <p className="font-semibold text-gray-200 flex-grow-0">
                    {eventOrganizer?.phoneNumber}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row">
                  <p className="text-gray-300 w-40 flex-grow-0">Address</p>
                  <p className="font-semibold text-gray-200 flex-grow-0">
                    {eventOrganizer?.address}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row">
                  <p className="text-gray-300 w-40 flex-grow-0">Website URL</p>
                  <p className="font-semibold text-gray-200 flex-grow-0">
                    {eventOrganizer?.websiteUrl}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row">
                  <p className="text-gray-300 w-40 flex-grow-0">Bank Account</p>
                  <p className="font-semibold text-gray-200 flex-grow-0">
                    {eventOrganizer?.bankAccount}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row">
                  <p className="text-gray-300 w-40 flex-grow-0">Created At</p>
                  <p className="font-semibold text-gray-200 flex-grow-0">
                    {eventOrganizer?.createdAt
                      ? formattingDateTime({
                          date: new Date(
                            eventOrganizer?.createdAt
                          ).toISOString(),
                        })
                      : ""}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row">
                  <p className="text-gray-300 w-40 flex-grow-0">Updated At</p>
                  <p className="font-semibold text-gray-200 flex-grow-0">
                    {eventOrganizer?.updatedAt
                      ? formattingDateTime({
                          date: new Date(
                            eventOrganizer?.updatedAt
                          ).toISOString(),
                        })
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthGuard(EventOrganizerPage, ["EVENT_ORGANIZER"]);
