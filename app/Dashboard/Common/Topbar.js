"use client";

import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

const Topbar = ({ handleSidebar, user }) => {
  return (
    <div className="heading">
      <div>
        <span
          onClick={() => {
            handleSidebar();
          }}
        >
          <FaBars />
        </span>
      </div>
      <div className="profile flex  items-center">
        <p>
          Balance: <span>{user?.user?.token}Tk</span>{" "}
        </p>
        <span className="flex flex-wrap items-center gap-2">
          <h6>{user?.user?.name}</h6>
          <FaUserCircle />
        </span>
      </div>
    </div>
  );
};

export default Topbar;
