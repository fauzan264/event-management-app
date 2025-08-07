"use client";
import EventCard from "@/components/eventCard";
import { IEventList } from "@/components/type";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
    const [eventsMusic, setEventsMusic] = useState<[] | IEventList[]>([]);
    const onGetMusicEventList = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/events?category=MUSIC&limit=3`
            );

            setEventsMusic(response?.data?.data?.events);
        } catch (error) {
            console.error(error);
        }
    };

    const [eventsSport, setEventsSport] = useState<[] | IEventList[]>([]);
    const onGetSportEventList = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/events?category=SPORT&limit=3`
            );

            setEventsSport(response?.data?.data?.events);
        } catch (error) {
            console.error(error);
        }
    };

    const [eventsEdu, setEventsEdu] = useState<[] | IEventList[]>([]);
    const onGetEduEventList = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/events?category=EDUCATION&limit=3`
            );

            setEventsEdu(response?.data?.data?.events);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        onGetMusicEventList();
        onGetSportEventList();
        onGetEduEventList();
    }, []);

    return (
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <div className="carousel w-full mt-10">
                <div
                    id="slide1"
                    className="carousel-item relative w-full h-[75vh]"
                >
                    <Image
                        src="/RunningEvent.png"
                        alt="RunningEvent"
                        fill
                        className="object-cover object-top"
                        priority
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">
                            ❮
                        </a>
                        <a href="#slide2" className="btn btn-circle">
                            ❯
                        </a>
                    </div>
                </div>

                <div
                    id="slide2"
                    className="carousel-item relative w-full h-[75vh]"
                >
                    <Image
                        src="/MusicEvent.png"
                        alt="MusicEvent"
                        fill
                        className="object-cover object-top"
                        priority
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">
                            ❮
                        </a>
                        <a href="#slide1" className="btn btn-circle">
                            ❯
                        </a>
                    </div>
                </div>
            </div>

            <div className="w-full space-y-12 my-15">
                {/* Music Events */}
                <div className=" flex-flex-col items-center mx-10">
                    <h2 className="text-xl text-white font-semibold mb-4 ">
                        🎵 Upcoming Music Events
                    </h2>
                    <div className="grid grid-cols-3 gap-10">
                        {eventsMusic?.map((item, index) => (
                            <Link href={`/events/${item.id}`} key={index}>
                                <EventCard {...item} />
                            </Link>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Link
                            href={`/events?category=MUSIC`}
                            className="btn btn-sm btn-primary mt-4"
                        >
                            Find more events
                        </Link>
                    </div>
                </div>

                {/* Sport Events */}
                <div className=" flex-flex-col items-center mx-10">
                    <h2 className="text-xl text-white font-semibold mb-4">
                        🏅 Upcoming Sport Events
                    </h2>
                    <div className="grid grid-cols-3 gap-10">
                        {eventsSport?.map((item, index) => (
                            <Link href={`/events/${item.id}`} key={index}>
                                <EventCard {...item} />
                            </Link>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Link
                            href={`/events?category=SPORT`}
                            className="btn btn-sm btn-primary mt-4"
                        >
                            Find more events
                        </Link>
                    </div>
                </div>

                {/* Education Events */}
                <div className=" flex-flex-col items-center mx-10">
                    <h2 className="text-xl text-white font-semibold mb-4">
                        🎓 Upcoming Education Events
                    </h2>
                    <div className="grid grid-cols-3 gap-10">
                        {eventsEdu?.map((item, index) => (
                            <Link href={`/events/${item.id}`} key={index}>
                                <EventCard {...item} />
                            </Link>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Link
                            href={`/events?category=EDUCATION`}
                            className="btn btn-sm btn-primary mt-4"
                        >
                            Find more events
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
