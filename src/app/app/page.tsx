"use client";
import AuthGuard from "@/hoc/AuthGuard";
import useAuthStore from "@/store/useAuthStore";

function AppPage() {
  const auth = useAuthStore();

  return (
    <>
      <div className="mx-auto w-11/12 my-10">
        <h1 className="text-2xl text-gray-200"> Hello, {auth?.fullName}</h1>
      </div>
    </>
  );
}

export default AuthGuard(AppPage, ["EVENT_ORGANIZER"]);
