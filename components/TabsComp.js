import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'

function TabsComp() {
    return (
        <Tabs isLazy colorScheme='purple' pt={2} variant='line'>
            <TabList >
                <Tab
                    _hover={{

                        background: 'transparent'
                    }}
                >Overview</Tab>
                <Tab _hover={{
                    background: 'transparent'
                }}
                >Transactions</Tab>
                <Tab _hover={{
                    background: 'transparent'
                }}
                >Reports</Tab>
            </TabList>
            <TabPanels>
                {/* initially mounted */}
                <TabPanel>
                    <p>one!</p>
                </TabPanel>
                {/* initially not mounted */}
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default TabsComp