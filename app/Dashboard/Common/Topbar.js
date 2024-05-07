"use client"

import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { FaBars } from "react-icons/fa";


const Topbar = ({ handleSidebar }) => {
    return (
             <div className='heading'>
                <div>
                    <span onClick={() => { handleSidebar() }}><FaBars /></span>
                </div>
                <div className='profile flex  items-center'>
                      <p>Balance: <span>560tk</span> </p>
                    <span className='flex flex-wrap items-center gap-2'>
                        <h6>User-name</h6>
                        <FaUserCircle />
                    </span>
                </div>
            </div>
    );
}

export default Topbar;
