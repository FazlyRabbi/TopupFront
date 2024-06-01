"use client";
import React, { useEffect } from "react";
import Table from "./Components/CommonTable/Table";
import TableForRecent from "./Components/CommonTable/TableForRecent";
import { SoldOfferList } from "./Components/TableData/Data";
import OfferSection from "./Components/OfferSection/OfferSection";
import Carousel from "./Components/Slider/Slide";

export const metaData = {
  title: "Best Topup offers",
  descripton: "Your Best Topup service is here...",
};

export default function page() {
  const heading = [
    "প্যাকেজসমূহ",
    "স্টাটাস",
    "ক্রয় হয়েছে",
    "রেগুলার দাম",
    "মোবাইল নাম্বার",
  ];



  return (
    <div className="Homepage page">
      <section className="banner-section">
        <h2>ঈদুল ফিতরের শুভেচ্ছা </h2>
      </section>

      <section className="offer-section">
        <OfferSection />
      </section>

      <section className="">
        <div className="slider-area">
          <Carousel />
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
