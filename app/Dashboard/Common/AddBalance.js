"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";


export default function AddBalance() {


  const [amount, setAmount] = useState(null);
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!amount) {
        setIsLoading(false);
        Swal.fire({
          title: "Please Enter Your Ammount!",
          icon: "info",
        });
        return;
      }

      // Fetch the grant token
      const grantTokenResponse = await axios.get(
        `${process.env.API_URL}/api/bkash`
      );

      if (
        grantTokenResponse &&
        grantTokenResponse.data &&
        grantTokenResponse.data.data
      ) {
        const idToken = grantTokenResponse.data.data.id_token;
        localStorage.setItem("token", idToken);

        try {
          // Execute the payment using the grant token
          const createPaymentResponse = await axios.post(
            `${process.env.API_URL}/api/bkash`,
            {
              token: idToken,
              amount,
              payer: session?.user.data.name || "",
            }
          );
          setAmount(null);

          if (
            createPaymentResponse &&
            createPaymentResponse.data &&
            createPaymentResponse.data.data
          ) {
            const bkashURL = createPaymentResponse.data.data.bkashURL;
            setIsLoading(false);
            // Redirect to the bKash payment URL
            window.location.href = bkashURL;
          } else {
            setIsLoading(false);
            Swal.fire({
              text: "Failed to execute payment. Response is missing data.",
              icon: "error",
            });
          }
        } catch (executeError) {
          setIsLoading(false);

          Swal.fire({
            text: `Error executing payment: ${
              executeError.response
                ? executeError.response.data
                : executeError.message
            }`,
            icon: "error",
          });
        }
      } else {
        setIsLoading(false);

        Swal.fire({
          text: "Failed to fetch grant token. Response is missing data.",
          icon: "error",
        });
      }
    } catch (grantTokenError) {
      setIsLoading(false);
      Swal.fire({
        text: `Error fetching grant token: ${
          grantTokenError.response
            ? grantTokenError.response.data
            : grantTokenError.message
        }`,
        icon: "error",
      });
    }
  };

  return (
    <div className="add-balance">
      <h3>Add Balance in your Account.. </h3>
      <form onSubmit={handleSubmit}>
        <span>
          <label>Enter your Amount</label>
          <input
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            type="number"
            placeholder="Write Money Amount"
          />
        </span>
        <span>
          <input disabled={isLoading} type="submit" value="Deposit Balance" />
        </span>
      </form>
    </div>
  );
}
