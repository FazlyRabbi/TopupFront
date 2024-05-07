"use client"




import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


import Image from 'next/image';
import slide1 from '@/app/Assist/Images/Carousel/slide (1).jpg'
import slide2 from '@/app/Assist/Images/Carousel/slide (2).jpg'
import slide3 from '@/app/Assist/Images/Carousel/slide (3).jpg'



export default function Carousel() {
  return (
    <>
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
        <SwiperSlide>
        <div className='items'>
          <Image src={slide1} quality={100} width={1200} height={400} alt='slide 1' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='items'>
          <Image src={slide2} quality={100} width={1200} alt='slide 1' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='items'>
          <Image src={slide3} quality={100} width={1200} alt='slide 1' />
        </div>
      </SwiperSlide>
      </Swiper>
    </>
  );
}
