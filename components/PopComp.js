import { Box, Button, ButtonGroup, Icon, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { AiOutlineArrowRight, AiOutlineRight, AiOutlineUserAdd } from 'react-icons/ai'

export const PopComp = ({ text }) => {
    const initialFocusRef = useRef()
    return (


        <Popover
            initialFocusRef={initialFocusRef}
            placement='bottom'
            closeOnBlur={false}
            style={{
                cursor: 'pointer',
            }}
        >
            <PopoverTrigger style={{
                cursor: 'pointer',
            }}>
                <Box p={2.5} borderTop='1px' borderBottom='1px' borderColor={useColorModeValue('gray.300', 'gray.500')}
                    display='flex' alignItems='center' justifyContent='space-between' w='full' cursor={'pointer'}
                    _hover={{
                        cursor: "pointer",
                        background: `${useColorModeValue('gray.300', 'blackAlpha.500')}`,
                        animationDuration: 20,

                    }}
                >
                    <Text fontSize={'md'}>{text}</Text>
                    <Icon as={AiOutlineArrowRight} w={6} h={6} color={useColorModeValue('purple.600', 'purple.500')} />
                </Box>

            </PopoverTrigger>
            <PopoverContent color='white' bg='gray.800' borderColor='gray.600'>
                <PopoverHeader pt={4} fontWeight='bold' border='0'>
                    Manage Your Channels
                </PopoverHeader>
                <PopoverArrow bg={'#1a202c'} />
                <PopoverCloseButton />
                <PopoverBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore.
                </PopoverBody>
                <PopoverFooter
                    border='0'
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    pb={4}
                >
                    <Box fontSize='sm'>Step 2 of 4</Box>
                    <ButtonGroup size='sm'>
                        <Button colorScheme='green'>Setup Email</Button>
                        <Button colorScheme='blue' ref={initialFocusRef}>
                            Next
                        </Button>
                    </ButtonGroup>
                </PopoverFooter>
            </PopoverContent>
        </Popover>


    )
}
