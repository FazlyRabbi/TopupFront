import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

export default function page() {
  return (
    <div className='Support-page'>
        <div className="content-box ">
            <div className="items">
                <h3>
                    হটলাইন নাম্বারঃ
                </h3>
                <p> 
                    <span> <FaPhoneAlt /></span>
                    <span>01611691111</span>
                </p>
            </div>
            <div className="items">
                <h3>
                    মেইল ঠিকানাঃ
                </h3>
                <p> 
                    <span> <MdEmail /></span>
                    <span>info@tong.com.bd </span>
                </p>
            </div>
        </div>
    </div>
  )
}
