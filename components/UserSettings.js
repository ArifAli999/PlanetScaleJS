import { Button, FormControl, FormHelperText, FormLabel, Input, Switch, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import ModalComp from './ModalComp'
import useAuthStore from '../store/authStore'

function UserSettings() {
    const { userProfile, addUser } = useAuthStore()
    const toast = useToast()
    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [err, setErr] = useState(false)
    console.log(userProfile)

    function saveSettings() {

        if (newName.length <= 0) {
            setErr(true)
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


        addUser({
            userName: newName,
            email: userProfile.email,
            id: userProfile.id,
        })



        setErr(false)
        // onClose()
        setNewName('');
        toast({
            title: 'Success',
            description: 'Your usernamme has been updated successfully',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-left'
        })

        return 'success'

    }

    function emailSettings() {
        if (newEmail.length <= 0) {
            setErr(true)
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

        addUser({
            userName: userProfile.userName,
            email: newEmail,
            id: userProfile.id,
        })

        setErr(false)

        setNewEmail('');
        toast({
            title: 'Success',
            description: 'Your email has been updated successfully',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-left'
        })

        return 'success'
    }

    function logOut() {
        addUser(null)
    }




    return (
        <>
            <FormControl p={4} display='flex' alignItems='center' justifyContent='space-between' borderBottom='1px' borderColor='gray.600'>
                <FormLabel htmlFor='password' mb='0'>
                    Edit Username
                </FormLabel>

                <ModalComp modalcont={[
                    <FormControl key='userNamed' isInvalid={err} display='flex' flexDirection='column'>
                        <FormLabel fontSize='xs' mb='2.5'>Got something new?</FormLabel>
                        <Input type='text' placeholder={userProfile && userProfile.username}
                            value={newName} onChange={(e) => setNewName(e.target.value)} />

                    </FormControl>
                ]} modaltit='Edit Username' newName={newName} setNewName={setNewName} err={err} setErr={setErr} saveSettings={saveSettings}
                    buttontit='Edit'
                    key='usernameModal'
                />


            </FormControl>


            <FormControl p={4} display='flex' alignItems='center' justifyContent='space-between' borderBottom='1px' borderColor='gray.600'>
                <FormLabel htmlFor='email' mb='0'>
                    Edit Email
                </FormLabel>

                <ModalComp modalcont={[
                    <FormControl key='emailed' isInvalid={err} display='flex' flexDirection='column'>
                        <FormLabel fontSize='xs' mb='2.5'>Enter new email</FormLabel>
                        <Input type='text' placeholder={userProfile && userProfile.email}
                            value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />

                    </FormControl>
                ]} modaltit='Edit Email'
                    key='emailModal'
                    newName={newEmail} setNewName={setNewEmail} err={err} setErr={setErr} saveSettings={emailSettings} buttontit='Edit'
                />


            </FormControl>

            <FormControl p={4} display='flex' alignItems='center' justifyContent='space-between' borderBottom='1px' borderColor='gray.600'>
                <FormLabel htmlFor='password' mb='0'>
                    Logout
                </FormLabel>

                <Button colorScheme='gray' size='sm' variant='outline' onClick={logOut}>Logout</Button>


            </FormControl>


        </>
    )
}

export default UserSettings