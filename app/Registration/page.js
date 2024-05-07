"use client";
import Link from "next/link";
import React, { useState } from "react";
import Input from "../Components/Elements/Input";
import Image from "next/image";
import logo from "@/app/Assist/Images/logo.png";
import axios from "axios";

const init = {
  name: "",
  phone: "",
  password: "",
};

export default function page() {
  const [data, setData] = useState(init);

  const handleRegister = async (e) => {

    e.preventDefault();
    try {
      // Make the POST request using Axios
      const response = await axios.post(
        "http://localhost:3000/api/userRegister",
        data
      );
      console.log(response);
      // Return the response data
      return response.data;
    } catch (error) {
      // Handle errors
      // console.error("Error while making POST request:", error);
      // You can throw the error or handle it gracefully here
    }
  };
  return (
    <div className="login-area signup-area">
      <div className="login-content-box">
        <Link href="/" className="flex mx-auto">
          {" "}
          <Image src={logo} width={100} height={100} alt="logo" />{" "}
        </Link>
        <h3>Registration </h3>
        <br />
        <p className="   cursor-pointer"></p>
        <form className="my-3" onSubmit={handleRegister}>
          <span>
            <label htmlFor="name">Full Name</label>
            <input
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              type="text"
              placeholder={"Full Name"}
              id="name"
            />
          </span>

          <span>
            <label htmlFor="num">Mobile Number</label>
            <input
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              type="number"
              placeholder={"Number"}
              id={"num"}
            />
          </span>

          <span>
            <label htmlFor="Password">Password</label>
            <input
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              type="password"
              placeholder={"Password"}
              id={"Passowrd"}
            />
          </span>

          <span>
            <input type="submit" value={"Registration"} />
          </span>
        </form>
      </div>
    </div>
  );
}
