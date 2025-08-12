"use client";
import useAuthStore from "@/store/useAuthStore";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import AuthGuard from "@/hoc/AuthGuard";
import { IPurchaseOrder } from "@/components/type";
import { confirmTransaction, detailTransaction } from "@/services/transaction";
import camelcaseKeys from "camelcase-keys";

function EditEventPage() {
  const router = useRouter();
  const { token } = useAuthStore();
  const { id } = useParams<{ id: string }>();
  const [transactions, setTransactions] = useState<IPurchaseOrder | null>(null);

  const getDetailEventTransaction = async ({
    orderId,
    token,
  }: {
    orderId: string;
    token: string;
  }) => {
    const res = await detailTransaction({ orderId, token });
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

  const onConfirmTransaction = async ({
    id,
    orderStatus,
    token,
  }: Pick<IPurchaseOrder, "orderStatus"> & { id: string; token: string }) => {
    if (!id) return;

    Swal.fire({
      title: `Are you sure you want to edit this event?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, edit it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await confirmTransaction({
            id,
            orderStatus,
            token,
          });

          Swal.fire(res.data.message, "", "success");

          router.push("/app/");
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            const message =
              error.response?.data.message || "Something went wrong!";
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
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      orderStatus: "",
    },
    // validationSchema: updateEventSchema,
    onSubmit: ({ orderStatus }) => {
      onConfirmTransaction({
        id,
        orderStatus,
        token,
      });
    },
  });

  useEffect(() => {
    if (token) {
      getDetailEventTransaction({ orderId: id, token });
      if (transactions) {
        formik.setValues({
          orderStatus: transactions.orderStatus || "",
        });
      }
    }
  }, [token, transactions]);

  return (
    <div className="mx-auto w-11/12 my-10">
      <h1 className="text-2xl text-gray-200">Create Event</h1>
      <div className="card bg-gray-800 my-5">
        <div className="card-body">
          <p className="text-white">{transactions?.email}</p>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap -mx-1">
              <div className="w-full">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-200">
                    Order Status
                  </legend>
                  <select
                    name="orderStatus"
                    id="orderStatus"
                    className="select select-accent w-full"
                    onChange={formik.handleChange}
                    value={formik.values.orderStatus}
                  >
                    <option value="REJECTED">Rejected</option>
                    <option value="DONE">Done</option>
                  </select>
                  {formik.errors.orderStatus && formik.touched.orderStatus && (
                    <div className="feedback text-red-600">
                      {formik.errors.orderStatus}
                    </div>
                  )}
                </fieldset>
              </div>

              <button
                type="submit"
                className="btn border-0 bg-pink-500 hover:bg-pink-600 active:bg-pink-600 transition ease-in-out duration-300 text-gray-200 w-full mt-5 focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthGuard(EditEventPage, ["EVENT_ORGANIZER"]);
