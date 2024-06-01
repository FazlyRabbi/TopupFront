"use client";

import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SimOffer from "./SimOffers/SimOffer";
import axios from "axios";

export default function OfferSection() {
  const [minutePack, setMinutePack] = useState(null);
  const [dataPack, setDataPack] = useState(null);
  const [bundlePack, setBundlePack] = useState(null);

  const [airtelMinutePack, setAirtelMinutePack] = useState(null);
  const [airtelDataPack, setAirtelDataPack] = useState(null);
  const [airtelBundlePack, setAirtelBundlePack] = useState(null);

  const [gpMinutePack, setGpMinutePack] = useState(null);
  const [gpDataPack, setGpDataPack] = useState(null);
  const [gpBundlePack, setGpBundlePack] = useState(null);

  const [banglalinkMinutePack, setBanglalinkMinutePack] = useState(null);
  const [banglalinkDataPack, setBanglalinkDataPack] = useState(null);
  const [banglalinkBundlePack, setBanglalinkBundlePack] = useState(null);

  const [teletalkMinutePack, setTeletalkMinutePack] = useState(null);
  const [teletalkDataPack, setTeletalkDataPack] = useState(null);
  const [teletalkBundlePack, setTeletalkBundlePack] = useState(null);

  const [robiMinutePack, setRobiMinutePack] = useState(null);
  const [robiDataPack, setRobiDataPack] = useState(null);
  const [robiBundlePack, setRobiBundlePack] = useState(null);

  useEffect(() => {
    if (bundlePack && minutePack && dataPack) {
      const airtelMinPack = minutePack.filter(
        (data) => data?.oparetor === "Airtel"
      );
      const airtelDataPack = dataPack.filter(
        (data) => data?.oparetor === "Airtel"
      );
      const airtelBundlePack = bundlePack.filter(
        (data) => data?.oparetor === "Airtel"
      );

      setAirtelMinutePack(airtelMinPack);
      setAirtelDataPack(airtelDataPack);
      setAirtelBundlePack(airtelBundlePack);

      const gpMinPack = minutePack.filter(
        (data) => data?.oparetor === "Grameenphone"
      );
      const gpDataPack = dataPack.filter(
        (data) => data?.oparetor === "Grameenphone"
      );
      const gpBundlePack = bundlePack.filter(
        (data) => data?.oparetor === "Grameenphone"
      );

      setGpMinutePack(gpMinPack);
      setGpDataPack(gpDataPack);
      setGpBundlePack(gpBundlePack);

      const banglalinkMinPack = minutePack.filter(
        (data) => data?.oparetor === "Banglalink"
      );
      const banglalinkDataPack = dataPack.filter(
        (data) => data?.oparetor === "Banglalink"
      );
      const banglalinkBundlePack = bundlePack.filter(
        (data) => data?.oparetor === "Banglalink"
      );

      setBanglalinkMinutePack(banglalinkMinPack);
      setBanglalinkDataPack(banglalinkDataPack);
      setBanglalinkBundlePack(banglalinkBundlePack);

      const teletalkMinPack = minutePack.filter(
        (data) => data?.oparetor === "Taletalk"
      );
      const teletalkDataPack = dataPack.filter(
        (data) => data?.oparetor === "Taletalk"
      );
      const teletalkBundlePack = bundlePack.filter(
        (data) => data?.oparetor === "Taletalk"
      );

      setTeletalkMinutePack(teletalkMinPack);
      setTeletalkDataPack(teletalkDataPack);
      setTeletalkBundlePack(teletalkBundlePack);

      const robiMinPack = minutePack.filter(
        (data) => data?.oparetor === "Robi"
      );
      const robiDataPack = dataPack.filter((data) => data?.oparetor === "Robi");
      const robiBundlePack = bundlePack.filter(
        (data) => data?.oparetor === "Robi"
      );

      setRobiMinutePack(robiMinPack);
      setRobiDataPack(robiDataPack);
      setRobiBundlePack(robiBundlePack);
    }
  }, [minutePack, dataPack, bundlePack]);

  useEffect(() => {
    const fetchMinutePack = async () => {
      try {
        const minPack = await axios.get(`${process.env.API_URL}/api/minuepack`);
        const dataPack = await axios.get(`${process.env.API_URL}/api/datapack`);
        const bundlePack = await axios.get(
          `${process.env.API_URL}/api/bundlepack`
        );

        setMinutePack(minPack?.data?.data);
        setDataPack(dataPack?.data?.data);
        setBundlePack(bundlePack?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMinutePack();
  }, []);

  return (
    <div className="offer-list-section">
      <h2>আকর্ষণীয় অফারসমূহ :</h2>

      <div className="offer-table">
        <Tabs>
          <TabList>
            <Tab>Airtle</Tab>
            <Tab>Robi</Tab>
            <Tab>BanglaLink</Tab>
            <Tab>Grameen</Tab>
            <Tab>Teletalk</Tab>
          </TabList>

          <TabPanel>
            <SimOffer
              data={airtelDataPack}
              minutes={airtelMinutePack}
              bundle={airtelBundlePack}
            />
          </TabPanel>

          <TabPanel>
            <SimOffer
              data={robiDataPack}
              minutes={robiMinutePack}
              bundle={robiBundlePack}
            />
          </TabPanel>

          <TabPanel>
            <SimOffer
              data={banglalinkDataPack}
              minutes={banglalinkMinutePack}
              bundle={banglalinkBundlePack}
            />
          </TabPanel>

          <TabPanel>
            <SimOffer
              data={gpDataPack}
              minutes={gpMinutePack}
              bundle={gpBundlePack}
            />
          </TabPanel>

          <TabPanel>
            <SimOffer
              data={teletalkDataPack}
              minutes={teletalkMinutePack}
              bundle={teletalkBundlePack}
            />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
