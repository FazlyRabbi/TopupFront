"use client";
import Link from "next/link";
import React from "react";
import Input from "../Components/Elements/Input";
import logo from "@/app/Assist/Images/logo.png";
import Image from "next/image";
import { login } from "../Actions/login";

export default function page() {
  return (
    <div className="login-area">
      <div className="login-content-box">
        <Link href="/" className="flex mx-auto">
          {" "}
          <Image src={logo} width={100} height={100} alt="logo" />{" "}
        </Link>
        <h3>Login</h3>
        <br />
        <p>
          <Link href={"/Registration"}>
            New to Tong's Offer? <b>Registration</b>{" "}
          </Link>
        </p>
        <form>
          <span>
            <label htmlFor="num">Mobile Number</label>
            <Input placeholder={"Number"} id="num" />
          </span>
          <span>
            <label htmlFor="Password">Password</label>
            <Input placeholder={"Password"} id="Password" />
          </span>
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              <input type="checkbox" id="rem" />{" "}
              <label htmlFor="rem">Remember me</label>
            </span>
            <span>
              <Link href="/ForgotPassword">
                {" "}
                <p>Forgot password?</p>{" "}
              </Link>
            </span>
          </div>
          <input type="submit" value="Login" />
        </form>

        <button onClick={() => login()}>Submit</button>
      </div>
    </div>
  );
}
