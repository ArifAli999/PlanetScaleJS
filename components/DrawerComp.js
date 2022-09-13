import { EmailIcon, LinkIcon } from "@chakra-ui/icons";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightAddon, Stack, Text, Toast, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";
import config from '../dbconfig'
import { connect } from '@planetscale/database'
import { AiOutlineUser } from 'react-icons/ai'
import { Icon } from '@chakra-ui/react'
import useAuthStore from '../store/authStore'


function DrawerExample() {


    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const color = useColorModeValue('purple.600', 'purple.300')
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const toast = useToast()


    const { addUser, addUserDets } = useAuthStore();



    async function saveDetails() {


        validateCreds(email, password);
        onClose();
        setUsername('');
        setPassword('');
        setEmail('');
    }

    async function validateCreds(email, password) {

        if (!email && !password) {
            return (
                toast({
                    title: 'An error occurred.',
                    description: 'Please enter the details',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-left'
                })
            )
        }
        else if (!email) {
            return (
                toast({
                    title: 'An error occurred.',
                    description: 'Please enter the details',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-left'
                })
            )
        }
        else if (!password) {
            return (
                toast({
                    title: 'An error occurred.',
                    description: 'Please enter the details',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-left'
                })
            )
        }

        addToDb()





    }

    async function addToDb() {

        const conn = connect(config)
        const query = 'INSERT INTO User (`username`, `email`, `password`) VALUES (?, ?, ?)'
        const params = [username, email, password]

        const results = await conn.execute(query, params)
        console.log(results)
        if (results) {
            addUser({
                username: username,
                email: email,
                id: results.insertId
            })
            return (
                toast({
                    title: 'All done',
                    description: 'Glad to have you on board',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-left'
                }
                )

            )

        }

    }


    return (
        <>
            <Text ref={btnRef} color={color} fontSize={40} p={0} onClick={onOpen} display="flex" justifyContent="center"
                _hover={{
                    cursor: "pointer",
                    color: "purple.500",
                }}>

                +


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

                    <DrawerHeader display="flex" alignItems="center" justifyContent="space-between">
                        <Flex display="flex" alignItems="center" justifyContent="space-between">

                            <Text>Create your account</Text>
                            <DrawerCloseButton />
                        </Flex>
                    </DrawerHeader>

                    <DrawerBody p={4}>
                        <Stack spacing={4} >
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<Icon as={AiOutlineUser} color={color} />}
                                />
                                <Input placeholder='Username ' w='full'
                                    value={username} onChange={(event) => setUsername(event.target.value)} />
                            </InputGroup>

                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<EmailIcon color={color} />}
                                />
                                <Input placeholder='Email ' w='full'
                                    value={email} onChange={(event) => setEmail(event.target.value)} />
                            </InputGroup>

                            {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
                            <InputGroup >
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<LinkIcon color={color} />}
                                />
                                <Input type='text' placeholder='Password '
                                    value={password} onChange={(event) => setPassword(event.target.value)} />
                            </InputGroup>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='purple' onClick={saveDetails}>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default DrawerExample;