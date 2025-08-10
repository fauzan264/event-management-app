import { IEvent } from "@/features/event/types";
import useAuthStore from "@/store/useAuthStore";
import { useState } from "react";

export default function CreatePromo() {
    const { id:eventOrganizerId, token } = useAuthStore();
    const [events, setEvents] = useState<IEvent[]>([]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
            <fieldset className="fieldset bg-purple-900 border-base-300 rounded-box w-full max-w-xs border p-6">
                <legend className="fieldset-legend bg-pink-600 rounded-md text-white p-3 text-center font-semibold">
                    Promo
                </legend>

                {/* Discount Value */}
                <label className="label text-white mt-4">
                    Discount Value (%)
                </label>
                <input
                    type="number"
                    className="input"
                    placeholder="Discount Value"
                    min={0}
                    max={100}
                    name="discountValue"
                />

                {/* Provider (readonly) */}
                <label className="label text-white mt-4">Provider</label>
                <input
                    type="text"
                    className="input bg-gray-400 cursor-not-allowed"
                    placeholder="Provider"
                    defaultValue="EVENT_ORGANIZER"
                    readOnly
                    name="provider_type"
                />

                {/* Provider ID */}
                <label className="label text-white mt-4">Provider ID</label>
                <input
                    type="text"
                    className="input"
                    placeholder="Provider ID (UUID)"
                    name="providerId"
                />

                {/* Description */}
                <label className="label text-white mt-4">Description</label>
                <input
                    type="text"
                    className="input"
                    placeholder="Description"
                    name="description"
                />

                {/* Available Coupon */}
                <label className="label text-white mt-4">
                    Available Coupon
                </label>
                <input
                    type="number"
                    className="input"
                    placeholder="Available Coupon"
                    min={0}
                    name="availableCoupon"
                />

                {/* Event ID */}
                <label className="label text-white mt-4">Event ID</label>
                <input
                    type="text"
                    className="input"
                    placeholder="Event ID (UUID)"
                    name="eventId"
                />

                {/* Start Date */}
                <label className="label text-white mt-4">Start Date</label>
                <input
                    type="datetime-local"
                    className="input"
                    name="startDate"
                />

                {/* End Date */}
                <label className="label text-white mt-4">End Date</label>
                <input type="datetime-local" className="input" name="endDate" />

                <button className="btn btn-neutral mt-6 bg-pink-600 w-full text-white hover:bg-pink-700 transition">
                    Create Promo
                </button>
            </fieldset>
        </div>
    );
}
