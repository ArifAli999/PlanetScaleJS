import { EmailIcon, LinkIcon } from "@chakra-ui/icons";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightAddon, InputRightElement, Stack, Switch, Text, Toast, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import config from '../dbconfig'
import { connect } from '@planetscale/database'
import { AiOutlineClose, AiOutlinePlus, AiOutlineUser } from 'react-icons/ai'
import { Icon } from '@chakra-ui/react'
import useAuthStore from '../store/authStore'
import UserDrawer from "./UserDrawer";
import ColorToggle from "./ColorToggle";
import UserSettings from "./UserSettings";
import cuid from 'cuid';



function DrawerExample({ open }) {


    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const color = useColorModeValue('purple.600', 'purple.300')
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const toast = useToast()
    const [auth, setAuth] = useState()
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const { addUser, addUserDets, userProfile } = useAuthStore();


    useEffect(() => {
        if (open === true) {
            onOpen()

        }
    }, [open])




    useEffect(() => {
        if (userProfile) {
            setAuth(true)
            console.log('user exists')
        }

        if (!userProfile) {
            setAuth(false)
        }



    }, [userProfile])


    async function saveDetails() {


        validateCreds(email, password);
        onClose();
        setAuth(true)
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

        const query = 'INSERT INTO User (`id`,`username`, `email`, `password`) VALUES (?, ?, ?, ?)'
        const id = cuid()
        const params = [id, username, email, password]

        const results = await conn.execute(query, params)

        const sec = await conn.execute('SELECT * from User WHERE email = ? AND password = ?', [email, password])
        console.log(sec)
        if (sec) {
            addUser({
                username: username,
                email: email,
                id: sec.rows.map((m) => m.id).toString()
            })
            console.log(userProfile)
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



            <Text ref={btnRef} size='lg' color={color} p={0} onClick={onOpen}
                w='100px'
                _hover={{
                    cursor: "pointer",
                    color: "purple.500",
                }} >
                {auth ? <Icon w={9} h={9} as={AiOutlineUser} /> : <Icon as={AiOutlinePlus} w={9} h={9} />}
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

                    <DrawerHeader display="flex" alignItems="center" justifyContent="space-between" borderBottom='1px' borderColor='gray.500'>


                        <Text >
                            {auth ? 'Account Settings' : 'Create your account'}


                        </Text>
                        <Icon as={AiOutlineClose} onClick={onClose} w={6} h={6} _hover={{
                            cursor: "pointer",
                            color: "purple.500",
                        }} />


                    </DrawerHeader>

                    <DrawerBody p={0}>
                        <Stack spacing={0} p={0}>

                            {auth ? (
                                <>
                                    <ColorToggle />
                                    <UserSettings />



                                </>
                            ) : (<Stack spacing={4} p={4} mt={4}>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                    >

                                        <Icon as={AiOutlineUser} color={color} />
                                    </InputLeftElement>
                                    <Input placeholder='Username ' w='full'
                                        value={username} onChange={(event) => setUsername(event.target.value)} />
                                </InputGroup>

                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                    >
                                        <EmailIcon color={color} />
                                    </InputLeftElement>
                                    <Input placeholder='Email ' w='full'
                                        value={email} onChange={(event) => setEmail(event.target.value)} />
                                </InputGroup>

                                {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                    >
                                        <LinkIcon color={color} />
                                    </InputLeftElement>
                                    <Input type={show ? 'text' : 'password'} placeholder='Password '
                                        value={password} onChange={(event) => setPassword(event.target.value)} />
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                                            {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </Stack>)}

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