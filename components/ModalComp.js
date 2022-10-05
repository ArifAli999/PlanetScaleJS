import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import useAuthStore from '../store/authStore'

function ModalComp({ modalcont, modaltit, newName, setNewName, err, setErr, saveSettings, buttontit, mainActiontitle, ModalFooter }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const { userProfile, addUser } = useAuthStore()

    function executeCall() {
        if (saveSettings() === 'success') {
            onClose()
        }
    }

    useEffect(() => {
        if (ModalFooter == undefined) {
            ModalFooter = 'true'
        }
    }, [ModalFooter])




    return (
        <><Button colorScheme={useColorModeValue('pink', 'gray')} size='sm' variant={useColorModeValue('outline', 'outline')} onClick={onOpen}>{buttontit}</Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modaltit}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        {modalcont}


                    </ModalBody>

                    <ModalFooter>

                        {ModalFooter == 'true' ? (<Box p={4} display='flex ' justifyContent='flex-end'>
                            <Button variant='ghost' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant='solid' colorScheme='purple' onClick={executeCall}>{mainActiontitle ? mainActiontitle : 'Save'}</Button></Box>) : null}

                    </ModalFooter>
                </ModalContent>
            </Modal></>
    )
}

export default ModalComp