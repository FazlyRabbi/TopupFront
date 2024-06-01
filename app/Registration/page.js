"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/app/Assist/Images/logo.png";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const init = {
  name: "",
  phone: "",
  password: "",
};

export default function page() {
  const [data, setData] = useState(init);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    router.push("/");
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/api/userRegister`,
        data
      );

      if (response) {
        setData(init);
        Swal.fire({
          text: `${response.data.message}`,
          icon: "success",
        });
        setIsLoading(false);
      }
      setIsLoading(false);

      // Return the response data
      return response.data;
    } catch (error) {
      Swal.fire({
        text: "Internal Server Error!",
        icon: "error",
      });
      setIsLoading(false);

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
              disabled={isLoading}
              required
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
              disabled={isLoading}
              required
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
              disabled={isLoading}
              required
              onChange={(e) => setData({ ...data, password: e.target.value })}
              type="password"
              placeholder={"Password"}
              id={"Passowrd"}
            />
          </span>

          <span>
            <input disabled={isLoading} type="submit" value={"Registration"} />
          </span>
        </form>
      </div>
    </div>
  );
}
