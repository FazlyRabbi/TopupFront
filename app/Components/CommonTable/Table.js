import Link from "next/link";
import React from "react";
import Button from "../Elements/Button";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Table({ thead, tbody }) {
  return (
    <>
      {tbody ? (
        <table>
          <thead>
            <tr>
              {thead.map((item, i) => (
                <th key={i}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tbody.map((item, i) => {
              const { pack, id, discount, todayPrice, officalPrice, validity } =
                item;
              return (
                <tr key={i}>
                  <td>{pack}</td>
                  <td>{discount}tk</td>
                  <td>{todayPrice}tk</td>
                  <td>{officalPrice}tk</td>
                  <td>
                    <Link
                      href={`/Offer?id=${id}&pack=${encodeURIComponent(
                        pack
                      )}&todayPrice=${todayPrice}`}
                    >
                      <Button btnName={"Buy"} />
                    </Link>
                  </td>
                  <td>{validity}days</td>
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
