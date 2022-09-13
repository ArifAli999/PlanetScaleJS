import { EmailIcon, LinkIcon } from "@chakra-ui/icons";
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Grid, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightAddon, Stack, Text, Toast, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";
import config from '../dbconfig'
import { connect } from '@planetscale/database'
import { AiOutlineUser } from 'react-icons/ai'
import { Icon } from '@chakra-ui/react'
import useAuthStore from '../store/authStore'
import ColorToggle from "./ColorToggle";


function UserDrawer() {


    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const color = useColorModeValue('purple.600', 'purple.300')
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const toast = useToast()


    const { userProfile, addUserDets, addUser } = useAuthStore();
    console.log(userProfile)
    function logout() {
        addUser('')
    }





    return (
        <>
            <Text ref={btnRef} color={color} fontSize={40} p={0} onClick={onOpen} display="flex" justifyContent="center"
                _hover={{
                    cursor: "pointer",
                    color: "purple.500",
                }}>

                <Icon as={AiOutlineUser} w={8} h={8} />


            </Text>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                isFullHeight={true}
                size='sm'
            >
                <DrawerOverlay />
                <DrawerContent>

                    <Flex display="flex" alignItems="center" p={6} justifyContent="space-between">


                        <Text size={10} fontSize='lg'>Hello {userProfile.username}</Text>
                        <ColorToggle />


                    </Flex>

                    <DrawerBody p={4}>
                        <Stack spacing={4} >
                            <Box w='100%' p={4} border='1px' borderColor='gray.500' borderRadius={6}>
                                This is the Box
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='purple' onClick={logout}>Logout</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default UserDrawer;