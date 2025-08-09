"use client";
import { myProfile } from "@/services/user";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import camelcaseKeys from "camelcase-keys";
import Image from "next/image";
import { formattingDateTime } from "../../../../utils/formattingDate";
import Link from "next/link";
import { IAuth } from "@/features/auth/types";

export default function UserProfilePage() {
  const { token } = useAuthStore();
  const [profile, setProfile] = useState<IAuth | null>(null);

  const onGetProfile = async () => {
    const res = await myProfile({ token });

    setProfile(camelcaseKeys(res.data.data));
  };

  useEffect(() => {
    if (token) onGetProfile();
  }, [token]);

  return (
    <>
      <div className="mx-auto w-11/12 my-10">
        <div className="flex">
          <h1 className="text-2xl text-gray-200">My Profile</h1>
          <Link
            href={`/app/event-organizer/edit/${profile?.id}`}
            className="btn btn-sm bg-blue-700 ml-auto text-gray-200 hover:bg-blue-800 active:bg-blue-800 transition ease-in-out duration-300 focus:outline-none focus:ring-0 border-0"
          >
            Edit
          </Link>
        </div>
        <div className="card bg-gray-800 my-5">
          <div className="card-body">
            <div className="flex justify-between items-start p-6 flex-col md:flex-row-reverse">
              <div className="w-60 h-60 bg-slate-700 flex items-center justify-center text-gray-400 rounded my-5">
                {/* {profile?.bannerUrl && (
                  <figure className="w-60 h-60 block relative">
                    <Image
                      src={eventOrganizer?.bannerUrl}
                      alt={`${eventOrganizer?.companyName} image`}
                      fill
                      className="object-cover"
                    />
                  </figure>
                )} */}
              </div>
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row">
                  <p className="text-gray-300 w-40 flex-grow-0">
                    ID Card Number
                  </p>
                  <p className="font-semibold text-gray-200 flex-grow-0">
                    {profile?.idCardNumber}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row">
                  <p className="text-gray-300 w-40 flex-grow-0">Full Name</p>
                  <p className="font-semibold text-gray-200 flex-grow-0">
                    {profile?.fullName}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row">
                  <p className="text-gray-300 w-40 flex-grow-0">Email</p>
                  <p className="font-semibold text-gray-200 flex-grow-0">
                    {profile?.email}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row">
                  <p className="text-gray-300 w-40 flex-grow-0">
                    Date Of Birth
                  </p>
                  <p className="font-semibold text-gray-200 flex-grow-0">
                    {profile?.dateOfBirth}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row">
                  <p className="text-gray-300 w-40 flex-grow-0">Phone Number</p>
                  <p className="font-semibold text-gray-200 flex-grow-0">
                    {profile?.phoneNumber}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row">
                  <p className="text-gray-300 w-40 flex-grow-0">
                    Referral Code
                  </p>
                  <p className="font-semibold text-gray-200 flex-grow-0">
                    {profile?.referralCode}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row">
                  <p className="text-gray-300 w-40 flex-grow-0">
                    Total User Point
                  </p>
                  <p className="font-semibold text-gray-200 flex-grow-0">
                    {profile?.totalUserPoint}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row">
                  <p className="text-gray-300 w-40 flex-grow-0">User Role</p>
                  <p className="font-semibold text-gray-200 flex-grow-0">
                    {profile?.userRole.split("_").join(" ").toUpperCase()}
                  </p>
                </div>
                {/* <div className="flex flex-col md:flex-row">
                  <p className="text-gray-300 w-40 flex-grow-0">Created At</p>
                  <p className="font-semibold text-gray-200 flex-grow-0">
                    {eventOrganizer?.createdAt
                      ? formattingDateTime({
                          date: new Date(
                            eventOrganizer?.createdAt
                          ).toISOString(),
                        })
                      : ""}
                  </p>
                </div> */}
                {/* <div className="flex flex-col md:flex-row">
                  <p className="text-gray-300 w-40 flex-grow-0">Updated At</p>
                  <p className="font-semibold text-gray-200 flex-grow-0">
                    {profile?.updatedAt
                      ? formattingDateTime({
                          date: new Date(profile?.updatedAt).toISOString(),
                        })
                      : ""}
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
