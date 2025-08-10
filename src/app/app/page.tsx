"use client";
import AuthGuard from "@/hoc/AuthGuard";
import useAuthStore from "@/store/useAuthStore";
import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { IEventOrganizer } from "@/features/eventOrganizer/types";
import { myEventOrganizer } from "@/services/user";
import camelcaseKeys from "camelcase-keys";
import { dashboard } from "@/services/dashboard";
import { IEvent } from "@/features/event/types";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

function AppPage() {
  const { token } = useAuthStore();
  const auth = useAuthStore();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const getDashboard = async ({
    eventOrganizerId,
    token,
  }: Pick<IEvent, "eventOrganizerId"> & {
    token: string;
  }) => {
    try {
      const res = await dashboard({ eventOrganizerId, token });

      setDashboardData(camelcaseKeys(res.data.data, { deep: true }));
      setLoading(false);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || "Something went wrong!";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  };

  useEffect(() => {
    if (eventOrganizer?.id) {
      getDashboard({ eventOrganizerId: eventOrganizer?.id, token });
    }
  }, [eventOrganizer?.id]);

  if (loading) return <div className="text-center my-10">Loading...</div>;
  if (!dashboardData) return null;

  const {
    totalEvents = 0,
    totalTicketsSold = 0,
    totalRevenue = 0,
    monthlyTicketSales = {},
    annualRevenue = {},
  } = dashboardData;

  const monthlyData = {
    labels: Object.keys(monthlyTicketSales),
    datasets: [
      {
        label: "Tiket Terjual",
        data: Object.values(monthlyTicketSales),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const revenueChartData = {
    labels: Object.keys(annualRevenue),
    datasets: [
      {
        label: "Pendapatan (Rupiah)",
        data: Object.values(annualRevenue),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div className="mx-auto w-11/12 my-10">
      <h1 className="text-3xl font-bold text-gray-200 mb-6">
        Dashboard Event Organizer
      </h1>

      {/* Basic Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Total Events</p>
          <p className="text-3xl font-bold text-gray-900">{totalEvents}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Total Ticket Sold</p>
          <p className="text-3xl font-bold text-gray-900">
            {totalTicketsSold.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900">
            Rp {totalRevenue.toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* Visualisasi Statistik */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Ticket sales per month</h2>
          <Line data={monthlyData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Annual revenue</h2>
          <Bar data={revenueChartData} />
        </div>
      </div>
    </div>
  );
}

export default AuthGuard(AppPage, ["EVENT_ORGANIZER"]);
