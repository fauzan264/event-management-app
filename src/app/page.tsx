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

            <div className="grid grid-cols-3 gap-10 my-10">
                {eventsMusic?.map((item, index) => {
                    return (
                        <Link href={`/events/${item.id}`} key={index}>
                            <EventCard
                                id={item.id}
                                event_name={item.event_name}
                                image_url={item.image_url}
                                description={item.description}
                                start_date={item.start_date}
                                end_date={item.end_date}
                                venue={item.venue}
                                price={item.price}
                                category={item.category}
                            />
                        </Link>
                    );
                })}
                {eventsSport?.map((item, index) => {
                    return (
                        <Link href={`/events/${item.id}`} key={index}>
                            <EventCard
                                id={item.id}
                                event_name={item.event_name}
                                image_url={item.image_url}
                                description={item.description}
                                start_date={item.start_date}
                                end_date={item.end_date}
                                venue={item.venue}
                                price={item.price}
                                category={item.category}
                            />
                        </Link>
                    );
                })}
                {eventsEdu?.map((item, index) => {
                    return (
                        <Link href={`/events/${item.id}`} key={index}>
                            <EventCard
                                id={item.id}
                                event_name={item.event_name}
                                image_url={item.image_url}
                                description={item.description}
                                start_date={item.start_date}
                                end_date={item.end_date}
                                venue={item.venue}
                                price={item.price}
                                category={item.category}
                            />
                        </Link>
                    );
                })}
            </div>
        </main>
    );
}
