"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Skeleton from "react-loading-skeleton";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export default function Carousel({ lower }) {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {lower ? (
        lower?.map((slider) => (
          <SwiperSlide>
            <div className="items">
              <Image
                src={slider?.url}
                quality={100}
                width={1200}
                height={400}
                alt="slide 1"
              />
            </div>
          </SwiperSlide>
        ))
      ) : (
        <Skeleton count={10} />
      )}
    </Swiper>
  );
}
