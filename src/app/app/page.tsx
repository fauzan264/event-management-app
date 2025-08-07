"use client";
import useAuthStore from "@/store/useAuthStore";

export default function AppPage() {
  const auth = useAuthStore();
  return (
    <>
      <div className="mx-auto w-11/12 my-10">
        <h1 className="text-2xl text-gray-200"> Hello, {auth?.fullname}</h1>
      </div>
    </>
  );
}
