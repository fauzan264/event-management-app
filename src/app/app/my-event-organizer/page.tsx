"use client";
import { myEventOrganizer } from "@/services/user";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { IEventOrganizer } from "@/features/eventOrganizer/types";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

export default function EventOrganizerPage() {
  const { token } = useAuthStore();
  const auth = useAuthStore();
  const [eventOrganizer, setEventOrganizer] = useState<IEventOrganizer | null>(
    null
  );

  const onGetDataEventOrganizer = async () => {
    const res = await myEventOrganizer({ id: auth?.id, token });

    setEventOrganizer(camelcaseKeys(res.data.data, { deep: true }));
  };

  useEffect(() => {
    if (auth?.id) onGetDataEventOrganizer();
  }, [auth?.id]);

  return (
    <>
      <div className="mx-auto w-11/12 my-10">
        <div className="flex">
          <img
            src={eventOrganizer?.bannerUrl}
            width={250}
            height={250}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
