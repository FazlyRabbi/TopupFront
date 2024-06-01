"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "../Actions/login";
import Image from "next/image";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import logo from "@/app/Assist/Images/logo.png";
import DeshboardContent from "./Common/DeshboardContent";
import {
  OrderData,
  OrderDetails,
  TransactionHeading,
  TransactionsDetails,
} from "../Components/TableData/Data";
import AddBalance from "./Common/AddBalance";
import Link from "next/link";
import { FaHistory } from "react-icons/fa";
import { FaGift } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import Topbar from "./Common/Topbar";
import { IoMdNotifications } from "react-icons/io";
import Footer from "../Components/Footer";

export default function page() {
  const [openSidebar, setSidebar] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = async () => {
      const session = await useSession();
      setUser(session);
    };
    user();
  }, []);

  const handleSidebar = () => {
    setSidebar(!openSidebar);
  };

  return (
    <div className="Dashboard-page">
      <div className="layout">
        <div className="main-content">
          <Tabs>
            {openSidebar ? (
              <div className="left-sitebar">
                <div className="sidebar-logo">
                  <Image src={logo} width={100} alt="logo" />
                </div>
                <TabList>
                  <Tab>
                    <span>
                      <FaMoneyBillWave /> Add Balance
                    </span>
                  </Tab>
                  <Tab>
                    <Link href={"/"}>
                      <span>
                        <FaGift /> Offers
                      </span>
                    </Link>
                  </Tab>
                  <Tab>
                    <span>
                      <IoMdNotifications /> Notification
                    </span>
                  </Tab>
                  <Tab>
                    <span>
                      <FaShoppingCart /> Oders
                    </span>
                  </Tab>
                  <Tab>
                    <span>
                      {" "}
                      <FaHistory /> Transaction History
                    </span>
                  </Tab>
                  <Tab>
                    <span>
                      <IoLogOut /> Logout
                    </span>
                  </Tab>
                </TabList>
              </div>
            ) : null}
            <section className="right-sidebar-content">
              <div className="dashboard-heading">
                <Topbar handleSidebar={handleSidebar} user={user} />
              </div>

              <TabPanel>
                <AddBalance />
              </TabPanel>
              <TabPanel>
                <DeshboardContent
                  theading={OrderData}
                  title={"Orders"}
                  tbody={OrderDetails}
                />
              </TabPanel>

              <TabPanel></TabPanel>

              <TabPanel>
                <DeshboardContent title={"Notifications"} />
              </TabPanel>

              <TabPanel>
                <DeshboardContent
                  theading={TransactionHeading}
                  tbody={TransactionsDetails}
                  title={"Transaction history"}
                />
              </TabPanel>

              <TabPanel></TabPanel>

              <Footer />
            </section>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

//  <TabPanel>
//                 {/* <Topbar title={'Order History'} handleSidebar={handleSidebar} /> */}
//               <section>
//                 <DeshboardContent theading={OrderData} tbody={OrderDetails} />
//               </section>
//             </TabPanel>

//             <TabPanel>

//             </TabPanel>

//             <TabPanel>
//                 {/* <Topbar title={"Notifications"} handleSidebar={handleSidebar} /> */}
//               <section className="notificaton-page">
//                 <DeshboardContent  />
//               </section>
//             </TabPanel>

//             <TabPanel>
//                 {/* <Topbar handleSidebar={handleSidebar} /> */}
//               <section className="add-balance-setion">
//                 <AddBalance />
//               </section>
//             </TabPanel>

//             <TabPanel>
//                 {/* <Topbar title={"Transaction History"} handleSidebar={handleSidebar} /> */}
//               <section>
//                 <DeshboardContent theading={TransactionHeading} tbody={TransactionsDetails} />
//               </section>
//             </TabPanel>

//             <TabPanel>
//               logout page
//             </TabPanel>
