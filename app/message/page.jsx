"use client";
import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
import useStore from "../useStore";

function MessagePage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const paymentID = searchParams.get("paymentID");
  const { setPaymentInfo } = useStore();
  const router = useRouter();
  const hasRun = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      const handleCallBacks = async () => {
        try {
          if (status === "success") {
            const payload = { token, paymentID };

            const executePaymentResponse = await axios.put(
              `${process.env.API_URL}/api/bkash`,
              payload
            );

            if (executePaymentResponse?.data?.data?.statusCode === "0000") {
              setPaymentInfo(executePaymentResponse?.data?.data);

              console.log(executePaymentResponse);
              Swal.fire({
                title: "Payment Done!",
                icon: "success",
              }).then((result) => {
                if (result.isConfirmed) {
                  router.push("/");
                }
              });
            } else {
              Swal.fire({
                title: `${executePaymentResponse?.data?.data?.statusMessage}`,
                icon: "error",
              }).then((result) => {
                if (result.isConfirmed) {
                  router.push("/");
                }
              });
            }
          } else {
            Swal.fire({
              title: "Payment Cancelled!",
              icon: "error",
            }).then((result) => {
              if (result.isConfirmed) {
                router.push("/");
              }
            });
          }
        } catch (error) {
          Swal.fire({
            title: "An error occurred",
            text: error.response?.data?.message || error.message,
            icon: "error",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/");
            }
          });
        }
      };

      if (!hasRun.current && token) {
        hasRun.current = true;
        console.log("Executing handleCallBacks for the first time");
        handleCallBacks();
      }
    }
  }, [status, paymentID]);

  return null;
}

export default function SuspenseWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MessagePage />
    </Suspense>
  );
}
