import { IAuth } from "@/features/auth/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUseAuthStoreState
  extends Pick<IAuth, "id" | "fullname" | "userRole"> {
  token: string;
}

interface IUseAuthStore extends IUseAuthStoreState {
  setAuth: ({ token, id, fullname, userRole }: IUseAuthStoreState) => void;
  logout: () => void;
}

const useAuthStore = create<IUseAuthStore>()(
  persist(
    (set) => ({
      token: "",
      id: "",
      fullname: "",
      userRole: "",
      setAuth: ({ token, id, fullname, userRole }) =>
        set({ token, id, fullname, userRole }),
      logout: () => {
        set({ token: "", id: "", fullname: "", userRole: "" });
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
