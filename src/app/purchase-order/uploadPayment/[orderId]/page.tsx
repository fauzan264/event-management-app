"use client";
import { formatPrice } from "@/app/utils/priceFormatter";
import { formatTime } from "@/app/utils/timeFormatter";
import { IPurchaseOrder } from "@/components/type";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import { PiSealCheckFill } from "react-icons/pi";
import { MdCancel } from "react-icons/md";

export default function UploadPayment() {
    const { token } = useAuthStore();

    const params = useParams();
    const orderId = params.orderId as string;

    const [paymentProof, setPaymentProof] = useState<File | null>(null);
    const [secondsLeft, setSecondsLeft] = useState(2 * 60 * 60);
    const [orders, setOrder] = useState<IPurchaseOrder | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const OnGetOrderDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/purchase-order/${orderId}`
                );
                setOrder(res.data.data);
            } catch (err) {
                console.error("Failed to fetch order details:", err);

                if (axios.isAxiosError(err)) {
                    setError(err.message);
                } else {
                    setError("Gagal mengambil detail pesanan.");
                }
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            OnGetOrderDetails();
        }
    }, [orderId]);

    // Handle paymentProof
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setPaymentProof(e.target.files[0]);
        }
    };

    const OnhandleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!paymentProof) {
            alert("Please select a file first.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("paymentProof", paymentProof);

            await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/purchase-order/uploadPayment/${orderId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Upload berhasil!");
        } catch (err) {
            alert("Upload gagal.");
            console.error(err);
        }
    };

    useEffect(() => {
        if (!orders?.createdAt) return;

        const createdAtTime = new Date(orders.createdAt).getTime();
        const expireTime = createdAtTime + 2 * 60 * 60 * 1000; // 2 jam dalam ms

        const updateSecondsLeft = () => {
            const now = Date.now();
            const diff = Math.floor((expireTime - now) / 1000);
            setSecondsLeft(diff > 0 ? diff : 0);
        };

        updateSecondsLeft();

        const interval = setInterval(() => {
            updateSecondsLeft();
        }, 1000);

        return () => clearInterval(interval);
    }, [orders]);

    if (loading) {
        return <div>Memuat detail pesanan...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    if (!orders) {
        return <div>Data pesanan tidak ditemukan.</div>;
    }

    // For order status : "Waiting for admin confirmation"
    if (orders.orderStatus === "Waiting for Admin Confirmation") {
        return (
            <div className="flex flex-col items-center justify-center  h-screen p-10">
                <div className="flex flex-col items-center justify-center w-100 gap-10">
                    <h2 className="text-center text-white font-bold text-xl">
                        Congratulation ! We have receive your payment
                    </h2>
                    <span>
                        <PiSealCheckFill size={100} className="text-green-500" />
                    </span>
                    <p className="text-white">
                        Please await further confirmation sent to your email.
                    </p>
                </div>
            </div>
        );
        
    }

    // For order status : "rejected"
    if (orders.orderStatus === "Rejected") {
        return (
            <div className="flex flex-col items-center justify-center  h-screen p-10">
                <div className="flex flex-col items-center justify-center w-100 gap-10">
                    <h2 className="text-center text-white font-bold text-xl">
                        We are sorry for rejecting your order !
                    </h2>
                    <span>
                        <MdCancel size={100} className="text-green-500" />
                    </span>
                    <p className="text-white">
                        Your payment proof is invalid. We have not received any payment.
                    </p>
                </div>
            </div>
        );
        
    }

    // For order status : "Cancel"
    if (orders.orderStatus === "Cancel") {
        return (
            <div className="flex flex-col items-center justify-center  h-screen p-10">
                <div className="flex flex-col items-center justify-center w-100 gap-10">
                    <h2 className="text-center text-white font-bold text-xl">
                        We are sorry! Your order has been canceled by our system
                    </h2>
                    <span>
                        <MdCancel size={100} className="text-green-500" />
                    </span>
                    <p className="text-white">
                        There is no confirmation from the Event Organizer due to your order. Contact the promotor for refund
                    </p>
                </div>
            </div>
        );
        
    }

    if (orders.orderStatus === "Done") {
        return (
            <div className="flex flex-col items-center justify-center  h-screen p-10">
                <div className="flex flex-col items-center justify-center w-100 gap-10">
                    <h2 className="text-center text-white font-bold text-xl">
                       Congratulation! You are registered. 
                    </h2>
                    <span>
                        <PiSealCheckFill size={100} className="text-green-500" />
                    </span>
                    <p className="text-white">
                        Your payment has been validated by the admin. Dont miss your event schedule!
                    </p>
                </div>
            </div>
        );
        
    }

    return (
        <>
            <main className="p-10 mt-15">
                <div className="grid grid-cols-[5fr_3fr] p-3">
                    <div className="flex flex-col bg-white p-25">
                        <h1 className="text-xl font-bold">Payment</h1>
                        <div>Order Id: {orders.orderId}</div>
                        <div>
                            Order Status :{" "}
                            <span className="bg-gray-200 rounded-md font-bold text-red-600 p-1">
                                {orders.orderStatus}
                            </span>
                        </div>
                        <div className="flex justify-between w-full mt-10">
                            <div>Amount:</div>
                            <div>{formatPrice(orders.price)}</div>
                        </div>
                        <div className="flex justify-between w-full mt-10">
                            <div>Discount:</div>
                            <div>{orders.discountValue}% OFF </div>
                        </div>
                        <div className="flex justify-between w-full mt-10">
                            <div>Points Used:</div>
                            <div>{orders.userPointsUsed}</div>
                        </div>
                        <hr className="border-t-2 border-gray-300 my-4 w-full" />
                        <div className="flex justify-between w-full">
                            <div>Amount to pay :</div>
                            <div>{formatPrice(orders.finalPrice)}</div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full mt-10">
                            {secondsLeft > 0 && (
                                <div className="font-bold">
                                    Finish Your Payment Before
                                </div>
                            )}
                            {secondsLeft > 0 ? (
                                <div>{formatTime(secondsLeft)}</div>
                            ) : (
                                <div className="text-red-600 font-bold">
                                    Payment time has expired
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-red-200">
                        <div className="flex flex-col p-25">
                            <p className="mb-3">
                                Please complete your payment by transferring the
                                total amount to the bank account below:
                            </p>
                            <div className="mb-2">
                                <strong>Bank Name:</strong>{" "}
                                <span>Bank XYZ</span>
                            </div>
                            <div className="mb-2">
                                <strong>Account Number:</strong>{" "}
                                <span>1234567890</span>
                            </div>
                            <div className="mb-6">
                                <strong>Account Holder:</strong>{" "}
                                <span>Event Organizer Inc.</span>
                            </div>
                            <p className="italic mb-3">
                                After completing the transfer, please upload
                                your payment proof in the next step to confirm
                                your order.
                            </p>
                            {/* Form upload payment proof */}
                            <form onSubmit={OnhandleSubmit} className="mt-6">
                                <input
                                    type="file"
                                    className="file-input file-input-secondary"
                                    onChange={handleFileChange}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-3"
                                >
                                    Finish Your Payment
                                </button>
                            </form>
                            {orders.orderStatus ===
                                "Waiting for Admin Confirmation" && (
                                <div className="text-center p-5 bg-green-100 rounded">
                                    <p className="font-bold text-green-700">
                                        Bukti pembayaran Anda telah diterima.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
