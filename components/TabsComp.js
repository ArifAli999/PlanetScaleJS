import { Box, Flex, FormControl, FormLabel, Grid, GridItem, Icon, IconButton, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import TaskBox from './TaskBox'
import ModalComp from './ModalComp'
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons'

function TabsComp() {

    const [board, newBoard] = useState()
    return (
        <Box p={2} bg='chakra-body-bg' border='1px' borderColor='gray.700' borderTop={0}>
            <Box display='flex' justifyContent='space-between' alignItems='center' border={0} p={2} mr={2} ml={2} flexWrap='wrap'>
                <Box display='flex' gap={4} borderBottom='1px' borderColor='gray.600' px={4} py={1}>
                    <Text color='gray.200' fontSize='xl' fontWeight='medium'>Board 1</Text>
                </Box>

                <Box mr={0} p={0}>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            borderRadius='full'
                            p='1.2rem'
                            variant='outline'
                            borderColor='gray.600'
                        >Actions <ChevronDownIcon /></MenuButton>
                        <MenuList>
                            <MenuItem>New Task</MenuItem>

                            <MenuDivider />
                            <MenuItem>Export to CSV</MenuItem>
                            <MenuItem>Switch Boards</MenuItem>
                            <MenuItem>Save</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </Box>

            <Box>

                <Box p={0}>
                    <Stack display={{ md: 'flex' }} justifyContent='space-between' direction='row' gap={2} >



                        <TaskBox titleText='Lets start soon' />





                    </Stack>
                </Box>

            </Box>
        </Box>
    )
}

export default TabsComp