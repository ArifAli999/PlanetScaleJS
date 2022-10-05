import { Box, Flex, FormControl, FormLabel, Grid, GridItem, Icon, IconButton, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlinePlus, AiOutlineStar } from 'react-icons/ai'
import TaskBox from './TaskBox'
import ModalComp from './ModalComp'
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons'
import MenuComponent from './MenuComponent'

function TabsComp() {

    const [board, newBoard] = useState()
    return (
        <Box p={2} bg='chakra-body-bg' border='1px' borderColor={useColorModeValue('gray.300', 'gray.900')} borderTop={0}>
            <Box display='flex' justifyContent='space-between' alignItems='center' border={0} p={2} mr={2} ml={2} flexWrap='wrap'>
                <Box display='flex' gap={4} borderBottom='0' borderColor='gray.600' px={4} py={1}>
                    <Text color={useColorModeValue('gray.800', 'gray.200')} fontSize='xl' fontWeight='medium'>Board 1</Text>
                </Box>

                <IconButton

                    aria-label='Call Segun'
                    borderRadius='full'

                    icon={<AiOutlineStar />}
                    _hover={{
                        cursor: "pointer",
                        color: "purple.400",
                    }}
                />
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