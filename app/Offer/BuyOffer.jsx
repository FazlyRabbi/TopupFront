"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import useStore from "../useStore";

const init = { offer: "", phone: "", division: "", price: "" };

import { useSession } from "next-auth/react";

export default function BuyOffer({ todayPrice, pack, token }) {
  const { data: session } = useSession();
  const { userInfo, fetchUserInfo } = useStore();
  const route = useRouter();
  const [offers, setOffers] = useState(init);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setOffers({ ...offers, offer: pack, price: todayPrice });
    fetchUserInfo(session?.user.data.phone);
  }, [pack, todayPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const actualToken = Number(userInfo?.token) - Number(todayPrice);

    try {
      if (Number(userInfo?.token) < Number(todayPrice)) {
        route.push("/Dashboard");

        setTimeout(() => {
          Swal.fire({
            text: `আপনার পর্যাপ্ত পরিমান ব্যালেন্স নেই! দয়া করে রিচার্জ করুন।`,
            icon: "error",
          });
        }, 2000); // Delay in milliseconds

        return;
      }

      const response = await axios.post(
        `${process.env.API_URL}/api/order`,
        offers
      );

      const resToken = await axios.put(`${process.env.API_URL}/api/user`, {
        payload: {
          phone: session?.user?.data?.phone,
          token: actualToken.toString(),
        },
      });

      console.log({
        phone: session?.user?.data?.phone,
        token: actualToken.toString(),
      });
      // fetchUserInfo(phone);

      if (response) {
        setOffers(init);
        Swal.fire({
          text: `${response.data.message}`,
          icon: "success",
        });
        setIsLoading(false);
      }

      setIsLoading(false);
      route.push("/");

      // Return the response data
      return response.data;
    } catch (error) {
      Swal.fire({
        text: "Internal Server Error!",
        icon: "error",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="order-placement-page">
      <div className="order-confirmation">
        <div></div>
        <div className="offer-title">
          <span className="py-3">
            <h3>অফার কিনুন </h3>
          </span>
          <hr />
          <br />
          <div>
            <h3>
              Offer Name: <span>{pack}</span>
            </h3>
            <h4>
              Price: <span style={{ color: "purple" }}>{todayPrice}Tk</span>
            </h4>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <h4>Type your number To receive the Offer</h4>
          <br />
          <span>
            <label>১১ ডিজিটের নাম্বার</label>
            <input
              disabled={isLoading}
              value={offers.phone}
              onChange={(e) => setOffers({ ...offers, phone: e.target.value })}
              type="number"
              id="numb"
              placeholder="Type the Number"
              required
            />
            <br />
          </span>
          <br />
          <span>
            <label htmlFor="div"> নাম্বারটি কোন বিভাগের ? </label>
            <input
              disabled={isLoading}
              value={offers.division}
              onChange={(e) =>
                setOffers({ ...offers, division: e.target.value })
              }
              type="text"
              id="div"
              placeholder="Type your Divition"
              required
            />
            <br />
          </span>
          <input disabled={isLoading} type="submit" value="Confirm Order" />
        </form>
      </div>
    </div>
  );
}
