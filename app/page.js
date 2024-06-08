"use client";
import React, { useEffect, useState } from "react";
import Table from "./Components/CommonTable/Table";
import TableForRecent from "./Components/CommonTable/TableForRecent";
import { SoldOfferList } from "./Components/TableData/Data";
import OfferSection from "./Components/OfferSection/OfferSection";
import Carousel from "./Components/Slider/Slide";
import useStore from "./useStore";
import { useSession } from "next-auth/react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";

export const metaData = {
  title: "Best Topup offers",
  descripton: "Your Best Topup service is here...",
};

export default function page() {
  const { userInfo, fetchUserInfo, paymentInfo, setPaymentInfo } = useStore();
  const { data: session } = useSession();
  const [call, setCall] = useState(0);

  const [hero, setHero] = useState(null);
  const [lower, setLower] = useState(null);

  useEffect(() => {
    if (session) {
      fetchUserInfo(session?.user.data.phone);
    }
  }, [session]);

  useEffect(() => {
    if (call > 0) {
      setPaymentInfo(null);
      return;
    }
    if (userInfo && paymentInfo) {
      setCall((prev) => prev + 1);
      const updateUserToken = async () => {
        const {
          paymentID,
          payerReference,
          customerMsisdn,
          trxID,
          amount,
          statusMessage,
          paymentExecuteTime,
          merchantInvoiceNumber,
        } = paymentInfo;

        const totalToken = Number(userInfo?.token) + Number(amount);
        const updateUserToken = await axios.put(
          `${process.env.API_URL}/api/user`,
          {
            payload: {
              phone: userInfo?.phone,
              token: totalToken.toString(),
            },
          }
        );

        if (updateUserToken) {
          const storePaymentInfo = await axios.post(
            `${process.env.API_URL}/api/payment`,
            {
              user: userInfo?.id?.toString(),
              paymentID,
              payerReference,
              customerMsisdn,
              trxID,
              amount,
              statusMessage,
              paymentExecuteTime,
              merchantInvoiceNumber,
            }
          );
          if (storePaymentInfo) {
            fetchUserInfo(userInfo.phone);
            setPaymentInfo(null);
            console.log(storePaymentInfo);
          }
        }
      };
      updateUserToken();
    }
  }, [paymentInfo, userInfo]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.patch(
        `${process.env.API_URL}/api/cloudinary`,
        {
          type: "hero",
        }
      );
      const res = await axios.patch(
        `${process.env.API_URL}/api/cloudinary`,
        {}
      );

      setLower(res?.data?.data);
      setHero(response?.data?.data[0]?.url);
    };
    fetch();
  }, []);

  const heading = [
    "প্যাকেজসমূহ",
    "স্টাটাস",
    "ক্রয় হয়েছে",
    "রেগুলার দাম",
    "মোবাইল নাম্বার",
  ];

  return (
    <div className="Homepage page">
      <section className=" flex  items-center justify-center">
        {hero ? (
          <Image
            src={hero}
            height={200}
            width={500}
            className=" rounded-md   h-[30rem]  w-[70rem]"
          />
        ) : (
          <Skeleton count={10} />
        )}
      </section>

      <section className="offer-section">
        <OfferSection />
      </section>

      <section className="">
        <div className="slider-area">
          <Carousel lower={lower} />
        </div>
      </section>

      <section>
        <div className="recenter-offer-selling-list">
          <div className="selling-table">
            <h3>সাম্প্রতিক বিক্রি</h3>
            <TableForRecent thead={heading} />
          </div>
        </div>
      </section>
    </div>
  );
}
