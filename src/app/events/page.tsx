"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import axios from "axios";
import Link from "next/link";
import EventCard from "@/components/eventCard";
import { IEventList } from "@/components/type";

export default function EventsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const initialCategory = searchParams.get("category") || "";
    const initialSearch = searchParams.get("event_name") || "";

    const [events, setEvents] = useState<IEventList[]>([]);
    const [categoryInput, setCategoryInput] = useState(initialCategory);
    const [searchInput, setSearchInput] = useState(initialSearch);

    // Fetch data saat category atau search berubah
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                let url = `${process.env.NEXT_PUBLIC_API_URL}/api/events`;
                const params = new URLSearchParams();
                if (categoryInput) params.append("category", categoryInput);
                if (searchInput) params.append("event_name", searchInput);
                if (params.toString()) url += `?${params.toString()}`;

                const res = await axios.get(url);
                setEvents(res.data.data.events);
            } catch (err) {
                console.error("Failed to fetch events:", err);
            }
        };

        fetchEvents();
    }, [categoryInput, searchInput]);

    // Handler ganti kategori
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value;
        setCategoryInput(newCategory);

        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("category", newCategory);
        if (searchInput) newParams.set("event_name", searchInput);
        router.push(`${pathname}?${newParams.toString()}`);
    };

    // Debounced handler untuk search
    const debouncedSearch = useMemo(
        () =>
            debounce((value: string) => {
                setSearchInput(value);

                const newParams = new URLSearchParams(searchParams.toString());
                if (categoryInput) newParams.set("category", categoryInput);
                newParams.set("event_name", value);
                router.push(`${pathname}?${newParams.toString()}`);
            }, 500),
        [searchParams, pathname, categoryInput]
    );

    // Cleanup debounce saat komponen unmount
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    // Handler input search
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchInput(value);
        debouncedSearch(value);
    };

    return (
        <main className="p-10 mt-15">
            <h1 className="text-2xl text-white font-bold mb-6">
                Explore Events {categoryInput && `- ${categoryInput}`}
            </h1>

            {/* Filter & Search */}
            <div className="flex items-center gap-4 mb-8">
                <select
                    value={categoryInput}
                    onChange={handleCategoryChange}
                    className="select select-bordered"
                >
                    <option value="">All Categories</option>
                    <option value="MUSIC">Music</option>
                    <option value="SPORT">Sport</option>
                    <option value="EDUCATION">Education</option>
                </select>

                <input
                    type="text"
                    placeholder="Search events..."
                    value={searchInput}
                    onChange={handleSearchChange}
                    className="input input-bordered w-full max-w-xs"
                />
            </div>

            {/* Event List */}
            {events.length > 0 ? (
                <div className="grid grid-cols-3 gap-10">
                    {events.map((event) => (
                        <Link href={`/events/${event.id}`} key={event.id}>
                            <EventCard {...event} />
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-gray-300 text-lg mt-10">No Event Found</p>
            )}
        </main>
    );
}
