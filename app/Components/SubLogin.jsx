"use client";
import Link from "next/link";
import React, { useId, useState } from "react";
import logo from "@/app/Assist/Images/logo.png";
import Image from "next/image";
import { login } from "../Actions/login";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import useStore from "../useStore";

import { signIn, signOut } from "next-auth/react";

const init = {
  phone: "",
  password: "",
};

export default function SubLogin({ session }) {
  const { hanleIslogin, fetchUserInfo, userInfo } = useStore();
  const [user, setUser] = useState(init);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        phone: user.phone,
        password: user.password,
      });

      console.log(res);

      // // const data = await login(user);
      // if (data.ok) {
      //   Swal.fire({
      //     text: `${data.message}`,
      //     icon: "success",
      //   });

      //   hanleIslogin();
      //   fetchUserInfo(user?.phone);
      //   setUser(init);
      //   router.push("/");
      //   setIsLoading(false);
      // } else {
      //   Swal.fire({
      //     text: `${data.error}`,
      //     icon: "error",
      //   });
      //   setIsLoading(false);
      // }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

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
        <form onSubmit={handleSubmit}>
          <span>
            <label htmlFor="num">Mobile Number</label>
            <input
              disabled={isLoading}
              required
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              placeholder="Phone"
              id="num"
            />
          </span>
          <span>
            <label htmlFor="Password">Password</label>
            <input
              disabled={isLoading}
              required
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
              id="Password"
            />
          </span>
          <div
            onClick={() => signOut()}
            className="flex items-center justify-between"
          >
            <span>
              <Link href="#">
                {" "}
                <p>Forgot password?</p>{" "}
              </Link>
            </span>
          </div>

          <button
            disabled={isLoading}
            className="    rounded-md p-2  bg-purple-600  text-white   w-full"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
