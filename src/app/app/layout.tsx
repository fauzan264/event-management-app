"use client";
import Sidebar from "@/components/layouts/Sidebar";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return <Sidebar>{children}</Sidebar>;
}
