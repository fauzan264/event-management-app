import { FaLocationDot } from "react-icons/fa6";
import { IEventList } from "./type";
import Image from "next/image";
import { formatDate } from "@/utils/dateFormatter";
import { formatPrice } from "@/utils/priceFormatter";

export default function EventCard(props: IEventList) {
  const categoryColors: Record<string, string> = {
    MUSIC: " bg-blue-700 text-lime-400",
    SPORT: "bg-pink-500 text-lime-400",
    EDUCATION: "bg-purple-900 text-lime-400",
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
            <h2 className="card-title line-clamp-2">{props?.event_name}</h2>
            <p>
              {props.start_date === props.end_date
                ? formatDate(props.start_date)
                : `${formatDate(props.start_date)} - ${formatDate(
                    props.end_date
                  )}`}
            </p>

            <p className="line-clamp-2">{props.description}</p>
            <p className="flex flex-rows items-center gap-2">
              <FaLocationDot />
              {props?.venue?.venue_name}
            </p>
            <p>{props.price === 0 ? "FREE" : formatPrice(props.price)}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-secondary">Promo</div>
              <div
                className={`badge ${categoryColors[props?.category]} text-bold`}
              >
                {props?.category}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
