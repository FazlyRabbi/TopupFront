import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Table from "../../CommonTable/Table";

export default function SimOffer({ data, minutes, bundle }) {
  const heading = [
    "প্যাকেজসমূহ",
    "ডিসকাউন্ট",
    "আজকের দাম",
    "অফিসিয়াল দাম",
    "ক্রয় করুন",
    "মেয়াদ / যেসব এরিয়া পাবে",
  ];

  return (
    <div>
      <div className="package-table">
        <Tabs>
          <TabList>
            <Tab>Data Packages</Tab>
            <Tab>Minutes Packages</Tab>
            <Tab>Bundle Packages</Tab>
          </TabList>

          <TabPanel>
            <Table thead={heading} tbody={data} offer={true} />
          </TabPanel>

          <TabPanel>
            <Table thead={heading} tbody={minutes} offer={true} />
          </TabPanel>

          <TabPanel>
            <Table thead={heading} tbody={bundle} offer={true} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
