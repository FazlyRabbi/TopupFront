"use client"

import { AirtleData } from '@/app/Components/TableData/Data';
import { useRouter } from 'next/navigation'
import React from 'react'

export default function page({params}) {

  let dataId = params.id;
  const data = AirtleData.find((item)=> item.id == dataId)



  return (
    <div className='order-placement-page'>
      <div className="order-confirmation">
      <div>
       
      </div>
      <div className="offer-title">
        <span className="py-3">
           <h3>অফার কিনুন </h3>
        </span>
        <hr/> 
      <br/>
        <div>
            <h3>Offer Name: <span>{data.name}</span> </h3>
            <h4>Price: <span style={{color:'purple'}}>{data.todayPrice}</span> </h4>
        </div>
      </div>


        <form>
              <h4>Type your number To receive the Offer</h4>
              <br />
            <span>
              <label>১১ ডিজিটের নাম্বার</label>
                <input type="number" id="numb" placeholder="Type the Number" required /><br/>
            </span><br/>
            <span>
              <label htmlFor="div"> নাম্বারটি কোন বিভাগের ?  </label>
                <input type="text" id="div" placeholder="Type your Divition" required /><br/>
            </span>
            <input type="submit" value="Confirm Order" />
        </form>
      </div>
    </div>
  )
}
