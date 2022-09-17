import { Box, Flex, FormControl, FormLabel, Grid, GridItem, Icon, IconButton, Input, SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import TaskBox from './TaskBox'
import ModalComp from './ModalComp'

function TabsComp() {

    const [board, newBoard] = useState()
    return (
        <Tabs isLazy colorScheme='purple' pt={2} variant='soft-rounded'>
            <TabList display='flex' justifyContent='space-between' alignItems='center' border={0} ml={2} >
                <Box display='flex' gap={4}>
                    <Tab _hover={{ background: 'blackAlpha.600', color: 'white' }} color='white'>Board 1</Tab>
                    <Tab _hover={{ background: 'blackAlpha.600', color: 'white' }} color='white'>Board 2</Tab>
                    <Tab _hover={{ background: 'blackAlpha.600', color: 'white' }} color='white'>Board 3</Tab>

                </Box>

                <Box mr={2} p={2}>
                    <ModalComp modalcont={[
                        <FormControl key='userNamed' display='flex' flexDirection='column'>
                            <FormLabel fontSize='xs' mb='2.5'>Got something new?</FormLabel>


                        </FormControl>
                    ]} modaltit='New board' newName={board} setNewName={newBoard}
                        buttontit='Create'
                        key='usernameModal'
                    />
                </Box>
            </TabList>

            <TabPanels>

                <TabPanel p={0}>
                    <Stack display={{ md: 'flex' }} justifyContent='space-between' direction='row' gap={2} >



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