import { Button, ButtonSpinner, Flex, FormControl, FormLabel, Input, Spacer } from '@chakra-ui/react'
import { connect } from '@planetscale/database/dist'
import React, { useState } from 'react'
import config from '../dbconfig'
import DrawerExample from './DrawerComp'
import ModalComp from './ModalComp'
import cuid from 'cuid';
import useAuthStore from '../store/authStore'


function GuestComp({ auth, setAuth }) {

    const { addUser, userProfile } = useAuthStore()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function loginFunction() {
        const conn = connect(config)
        const results = await conn.execute('SELECT * FROM User WHERE email=? AND password = ? ', [email, password])
        if (results.size === 0) {
            alert('failed')
        }
        else if (results.size === 1) {

            const brk = results.rows[0]
            console.log(brk)
            addUser(brk)



        }


    }

    function openDrawer() {

    }


    return (
        <Flex p={6} alignItems="" justifyContent="" direction='row' gap={10}>
            <DrawerExample />


            <Spacer />
            <ModalComp modalcont={[
                <FormControl display='flex' flexDirection='column'>
                    <FormLabel fontSize='xs' mb='2.5'>Email</FormLabel>
                    <Input mb={4} type='text' placeholder='Email or Username'
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormLabel fontSize='xs' mb='2.5'>Password</FormLabel>
                    <Input type='text' placeholder='Password'
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />

                </FormControl>
            ]} modaltit='Login' buttontit='Login'
                saveSettings={loginFunction}
            />
        </Flex>
    )
}

export default GuestComp