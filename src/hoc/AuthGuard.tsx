"use client";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect, useState } from "react";

function AuthGuard<P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: string[]
) {
  const WithAuthGuardComponent = (props: P) => {
    const { userRole } = useAuthStore();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timeout = setTimeout(() => {
        if (userRole && !allowedRoles.includes(userRole)) {
          router?.replace("/");
        } else {
          setLoading(false);
        }
      }, 2000);

      return () => clearTimeout(timeout);
    }, [userRole, allowedRoles]);

    if (loading) return <h1>Loading...</h1>;

    return <WrappedComponent {...props} />;
  };
  return WithAuthGuardComponent;
}

export default AuthGuard;
