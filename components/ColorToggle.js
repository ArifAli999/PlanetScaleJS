import { Button, Icon, useColorMode, Text } from '@chakra-ui/react'
import React from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

function ColorToggle() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <header>
            <Text onClick={toggleColorMode}
                _hover={{
                    cursor: "pointer",
                    border: "purple.500",
                }}>
                {colorMode === 'light' ? <Icon as={MdDarkMode} w={6} h={6} /> : <Icon as={MdLightMode} w={6} h={6} />}
            </Text>
        </header>
    )
}

export default ColorToggle