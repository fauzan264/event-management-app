"use client";
import { formatDate } from "@/app/utils/dateFormatter";
import { IEventList } from "@/components/type";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function PurchaseOrder() {
    const { eventId } = useParams();
    const [event, setEvent] = useState<IEventList | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (eventId) {
            axios
                .get(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}`)
                .then((res) => setEvent(res.data.data))
                .finally(() => setLoading(false));
        }
    }, [eventId]);

    if (loading) return <p>Loading...</p>;
    if (!event) return <p>Event tidak ditemukan</p>;
    return (
        <>
            <main className="p-10 mt-15">
                <div className="grid grid-cols-[5fr_3fr] p-3">
                    <div className="flex flex-col items-center bg-blue-200 h-20 p-3">
                        <div>{event.event_name}</div>
                        <div>
                            {event.start_date === event.end_date
                                ? formatDate(event.start_date)
                                : `${formatDate(
                                      event.start_date
                                  )} - ${formatDate(event.end_date)}`}
                        </div>
                        <p>Ini akan jadi form tiket</p>
                    </div>
                    <div className="bg-red-200">
                        <div
                            className="relative w-full"
                            style={{ aspectRatio: "2 / 1" }}
                        >
                            <Image
                                src={event.image_url}
                                alt="Banner Event"
                                fill
                                className="object-contain object-top"
                            />
                        </div>
                        
                    </div>
                </div>
            </main>
        </>
    );
}
