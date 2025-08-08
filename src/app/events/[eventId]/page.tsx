"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { IEventList } from "@/components/type";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { GrTicket } from "react-icons/gr";
import { formatDate } from "@/app/utils/dateFormatter";
import { formatPrice } from "@/app/utils/priceFormatter";

export default function EventDetailPage() {
    
    const { eventId } = useParams();
    const router = useRouter();

    const [event, setEvent] = useState<IEventList | null>(null);
    const [loading, setLoading] = useState(true); // untuk cek apakah sedang fetch
    const [error, setError] = useState<string | null>(null); // untuk cek kalau fetch gagal

    const OnGetEvenDetail = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}`
            );
            setEvent(res.data.data);
        } catch (err) {
            console.error("Failed to fetch event detail:", err);
            setError("Gagal mengambil detail event.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("Params ID:", eventId);

        if (eventId) {
            OnGetEvenDetail();
        }
    }, [eventId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-white text-lg">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-white text-lg">Event tidak ditemukan.</p>
            </div>
        );
    }

    return (
        <main className="p-30 text-white">
            <div className="container mx auto grid grid-cols-2 gap-15">
                <div className="flex flex-col w-full">
                    <div
                        className="relative w-full"
                        style={{ aspectRatio: "3 / 2" }}
                    >
                        <Image
                            src={event.image_url}
                            alt="Banner Event"
                            fill
                            className="object-contain object-top"
                        />
                    </div>
                    

                    <div className="mt-10">{event.description}</div>
                </div>

                <div className="flex flex-col items-start justify-start gap-5">
                    <p className="text-4xl font-extrabold line-clamp-3">
                        {event.event_name}
                    </p>
                    <div className="flex flex-row font-bold justify-center  items-center gap-5">
                        <FaLocationDot />
                        {event.venue.venue_name} , {event.venue.address}
                    </div>
                    <div className="flex flex-row font-bold justify-center  items-center gap-5">
                        <MdDateRange />
                        {event.start_date === event.end_date
                            ? formatDate(event.start_date)
                            : `${formatDate(event.start_date)} - ${formatDate(
                                  event.end_date
                              )}`}
                    </div>
                    <div className="flex flex-row font-bold justify-center  items-center gap-5">
                        <GrTicket />
                        {event.price === 0 ? "FREE" : formatPrice(event.price)}
                    </div>
                    <div className="flex flex-col items-start bg-gray-500 w-full rounded-lg p-5 gap-5">
                        <div>
                            {event.available_ticket > 0 ? (
                                <span className="text-white font-semibold">
                                    Tiket available, get your ticket now!
                                </span>
                            ) : (
                                <span className="text-red-600 font-semibold">
                                    SOLD OUT
                                </span>
                            )}
                        </div>
                        {event.available_ticket > 0 && (
                            <button
                                className="btn btn-active btn-secondary"
                                onClick={() =>
                                    router.push(`/purchase-order/${eventId}`)
                                }
                            >
                                Get Ticket Now
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
