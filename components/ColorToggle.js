import { Button, Icon, useColorMode, Text, FormControl, FormLabel, Switch } from '@chakra-ui/react'
import React from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

function ColorToggle() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (


        <FormControl p={4} display='flex' alignItems='center' justifyContent='space-between' borderBottom='1px' borderColor='gray.600'>
            <FormLabel htmlFor='color-toggle' mb='0'>
                {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
            </FormLabel>
            <Switch id='color-toggle' colorScheme='purple' onChange={toggleColorMode} size='md' />
        </FormControl>



    )
}

export default ColorToggle