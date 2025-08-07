import { IAuth } from "@/features/auth/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUseAuthStoreState extends Pick<IAuth, "fullname" | "userRole"> {
  token: string;
}

interface IUseAuthStore extends IUseAuthStoreState {
  setAuth: ({ token, fullname, userRole }: IUseAuthStoreState) => void;
  logout: () => void;
}

const useAuthStore = create<IUseAuthStore>()(
  persist(
    (set) => ({
      token: "",
      fullname: "",
      userRole: "",
      setAuth: ({ token, fullname, userRole }) =>
        set({ token: token, fullname: fullname, userRole: userRole }),
      logout: () => {
        set({ token: "", fullname: "", userRole: "" });
        localStorage.removeItem("authToken");
      },
    }),
    {
      name: "authToken",
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export default useAuthStore;
