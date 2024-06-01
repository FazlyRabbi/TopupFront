import React from "react";
import { redirect } from "next/navigation";
import BuyOffer from "../BuyOffer";
import Swal from "sweetalert2";
// importing necessary functions
export default async function page({ searchParams }) {
  const { pack, todayPrice } = searchParams;

  // console.log(userInfo);

  return (
    <>
      <BuyOffer
        todayPrice={todayPrice}
        pack={pack}
        // token={userInfo?.token}
        // phone={userInfo?.phone}
      />
    </>
  );
}
