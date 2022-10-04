import React, { useState } from 'react'
import { Box, Grid, Stack, Text, Flex, GridItem, SimpleGrid, Button, IconButton, Icon, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Textarea } from '@chakra-ui/react'

function NewTaskComp({ isOpen, onClose, onOpen, columnId, column }) {

    const [input, setInput] = useState();

    const [formInput, setFormInput] = useState({
        title: '',
        listID: columnId,


    })





    const isError = input === ''


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader display='flex' justifyContent='space-between' alignItems='center'>
                    <Text>Add Task</Text>


                </ModalHeader>
                <ModalBody>

                    <Stack spacing={3} >
                        <FormControl >
                            <FormLabel fontSize='xs'>Task Title</FormLabel>
                            <Input
                                type='email'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}

                            />

                        </FormControl>



                        <FormControl>
                            <FormLabel fontSize='xs'>Task Description</FormLabel>
                            <Textarea
                                type='desciption'


                            />

                        </FormControl>


                    </Stack>

                </ModalBody>




                <ModalFooter display='flex' justifyContent='space-between' alignItems='center'>
                    <Text mt={2} border='1px' borderColor='red.300' px={2} py={0.5} borderRadius='md' textTransform='unset'> {column}</Text>
                    <Button variant='solid' colorScheme='purple'>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default NewTaskComp