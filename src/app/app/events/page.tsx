"use client";
import { myEventOrganizer } from "@/services/user";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { IEventOrganizer } from "@/features/eventOrganizer/types";
import { myEvents } from "@/services/eventOrganizer";
import { IEvent } from "@/features/event/types";
import camelcaseKeys from "camelcase-keys";
import Link from "next/link";
import { deleteEvent } from "@/services/event";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function EventsPage() {
  const { token } = useAuthStore();
  const router = useRouter();
  const auth = useAuthStore();
  const [eventOrganizer, setEventOrganizer] = useState<IEventOrganizer | null>(
    null
  );
  const [events, setEvents] = useState<IEvent[] | null>(null);
  const [eventName, setEventName] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState("");
  const [limit, setLimit] = useState("");

  const getMyEventOrganizer = async () => {
    const res = await myEventOrganizer({ id: auth?.id, token });
    if (res) {
      setEventOrganizer(camelcaseKeys(res?.data.data));
    }
  };

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
  };

  const onDeleteEvent = async ({
    id,
    eventName,
  }: Pick<IEvent, "id" | "eventName">) => {
    Swal.fire({
      title: `Are you sure you want to delete the event ${eventName}?`,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await deleteEvent({ id, token });
        console.log(res.data.message);
        Swal.fire(res.data.message, "", "success");
      }
    });
  };

  useEffect(() => {
    if (auth?.id) {
      getMyEventOrganizer();
    }
  }, [auth?.id]);

  useEffect(() => {
    if (eventOrganizer?.id) {
      getMyEvents({
        eventOrganizerId: eventOrganizer?.id,
        eventName,
        category,
        page,
        limit,
        token,
      });
    }
  }, [eventOrganizer?.id, eventName, category, page, limit, token]);

  return (
    <div className="mx-auto w-11/12 my-10">
      <div className="flex">
        <h1 className="text-2xl text-gray-200">List My Event</h1>
        <Link
          href="/app/events/create"
          className="btn btn-sm bg-blue-700 ml-auto text-gray-200 hover:bg-blue-800 active:bg-blue-800 transition ease-in-out duration-300 focus:outline-none focus:ring-0 border-0"
        >
          Tambah Event
        </Link>
      </div>
      <div className="card bg-gray-800 my-5">
        <div className="card-body">
          <div className="overflow-x-auto ">
            <table className="table border-border-gray-100">
              <thead>
                <tr>
                  <th className="text-gray-200">Event Name</th>
                  <th className="text-gray-200">Category</th>
                  <th className="text-gray-200">Available Ticket</th>
                  <th className="text-gray-200">#</th>
                </tr>
              </thead>
              <tbody>
                {events?.map((event) => {
                  return (
                    <tr key={event.id}>
                      <td className="text-gray-200">{event.eventName}</td>
                      <td className="text-gray-200">{event.category}</td>
                      <td className="text-gray-200">{event.availableTicket}</td>
                      <td>
                        <Link
                          href={`/app/events/detail/${event.id}`}
                          className="btn btn-success btn-sm text-gray-200 hover:shadow-md mx-2 my-2"
                        >
                          Detail
                        </Link>
                        <Link
                          href={`/app/events/edit/${event.id}`}
                          className="btn btn-info btn-sm text-gray-200 hover:shadow-md mx-2 my-2"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            onDeleteEvent({
                              id: event.id,
                              eventName: event.eventName,
                            });
                          }}
                          className="btn btn-error btn-sm text-gray-200 hover:shadow-md mx-2 my-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
