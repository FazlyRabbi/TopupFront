"use client";
import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useStore from "@/app/useStore";
import { getTimeDifference } from "@/app/utils/getTimeDifference";
import { useSession, signOut } from "next-auth/react";

export default function TableForRecent({ thead, tbody }) {
  const { recentOrder, fetchRecentOrder, fetchUserInfo } = useStore();
  const { data: session } = useSession();

  useEffect(() => {
    fetchRecentOrder();
    if (session) {
      fetchUserInfo(session?.user.data.phone);
    }
  }, []);

  return (
    <>
      {recentOrder ? (
        <table>
          <thead>
            <tr>
              {thead.map((item, i) => (
                <th key={i}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentOrder?.map((item, i) => {
              const { offer, phone, status, createdAt, price } = item;
              return (
                <tr key={i}>
                  <td>{offer}</td>
                  <td className="  text-green-500 font-semibold">{status}</td>
                  <td>{getTimeDifference(createdAt)}</td>
                  <td>{price}tk</td>
                  <td>{phone}</td>
                  {/* 
                  <td>
                    <Link
                      href={`/Offer?id=${id}&pack=${encodeURIComponent(
                        offer
                      )}&todayPrice=${todayPrice}`}
                    >
                      <Button btnName={"Buy"} />
                    </Link>
                  </td> */}
                  {/* <td>{validity}</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <Skeleton count={10} />
      )}
    </>
  );
}
