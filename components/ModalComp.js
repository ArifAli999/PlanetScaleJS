import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React from 'react'
import useAuthStore from '../store/authStore'

function ModalComp({ modalcont, modaltit, newName, setNewName, err, setErr }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const { userProfile, addUser } = useAuthStore()



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
            username: newName,
            email: userProfile.email,
            id: userProfile.id,
        })
        console.log(userProfile)
        setErr(false)
        onClose()
        setNewName('');


    }

    return (
        <><Button colorScheme='gray' size='sm' variant='outline' onClick={onOpen}>Edit</Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modaltit}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        {modalcont}


                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='solid' colorScheme='purple' onClick={saveSettings}>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal></>
    )
}

export default ModalComp