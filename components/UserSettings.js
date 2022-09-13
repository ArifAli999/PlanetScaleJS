import { Button, FormControl, FormHelperText, FormLabel, Input, Switch, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import ModalComp from './ModalComp'
import useAuthStore from '../store/authStore'

function UserSettings() {
    const { userProfile } = useAuthStore()

    const [newName, setNewName] = useState('')
    const [err, setErr] = useState(false)







    return (
        <>
            <FormControl p={4} display='flex' alignItems='center' justifyContent='space-between' borderBottom='1px' borderColor='gray.600'>
                <FormLabel htmlFor='password' mb='0'>
                    Edit Username
                </FormLabel>

                <ModalComp modalcont={[
                    <FormControl isInvalid={err} display='flex' flexDirection='column'>
                        <FormLabel fontSize='xs' mb='2.5'>Got something new?</FormLabel>
                        <Input type='text' placeholder={userProfile && userProfile.username}
                            value={newName} onChange={(e) => setNewName(e.target.value)} />

                    </FormControl>
                ]} modaltit='Edit Username' newName={newName} setNewName={setNewName} err={err} setErr={setErr} />


            </FormControl>


            <FormControl p={4} display='flex' alignItems='center' justifyContent='space-between' borderBottom='1px' borderColor='gray.600'>
                <FormLabel htmlFor='' mb='0'>
                    Edit Username
                </FormLabel>
                <Button colorScheme='gray' size='sm' variant='outline' >Edit</Button>
            </FormControl>


        </>
    )
}

export default UserSettings