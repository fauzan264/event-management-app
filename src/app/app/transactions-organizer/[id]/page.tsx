"use client";
import { detailEventTransactions } from "@/services/event";
import camelcaseKeys from "camelcase-keys";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AuthGuard from "@/hoc/AuthGuard";
import useAuthStore from "@/store/useAuthStore";
import { IPurchaseOrder } from "@/components/type";
import Link from "next/link";

function EventDetailPage() {
  const { token } = useAuthStore();
  const { id } = useParams<{ id: string }>();
  const [transactions, setTransactions] = useState<IPurchaseOrder[] | []>([]);

  const getEventTransaction = async ({
    eventId,
    token,
  }: {
    eventId: string;
    token: string;
  }) => {
    const res = await detailEventTransactions({ eventId, token });
    const responseData = camelcaseKeys(res.data.data, { deep: true }).map(
      (res: IPurchaseOrder & { id: string }) => {
        return {
          ...res,
          orderId: res.id,
        };
      }
    );
    setTransactions(responseData);
  };

  useEffect(() => {
    if (token) {
      getEventTransaction({ eventId: id, token });
    }
  }, [id, token]);

  return (
    <div className="mx-auto w-11/12 my-10">
      <h1 className="text-2xl text-gray-200">Detail Event</h1>
      <div className="card bg-gray-800 my-5">
        <div className="card-body">
          <h1 className="text-xl text-gray-200">List of Transaction</h1>
          <table className="table border-border-gray-100">
            <thead>
              <tr>
                <th className="text-gray-200">Full Name</th>
                <th className="text-gray-200">Email</th>
                <th className="text-gray-200">#</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction, i) => {
                return (
                  <tr key={i}>
                    <td className="text-gray-200">
                      <Link
                        href={`/app/events/detail/user/${transaction.userId}`}
                        className="link link-success"
                      >
                        {transaction.fullName}
                      </Link>
                    </td>
                    <td className="text-gray-200">{transaction.email}</td>
                    <td>
                      <Link
                        href={`/app/transactions-organizer/transaction-confirmation/${transaction.orderId}`}
                        className="btn btn-success btn-sm text-gray-200 hover:shadow-md mx-2 my-2"
                      >
                        Detail Transaction
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AuthGuard(EventDetailPage, ["EVENT_ORGANIZER"]);
