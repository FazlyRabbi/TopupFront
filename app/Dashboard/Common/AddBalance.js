import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddBalance() {
  const [amount, setAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    console.log(process.env.BKASH_USERNAME);
    console.log(process.env.BKASH_PASSWORD);
    try {
      const res = await axios.post(
        `${process.env.BKASH_API_URL}/token/grant`,
        {
          app_key: process.env.APP_KEY,
          app_secret: process.env.APP_SECRET,
        },
        {
          headers: {
            "Content-Type": "application/json", // or other content type if needed
            // Authorization: `Bearer ${process.env.BEARER_TOKEN}`, // example of an authorization header if required
            username: process.env.USERNAME,
            // password: process.env.PASSWORD,
          },
        }
      );

      //   Swal.fire({
      //     text: `Success`,
      //     icon: "success",
      //   });
    } catch (err) {
      Swal.fire({
        text: `Internal Server Error!`,
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
            type="number"
            placeholder="Write Money Amount"
          />
        </span>
        <span>
          <input type="submit" value="Deposit Balance" />
        </span>
      </form>
    </div>
  );
}
