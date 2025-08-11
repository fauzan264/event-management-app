"use client";
import { formatDate } from "@/utils/dateFormatter";
import { IEventList, IPromo } from "@/components/type";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/utils/priceFormatter";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { useFormik } from "formik";
import useAuthStore from "@/store/useAuthStore";

export default function PurchaseOrder() {
  const router = useRouter();
  const { token } = useAuthStore();
  const { eventId } = useParams();

  const [total, setTotal] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);

  const [event, setEvent] = useState<IEventList | null>(null);
  const [totalUserPoint, setTotalUserPoint] = useState(0);
  const [promos, setPromos] = useState<IPromo[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: "",
      email: "",
      discountId: "",
      userPointsId: "",
    },
    onSubmit: async (values) => {
      try {
        const payload = {
          fullName: values.fullName,
          email: values.email,
          quantity,
          discountId: values.discountId || null,
          userPointsId: values.userPointsId || null,
        };

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/purchase-order/${eventId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const orderId = res.data.data.id;
        alert("Order berhasil dibuat!");
        router.push(`/purchase-order/uploadPayment/${orderId}`);
      } catch (error) {
        console.error("Gagal membuat order:", error);
        alert("Terjadi kesalahan saat membuat order.");
      }
    },
  });

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  useEffect(() => {
 
  const selectedPromo = promos.find(
    (promo) => promo.id === formik.values.discountId
  );

  const promoDiscount = selectedPromo?.discountValue || 0;
  setDiscountValue(promoDiscount);

  const newTotal =
    (quantity || 0) * (event?.price || 0)- ((event?.price || 0) * (promoDiscount/100)) - totalUserPoint;
  setTotal(newTotal);
}, [formik.values.discountId, quantity, event?.price, promos, totalUserPoint]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = res.data.data;
        formik.setFieldValue("fullName", userData.full_name);
        formik.setFieldValue("email", userData.email);
        setTotalUserPoint(userData.total_user_point);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}`
        );
        setEvent(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCoupon = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/coupon/promo/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPromos(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (token && eventId) {
      Promise.all([fetchUser(), fetchEvent(), fetchCoupon()]).finally(() =>
        setLoading(false)
      );
    }
  }, [token, eventId]);

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>Event tidak ditemukan</p>;

  return (
    <main className="p-10 mt-15">
      <div className="grid grid-cols-[5fr_3fr] p-3">
        {/* Left Side */}
        <div className="flex flex-col items-center bg-white p-3">
          <div>{event.event_name}</div>
          <div>
            {event.start_date === event.end_date
              ? formatDate(event.start_date)
              : `${formatDate(event.start_date)} - ${formatDate(
                  event.end_date
                )}`}
          </div>
          <div className="border rounded-lg p-4 w-full mt-5">
            <div className="flex items-center justify-center text-sm text-gray-500 gap-5">
              <FaMoneyBillTransfer />
              Ticket can not be refunded
            </div>

            <div className="flex items-center justify-between mt-5">
              <div className="font-semibold">Tickets Ordered</div>
              <div className="flex">
                <button
                  onClick={decrement}
                  type="button"
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <div className="text-lg font-semibold w-8 text-center">
                  {quantity}
                </div>
                <button
                  onClick={increment}
                  type="button"
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-3 text-sm">
              <div className="font-bold">{formatPrice(event.price)}</div>
            </div>

            {/* Form */}
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-4 mt-4"
            >
              <div>
                <label className="block mb-1 font-semibold">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  className="border px-3 py-2 w-full rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                  readOnly
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="border px-3 py-2 w-full rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                  readOnly
                />
              </div>

              <select
                name="discountId"
                value={formik.values.discountId}
                onChange={formik.handleChange}
                className="border px-3 py-2 w-full rounded"
              >
                <option value="">Use available promo</option>
                {promos.map((promo) => (
                  <option key={promo.id} value={promo.id}>
                    {promo.description}
                  </option>
                ))}
              </select>

              <select
                name="userPointsId"
                value={formik.values.userPointsId || ""}
                onChange={formik.handleChange}
                className="border px-3 py-2 w-full rounded"
              >
                <option value="">Use your user points</option>
                <option value="user">{`(${totalUserPoint}) points`}</option>
              </select>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-red-200">
          <div
            className="relative w-full"
            style={{ aspectRatio: "2 / 1" }}
          >
            <Image
              src={event.image_url}
              alt="Banner Event"
              fill
              className="object-contain object-top"
            />
          </div>
          <div className="flex flex-col gap-5 p-5">
            <div className="font-bold">Order Summary</div>
            <div className="flex justify-between">
              <div>{quantity} x Ticket</div>
              <div>{formatPrice(event.price)}</div>
            </div>
            <div className="flex justify-between">
              <div>Promo</div>
              <div>{formatPrice(event.price * (discountValue/100) )}</div>
            </div>
            <div className="flex justify-between">
              <div>Point used</div>
              <div>- {totalUserPoint}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-bold">Total</div>
              <div className="bold">
                {formatPrice(total)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
