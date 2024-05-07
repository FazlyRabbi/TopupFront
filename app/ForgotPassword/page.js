"use client"

import React from 'react'
import Input from '../Components/Elements/Input'
// import logo from '@/app/Assist/Images/logo.jpg'
// import Image from 'next/image'
// import { Link } from 'next/link';


export default function ResetPassword() {
  return (
    <div className="ResetPassword login-area ">
      <div className='forgot-password'>
      {/* <Link href="/" class="flex mx-auto"> <Image src={logo} width={100} height={100} alt="logo" /> </Link> */}
        <h4>Type Your Account number</h4><br/>   
        <form>
            <span>
                <label htmlFor="num">Account Mobile No</label><br/>
                <Input type={"number"} placeholder={'Mobile Number'} id={'num'}/><br/>
            </span>
            <span>
                 <Input type={"Submit"} value={"Submit"} />
            </span>
        </form>
      </div>
    </div>
  )
}
