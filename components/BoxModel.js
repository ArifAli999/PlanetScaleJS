import React, { useState } from 'react'
import { Box, Grid, Stack, Text, Flex, GridItem, SimpleGrid, Button, IconButton, Icon, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Textarea, Divider, Container, Badge } from '@chakra-ui/react'
import EditableComp from './EditableComp';

function BoxModel({ isOpen, onClose, onOpen, columnId, content, desc, selected }) {

    const [input, setInput] = useState();

    const [formInput, setFormInput] = useState({
        title: '',
        listID: columnId,

    })





    const isError = input === ''


    return (
        <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' size={'md'} >
            <ModalOverlay
                bg='blackAlpha.400'
                backdropFilter='hue-rotate(90deg)'
            />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader >
                    <Text>{selected} &nbsp;
                        <Badge variant='subtle' colorScheme='purple'> {columnId}</Badge>
                    </Text>




                </ModalHeader>
                <ModalBody>


                    <Stack spacing={4}>
                        <FormControl>
                            <FormLabel fontSize={'xs'} color='gray.400'>Card Description</FormLabel>
                            <EditableComp value={desc} />

                        </FormControl>



                    </Stack>

                </ModalBody>




                <ModalFooter display='flex' justifyContent='space-between' alignItems='center'>
                    <Button variant='solid' colorScheme='purple'>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default BoxModel