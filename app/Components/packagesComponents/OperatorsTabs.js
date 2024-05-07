import React from 'react'

export default function OperatorsTabs() {
  return (
    <div className='Sim-operator-tabs'>
        <Tabs>
            <TabList>
            <Tab>Airtle</Tab>
            <Tab>Robi</Tab>
            <Tab>BanglaLink</Tab>
            <Tab>Grameen</Tab>
            <Tab>Teletalk</Tab>
            </TabList>

            <TabPanel>
            <h2>Data Packages</h2>
            </TabPanel>
            <TabPanel>
            <h2>Data and Talk time package</h2>
            </TabPanel>
            <TabPanel>
            <h2>Talk time package</h2>
            </TabPanel>
        </Tabs>
    </div>
  )
}
