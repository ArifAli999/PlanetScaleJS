import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React from 'react'
import useAuthStore from '../store/authStore'

function ModalComp({ modalcont, modaltit, newName, setNewName, err, setErr, saveSettings, buttontit }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const { userProfile, addUser } = useAuthStore()

    function executeCall() {
        if (saveSettings() === 'success') {
            onClose()
        }
    }



    return (
        <><Button colorScheme='gray' size='sm' variant='outline' onClick={onOpen}>{buttontit}</Button>
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
                        <Button variant='solid' colorScheme='purple' onClick={executeCall}>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal></>
    )
}

export default ModalComp