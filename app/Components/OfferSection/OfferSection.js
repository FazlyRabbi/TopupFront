"use client"

import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SimOffer from './SimOffers/SimOffer';
import { AirtleBundle, AirtleData, AirtleMinutes } from '../TableData/Data';


export default function OfferSection() {


  return (
    <div className='offer-list-section'>
       <h2>আকর্ষণীয় অফারসমূহ :</h2>

       <div className='offer-table'>
             <Tabs>
                <TabList>
                <Tab>Airtle</Tab>
                <Tab>Robi</Tab>
                <Tab>BanglaLink</Tab>
                <Tab>Grameen</Tab>
                <Tab>Teletalk</Tab>
                </TabList>

                <TabPanel>
                <SimOffer data={AirtleData} minutes={AirtleMinutes} bundle={AirtleBundle} />
                </TabPanel>
                <TabPanel>
                 <SimOffer data={AirtleData} minutes={AirtleMinutes} bundle={AirtleBundle} />
                </TabPanel>
                <TabPanel>
                 <SimOffer data={AirtleData} minutes={AirtleMinutes} bundle={AirtleBundle} />
                </TabPanel>
                <TabPanel>
                 <SimOffer data={AirtleData} minutes={AirtleMinutes} bundle={AirtleBundle} />
                </TabPanel>
                <TabPanel>
                 <SimOffer data={AirtleData} minutes={AirtleMinutes} bundle={AirtleBundle} />
                </TabPanel>
            </Tabs>
       </div>
    </div>
  )
}
