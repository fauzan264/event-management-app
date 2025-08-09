import { IAuth } from "@/features/auth/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUseAuthStoreState
  extends Pick<IAuth, "id" | "fullName" | "userRole"> {
  token: string;
}

interface IUseAuthStore extends IUseAuthStoreState {
  setAuth: ({ token, id, fullName, userRole }: IUseAuthStoreState) => void;
  logout: () => void;
}

const useAuthStore = create<IUseAuthStore>()(
  persist(
    (set) => ({
      token: "",
      id: "",
      fullName: "",
      userRole: "",
      setAuth: ({ token, id, fullName, userRole }) =>
        set({ token, id, fullName, userRole }),
      logout: () => {
        set({ token: "", id: "", fullName: "", userRole: "" });
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
