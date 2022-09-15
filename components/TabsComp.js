import { Box, Flex, Grid, GridItem, Icon, IconButton, SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import TaskBox from './TaskBox'

function TabsComp() {
    return (
        <Tabs isLazy colorScheme='purple' pt={0} variant='line'>
            <TabList display='flex' justifyContent='space-between' alignItems='center'  >
                <Box display='flex' >
                    <Tab _hover={{ background: 'transparent' }}>Board 1</Tab>
                    <Tab _hover={{ background: 'transparent' }}>Board 2</Tab>
                    <Tab _hover={{ background: 'transparent' }}>Board 3</Tab>

                </Box>

                <Box mr={4} >
                    <Box _hover={{ background: 'transparent', color: 'purple.400', cursor: 'pointer' }} display="flex" alignContent='center' alignItems='center' justifyContent='center'>
                        <Icon as={AiOutlinePlus} w={10} h={5} />  New Board</Box>
                </Box>
            </TabList>

            <TabPanels>

                <TabPanel p={0}>
                    <Stack display={{ md: 'flex' }} justifyContent='space-between' direction='' gap={2} >



                        <TaskBox titleText='Lets start soon' />





                    </Stack>
                </TabPanel>

                <TabPanel>
                    <p>two!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default TabsComp