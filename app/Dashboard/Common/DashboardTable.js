
import Link from 'next/link';
import React from 'react'

export default function DashboardTable({thead, tbody}) {
 const noticedata = [
   {
    id:'01',
     text:"Hey,, your Offer has successfully done" 
   },
   {
    id:'02',
     text:"Your deposit balance is successfully added." 
   }, 
   {
    id:'03',
     text:"Hey,, your Offer has successfully done" 
   },
   {
    id:'04',
     text:"Your deposit balance is successfully added." 
   } 
  ];

  return (
   <div>
        {
            thead ? <table  className='table'>
        <thead>
            <tr key="">
                {
                thead.map((itmes, i)=>{
                    return(
                        <th key={i}>{itmes}</th>
                    )
                })
            }
            </tr>
        </thead>
        <tbody>
            { 
              tbody.map((items, i)=>{
                const {id,details, price,Phone,status, time} = items;
                    return(
                        <tr key={i}>
                            {
                                id ? <td>{id}</td> : null
                            }
                            <td>{details}</td>
                            <td>{price}</td>
                            <td>{Phone}</td>
                            <td >{status}</td>
                            <td>{time}</td>
                        </tr>
                    )
                })
              
            }
        </tbody>
    </table> :

            <div className="notification">
                <ul>
                    {
                      !thead?  noticedata.map((items, i) =>{
                            return(
                                <li key={i}>{items.text}</li>
                            )
                        }):
                        null

                    }
                </ul>
            </div>

        }
   </div>
  )
}
