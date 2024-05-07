import Link from 'next/link';
import React from 'react'
import Button from '../Elements/Button';
import { FaCheckDouble } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";



export default function  Table({thead, tbody, offer}) {


  return (
    <table>
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
              offer ?  
              tbody.map((items, i)=>{
                const {name,id,discount, todayPrice,regularPrice,priod} = items;
                    return(
                        <tr key={i}>
                            <td>{name}</td>
                            <td>{discount}</td>
                            <td>{todayPrice}</td>
                            <td>{regularPrice}</td>
                            <td ><Link href={`/Offer/${id}`} ><Button btnName={"Buy"} /></Link></td>
                            <td>{priod}</td>
                        </tr>
                    )
                })
              
              : tbody.map((items, i)=>{
                const {name,status, brought,price,mobile} = items;
                    return(
                        <tr key={i}>
                            <td>{name}</td>
                            <td className='my-auto   items-center'> <span className="flex gap-1 items-center"><FaCheckDouble /> {status}</span> </td>
                            <td><span className='flex gap-2 items-center'><MdAccessTime /> {brought}</span> </td>
                            <td>{price}</td>
                            <td>{mobile}</td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
  )
}
