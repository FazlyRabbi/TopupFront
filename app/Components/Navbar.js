"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "@/app/Assist/Images/logo.png";
import Image from "next/image";
import { FaCircleUser } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { IoLogOut } from "react-icons/io5";
import useStore from "../useStore";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { userInfo, fetchUserInfo } = useStore();
  const [openProfile, setOpenProfile] = useState(false);
  const [menu, setMenu] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      fetchUserInfo(session?.user.data.phone);
    }
  }, []);

  return (
    <div className="navbar-area flex justify-between items-center px-5">
      <div className="brand-logo w-[20%]">
        <Link href={"/"}>
          <Image
            src={logo}
            alt={"Brand-logo"}
            quality={100}
            width={100}
          ></Image>
        </Link>
      </div>
      <div className="nav-items">
        <nav>
          <ul className="flex  justify-center  items-center">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/Customer-Service"}>Customer Service</Link>
            </li>

            {!session && (
              <>
                <li>
                  <Link href={"/Login"}>Login</Link>
                </li>
                <li>
                  <Link href={"/Registration"}>Registration</Link>
                </li>
              </>
            )}

            {session && (
              <li
                className="text-3xl cursor-pointer"
                onClick={(e) => {
                  setOpenProfile(!openProfile);
                }}
              >
                <FaCircleUser />
                {openProfile ? (
                  <ul>
                    <li>
                      <Link href="/Dashboard">Profile</Link>
                    </li>
                    <li>
                      Balance: <span>{userInfo?.token}Tk</span>
                    </li>
                    <li onClick={() => signOut()}>
                      <span>
                        <IoLogOut />
                      </span>{" "}
                      Logout
                    </li>
                  </ul>
                ) : null}
              </li>
            )}
          </ul>
        </nav>
        {menu ? (
          <nav
            className="mobile-nav"
            style={{ display: menu ? "block" : "none" }}
          >
            <ul className="flex justify-between">
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/Customer-Service"}>Customer Service</Link>
              </li>
              <li>
                <Link href={"/Login"}>Login</Link>
              </li>
              <li>
                <Link href={"/Registration"}>Registration</Link>
              </li>
              <li
                className="text-3xl cursor-pointer text-center text-black"
                onClick={(e) => {
                  setOpenProfile(!openProfile);
                }}
              >
                <FaCircleUser />
                {openProfile ? (
                  <ul>
                    <li>
                      <Link href="/Dashboard">Profile</Link>
                    </li>
                    <li>
                      Balance: <span>250Tk</span>
                    </li>
                    <li>
                      User Id: <span>0001254</span>
                    </li>
                    <li onClick={() => signOut()}>
                      <span>
                        <IoLogOut />
                      </span>{" "}
                      Logout
                    </li>
                  </ul>
                ) : null}
              </li>
            </ul>
          </nav>
        ) : null}

        <div
          className="bars"
          onClick={(e) => {
            setMenu(!menu);
          }}
        >
          {menu ? <RxCross1 /> : <FaBars />}
        </div>
      </div>
    </div>
  );
}
