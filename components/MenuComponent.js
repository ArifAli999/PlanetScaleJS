import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Icon, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'

function MenuComponent() {
    return (
        <Box mr={0} p={0}>
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    bg='transparent'
                    _hover={{
                        cursor: "pointer",
                        background: "transparent",
                        animationDuration: 3000,
                        color: 'purple.400'

                    }}

                >  <Icon as={BsThreeDots} /></MenuButton>
                <MenuList>
                    <MenuItem>New Task</MenuItem>

                    <MenuDivider />
                    <MenuItem>Export to CSV</MenuItem>
                    <MenuItem>Switch Boards</MenuItem>
                    <MenuItem>Save</MenuItem>
                </MenuList>
            </Menu>
        </Box>
    )
}

export default MenuComponent