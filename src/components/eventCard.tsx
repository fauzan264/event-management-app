import { FaLocationDot } from "react-icons/fa6";
import { IEventList } from "./type";
import Image from "next/image";

export default function EventCard(props: IEventList) {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <>
            <div className="flex flex-cols mx-10 gap-10">
                <div className="card bg-base-100 w-70 shadow-sm">
                    <figure className="w-full h-60 block relative">
                        <Image
                            src={props?.image_url}
                            alt="Banner Event"
                            fill
                            className="object-cover"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title line-clamp-2">
                            {props?.event_name}
                            <div className="badge badge-secondary">Promo</div>
                        </h2>
                        <p>
                            {formatDate(props.start_date)} -{" "}
                            {formatDate(props.end_date)}
                        </p>

                        <p className="line-clamp-2">{props.description}</p>
                        <p className="flex flex-rows items-center gap-2">
                            <FaLocationDot />
                            {props?.venue?.venue_name}
                        </p>
                        <p>{formatPrice(props.price)}</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">
                                {props?.category}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
