import { ChevronDownIcon, EmailIcon, LinkIcon } from "@chakra-ui/icons";
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormControl, FormLabel, IconButton, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightAddon, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Stack, Switch, Text, Toast, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
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
import { MdBuild } from "react-icons/md";
import ModalComp from "./ModalComp";
import NewBoardComp from "./NewBoardComp";



function DrawerExample({ open }) {


    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const color = useColorModeValue('purple.600', 'purple.300')
    const iconcolors = useColorModeValue('gray.400', 'gray.800')

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const toast = useToast()
    const [auth, setAuth] = useState()
    const [show, setShow] = useState(false)
    const [boards, setBoards] = useState('')

    const handleClick = () => setShow(!show)

    const { addUser, addUserDets, userProfile } = useAuthStore();







    useEffect(() => {
        if (userProfile) {
            setAuth(true)

            fetchData()

        }

        if (!userProfile) {
            setAuth(false)
        }



    }, [userProfile])


    async function fetchData() {
        const conn = connect(config)
        const sec = await conn.execute('SELECT Boards.boardId, Boards.boardName,Boards.updatedAt from User, Boards WHERE User.id = Boards.boardAuthId AND User.id = ?', [userProfile.id])
        console.log(sec.rows)
        return setBoards(sec.rows)


    }

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

        if (sec) {
            addUser({
                username: username,
                email: email,
                id: sec.rows.map((m) => m.id).toString()
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
            {auth ? (
                <Box borderBottom='0px' borderBottomColor='gray.700' bg='blackAlpha.600' borderTopRadius={10}>
                    <Flex justifyContent='space-between' alignItems='center' p={6}>

                        <Menu isLazy>
                            <MenuButton border='1px' borderColor='gray.500' p={1.5} borderRadius='md'>{boards && boards.length > 0 ?
                                boards.slice(0, 1).map((m) => (
                                    <Text key={m.boardID} > {m.boardName} <ChevronDownIcon /></Text>
                                ))
                                : 'Dashboard'}</MenuButton>
                            <MenuList>
                                {boards && boards.length > 0 ? (

                                    boards.slice(1).map((m) => (

                                        <MenuItem key={m.boardName}>{m.boardName}</MenuItem>

                                    ))) : null}

                            </MenuList>
                        </Menu>



                        <Stack spacing={4} direction='row' display='flex' alignItems='center'>

                            <NewBoardComp />





                            <IconButton
                                bg={iconcolors}
                                aria-label='Call Segun'
                                borderRadius='full'
                                ref={btnRef}
                                onClick={onOpen}
                                icon={<AiOutlineUser />}
                                _hover={{
                                    cursor: "pointer",
                                    color: "purple.400",
                                }}
                            />




                        </Stack>
                    </Flex>





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
                                    ) : null}

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

                </Box>
            ) : null}
        </>

    )
}

export default DrawerExample;