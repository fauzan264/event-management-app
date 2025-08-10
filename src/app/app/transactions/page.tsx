"use client";
import { formatPrice } from "@/utils/priceFormatter";
import { ITransaction } from "@/components/type";
import useAuthStore from "@/store/useAuthStore";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AuthGuard from "@/hoc/AuthGuard";

function TransactionPage() {
  const { token, id } = useAuthStore();
  const userId = id;
  const router = useRouter();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const onGetTransaction = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/purchase-order/orders/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response API:", res.data);
      setTransactions(res.data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    if (token && userId) {
      onGetTransaction();
    }
  }, [token, userId]);

  return (
    <div className="mx-auto w-11/12 my-10 p-4">
      <h1 className="text-gray-200 text-xl font-bold mb-4">Transactions</h1>
      <div className="space-y-4">
        {transactions.map((trx) => (
          <div
            key={trx.id}
            onClick={() =>
              router.push(`/purchase-order/uploadPayment/${trx.id}`)
            }
            className="flex flex-row w-full bg-white shadow rounded-lg p-4 border border-gray-200 gap-10"
          >
            <figure className="relative w-48 h-30 overflow-hidden rounded-md">
              <Image
                src={trx.imageUrl}
                alt={`${trx.eventName} image`}
                fill
                className="object-cover"
              />
            </figure>
            <div>
              <h2 className="text-lg font-semibold">{trx.eventName}</h2>
              <p className="text-sm text-gray-500">Order ID: {trx.id}</p>
              <span className="text-sm text-black">{trx.quantity} Pax</span>
              <p className="text-sm">Rp {formatPrice(trx.finalPrice)}</p>
              <p className="font-bold bg-gray-200 text-sm inline-block px-2 py-1 rounded">
                {" "}
                {trx.orderStatus}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuthGuard(TransactionPage, ["EVENT_ORGANIZER", "CUSTOMER"]);
