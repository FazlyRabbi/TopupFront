import React from 'react'

export default function PackagesTabs() {
  return (
    <div className='packages-tabs'>
        <Tabs>
            <TabList>
            <Tab>Data</Tab>
            <Tab>Data and Talk time</Tab>
            <Tab>Talk time</Tab>
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
 