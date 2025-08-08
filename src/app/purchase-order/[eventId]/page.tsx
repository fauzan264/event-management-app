"use client";
import { formatDate } from "@/app/utils/dateFormatter";
import { IEventList } from "@/components/type";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/app/utils/priceFormatter";
import { FaMoneyBillTransfer } from "react-icons/fa6";
export default function PurchaseOrder() {
    const { eventId } = useParams();
    const [event, setEvent] = useState<IEventList | null>(null);
    const [loading, setLoading] = useState(true);

    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity((q) => q + 1);
    const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

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
                    <div className="flex flex-col items-center bg-white p-3">
                        <div>{event.event_name}</div>
                        <div>
                            {event.start_date === event.end_date
                                ? formatDate(event.start_date)
                                : `${formatDate(
                                      event.start_date
                                  )} - ${formatDate(event.end_date)}`}
                        </div>
                        <div className="border rounded-lg p-4 w-full mt-5">
                            <div className="flex items-center justify-center text-sm text-gray-500 gap-5">
                                <FaMoneyBillTransfer />
                                Ticket can not be refunded
                            </div>

                            <div className="flex items-center justify-between mt-5">
                                <div className="font-semibold">
                                    Tickets Ordered
                                </div>
                                <div className="flex ">
                                    <button
                                        onClick={decrement}
                                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded disabled:opacity-50"
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <div className="text-lg font-semibold w-8 text-center">
                                        {quantity}
                                    </div>
                                    <button
                                        onClick={increment}
                                        className="bg-blue-600 text-white px-3 py-1 rounded"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="mt-3 text-sm">
                                <div className="font-bold">
                                    {formatPrice(event.price)}
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button className="btn btn-secondary">
                                    Register
                                </button>
                            </div>
                        </div>
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
                        <div className="flex flex-col gap-5 p-5">
                            <div className="font-bold">Order Summary</div>
                            <div className="flex justify-between">
                                <div>{quantity} x Ticket</div>
                                <div>{formatPrice(event.price)}</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="font-bold">Total</div>
                                <div className="bold">{formatPrice(quantity * event.price)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
