"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
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
  const [error, setError] = useState(false);
  const [otpState, setOtpState] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [sotp, setSotp] = useState(null);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Ensure that only numeric values are allowed
    if (!value.match(/^[0-9]*$/)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if current input has a value
    if (value && index < 3) {
      document.getElementById(`digit-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`digit-${index - 1}`).focus();
    }
  };

  // Function to add 88 country code if not present
  const handleChanges = (e) => {
    let phone = e.target.value;

    // Use regex to check if the phone starts with 88
    if (!phone.startsWith("88")) {
      phone = `88${phone}`;
    }

    // Validate the phone number (must be digits only and have a specific length, e.g., 10-12 digits excluding country code)
    const phoneWithoutCode = phone.slice(2);
    const phoneRegex = /^[0-9]{11,12}$/;

    if (!phoneRegex.test(phoneWithoutCode)) {
      setError(true);
    } else {
      setError(false);
    }

    // Update the state with the new phone value
    setData({ ...data, phone });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const otp = generateOTP(4);
    setIsLoading(true);

    if (error) {
      Swal.fire({
        text: `Invalid Phone Number!`,
        icon: "error",
      });
      return;
    }
    try {
      localStorage.setItem("data", JSON.stringify(data));

      const response = await axios.post(
        `https://login.esms.com.bd/api/v3/sms/send`,
        {
          recipient: data?.phone,
          sender_id: "8809601001283",
          type: "plain",
          message: `Your Topup Registration Otp is ${otp}`,
        },
        {
          headers: {
            Authorization: `Bearer 288|545IuEaJ9V0GPe9S43RMz0HWP0slSSVkPShxeGTD`, // Replace with your actual Bearer token
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        const res = await axios.post(`${process.env.API_URL}/api/otp`, {
          otp,
        });

        if (res) {
          setSotp(res.data.data);

          setOtpState(true);
          setData(init);
          Swal.fire({
            text: `Otp Send Successfully!`,
            icon: "success",
          });
          setIsLoading(false);
        } else {
          Swal.fire({
            text: `Something Went Wrong!`,
            icon: "error",
          });
          setIsLoading(false);
        }
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
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const userOtp = otp.join("");

    if (userOtp !== sotp?.otp) {
      Swal.fire({
        text: "Invalid Otp",
        icon: "error",
      });
      return;
    }

    setIsLoading(true);
    try {
      const valueString = localStorage.getItem("data");

      const data = JSON.parse(valueString);

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
        router.push("/Login");
      }
      setIsLoading(false);

      // Return the response data
      return response.data;
    } catch (error) {
      Swal.fire({
        text: error.message,
        icon: "error",
      });
      setIsLoading(false);
    }
  };

  const firstInputRef = useRef(null);

  useEffect(() => {
    // Set focus on the first input when the component mounts
    firstInputRef?.current?.focus();
  }, []);

  return (
    <>
      {!otpState && (
        <div className="login-area signup-area">
          <div className="login-content-box">
            <Link href="/" className="flex mx-auto">
              <Image src={logo} width={100} height={100} alt="logo" />
            </Link>
            <h3>Registration</h3>
            <br />
            <p className="cursor-pointer"></p>
            <form className="my-3" onSubmit={handleSendOtp}>
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
                  onChange={handleChanges}
                  type="number"
                  placeholder={"Number"}
                  id={"num"}
                />
                {error && (
                  <p className="text-sm text-left">
                    Please Enter Correct Number!
                  </p>
                )}
              </span>

              <span>
                <label htmlFor="Password">Password</label>
                <input
                  value={data.password}
                  disabled={isLoading}
                  required
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  type="password"
                  placeholder={"Password"}
                  id={"Passowrd"}
                />
              </span>

              <span>
                <input
                  disabled={isLoading}
                  type="submit"
                  value={"Registration"}
                />
              </span>
            </form>
          </div>
        </div>
      )}
      {otpState && (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
          <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="font-semibold text-3xl">
                  <p>OTP Verification</p>
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-400">
                  <p>We have sent an OTP code to your {data?.phone}</p>
                </div>
              </div>

              <div>
                <form action="" method="post">
                  <div className="flex flex-col space-y-16">
                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                      {[0, 1, 2, 3].map((index) => (
                        <div key={index} className="w-16 h-16">
                          <input
                            ref={index === 0 ? firstInputRef : null}
                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="text"
                            name={`digit-${index}`}
                            id={`digit-${index}`}
                            maxLength="1"
                            autoComplete="off"
                            value={otp[index]}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col space-y-5">
                      <div>
                        <button
                          disabled={isLoading}
                          onClick={(e) => handleRegister(e)}
                          className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                        >
                          Verify Account
                        </button>
                      </div>

                      {/* <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        <p>Didn't receive code?</p>{" "}
                        <a
                          className="flex flex-row items-center text-blue-600"
                          href="#"
                          onClick={(e) => handleSendOtp(e)}
                          rel="noopener noreferrer"
                        >
                          Resend
                        </a>
                      </div> */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function generateOTP(length) {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
