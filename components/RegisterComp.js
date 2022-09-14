import { Button, ButtonSpinner, Flex, FormControl, FormLabel, Icon, Input, InputGroup, InputLeftElement, InputRightElement, Spacer, Stack, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import { connect } from '@planetscale/database/dist'
import React, { useEffect, useState } from 'react'
import config from '../dbconfig'
import DrawerExample from './DrawerComp'
import ModalComp from './ModalComp'
import cuid from 'cuid';
import useAuthStore from '../store/authStore'
import { EmailIcon, LinkIcon } from '@chakra-ui/icons'
import { AiOutlineUser } from 'react-icons/ai'

function RegisterComp() {
    const color = useColorModeValue('purple.600', 'purple.300')
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const toast = useToast()
    const [auth, setAuth] = useState()
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)


    const { isOpen, onOpen, onClose } = useDisclosure()

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


        if (validateCreds(email, password) == 'good') {
            addToDb()
            setAuth(true)
            setUsername('');
            setPassword('');
            setEmail('');
        };
        onClose();

    }

    async function validateCreds(email, password) {

        if (!email && !password) {

            toast({
                title: 'An error occurred.',
                description: 'Please enter the details',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-left'
            })

            return 'nope'
        }
        else if (!email) {

            toast({
                title: 'An error occurred.',
                description: 'Please enter the details',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-left'
            })
            return 'nope'
        }
        else if (!password) {

            toast({
                title: 'An error occurred.',
                description: 'Please enter the details',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-left'
            })
            return 'nope'
        }

        else {
            addToDb()
            return 'good'
        }







    }

    async function addToDb() {


        const conn = connect(config)

        try {
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
        catch (err) {
            console.log(err)
        }





    }


    return (
        <ModalComp modalcont={[
            <FormControl display='flex' flexDirection='column' key='regform'>

                <Stack spacing={4} p={2} mt={0}>
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
                </Stack>

            </FormControl>
        ]} modaltit='Register' buttontit='Register' mainActiontitle='Register'
            saveSettings={saveDetails}

        />
    )
}

export default RegisterComp