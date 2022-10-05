import React, { useState } from 'react'
import { Box, Grid, Stack, Text, Flex, GridItem, SimpleGrid, Button, IconButton, Icon, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Textarea, Divider, Container, Badge, useColorModeValue } from '@chakra-ui/react'
import EditableComp from './EditableComp';
import AccordionComp from './AccordionComp';
import { PopComp } from './PopComp';

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
            <ModalContent >
                <ModalCloseButton />
                <ModalHeader bg={"blackAlpha.300"}
                    _dark={{ bg: "blackAlpha.500" }} >
                    <Text>{selected} &nbsp;
                        <Badge variant='subtle' colorScheme='purple'> {columnId}</Badge>
                    </Text>




                </ModalHeader>
                <ModalBody w='full' p='0' >


                    <Stack spacing={4} w='full' p='0'>
                        <FormControl p={4}>
                            <FormLabel fontSize={'xs'} color='gray.400'>Card Description</FormLabel>
                            <EditableComp value={desc} />


                        </FormControl>

                        <Box>
                            <PopComp text='Label Settings' />
                        </Box>



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