import { Button, ButtonSpinner, Flex, FormControl, FormLabel, Icon, Input, InputGroup, InputLeftElement, InputRightElement, Spacer, Stack, useToast } from '@chakra-ui/react'
import { connect } from '@planetscale/database/dist'
import React, { useState } from 'react'
import config from '../dbconfig'
import DrawerExample from './DrawerComp'
import ModalComp from './ModalComp'
import cuid from 'cuid';
import useAuthStore from '../store/authStore'
import { EmailIcon } from '@chakra-ui/icons'
import { AiOutlineUser } from 'react-icons/ai'
import RegisterComp from './RegisterComp'


function GuestComp({ auth, setAuth }) {

    const { addUser, userProfile } = useAuthStore()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast()
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)


    async function loginFunction() {
        const conn = connect(config)
        const results = await conn.execute('SELECT * FROM User WHERE email=? AND password = ? ', [email, password])
        if (results.size === 0) {
            toast({
                title: 'Wrong credentials',
                description: 'Please check your details or sign up',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-left'
            }
            )
        }
        else if (results.size === 1) {

            const brk = results.rows[0]
            console.log(brk)
            addUser(brk)
            if (brk) {
                addUser({
                    username: brk.userName,
                    email: brk.email,
                    id: brk.id,
                })
                toast({
                    title: 'All done',
                    description: 'Glad to have you on board',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-left'
                }
                )


            }



        }


    }

    function openDrawer() {

    }


    return (
        <Flex p={6} alignItems="" justifyContent="" direction='row' gap={10}>
            <DrawerExample />


            <Spacer />


            <RegisterComp />


            <ModalComp modalcont={[
                <FormControl display='flex' flexDirection='column' s='userName'>
                    <FormLabel fontSize='xs' mb='2.5'>Email</FormLabel>
                    <Input mb={4} type='text' placeholder='Email or Username'
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormLabel fontSize='xs' mb='2.5'>Password</FormLabel>
                    <InputGroup>
                        <Input type={show ? 'text' : 'password'} placeholder='Password'
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>

                </FormControl>
            ]} modaltit='Login' buttontit='Login'
                saveSettings={loginFunction}
                mainActiontitle='Login'
            />
        </Flex>
    )
}

export default GuestComp