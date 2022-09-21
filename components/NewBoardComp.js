import { Box, Button, Container, FormControl, FormErrorMessage, FormHelperText, FormLabel, Icon, IconButton, Input, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { TwitterPicker } from "@hello-pangea/color-picker";
import useAuthStore from '../store/authStore';
import { connect } from '@planetscale/database/dist'
import cuid from 'cuid';
import config from '../dbconfig'
import ModalComp from './ModalComp';
import { AiOutlinePlus } from 'react-icons/ai';



function NewBoardComp() {

    const { userDetails, userProfile } = useAuthStore();
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [priority, setPriority] = useState('')
    const [picker, setPicker] = useState(false)
    const [color, setColor] = useState('')
    const [theme, setTheme] = useState('')
    const [formDetails, setFormDetails] = useState({
        boardName: '',
        boardDesc: '',
        boardColor: '',
        boardLevel: '',
    })

    const handleInputChange = (e) => setFormDetails({ ...formDetails, boardName: e.target.value })

    const handleChangeComplete = (color) => {
        setColor(color)
        setFormDetails({ ...formDetails, boardColor: color.hex })
        setTheme(color.hex)

    }

    const checkBg = (value) => {

        if (value <= 10) {
            return 'yellow.400'
        }
        else if (value <= 20) {
            return 'orange.400'
        }
        if (value <= 40) {
            return 'green.400'
        }
        if (value <= 60) {
            return 'red.300'
        }
        if (value <= 100) {
            return 'red.500'
        }
    }

    function saveDetails() {


        const conn = connect(config)

        try {

            if (formDetails.boardName && formDetails.boardDesc && formDetails.boardColor) {

                const query = 'INSERT INTO Boards (`boardId`, `boardName`, `boardAuthId`, `boardColor`, `boardDesc`, `boardLevel` ) VALUES (?,?,?,?,?,?)'
                const id = cuid()
                const params = [id, formDetails.boardName, userProfile.id, formDetails.boardColor, formDetails.boardDesc, formDetails.boardLevel[0]]

                const results = conn.execute(query, params).then((response) => {
                    console.log(response)
                    return 'success'



                })


                if (results) {

                    toast({
                        title: 'All done',
                        description: 'Board Created',
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                        position: 'top-left'
                    }
                    )


                    return 'success'
                }
            }
            else {
                return (
                    toast({
                        title: 'Oops',
                        description: 'Please fill the required fields to proceed',
                        status: 'warning',
                        duration: 9000,
                        isClosable: true,
                        position: 'top-left'
                    }
                    )
                )
            }





        }
        catch (err) {
            console.log(err)
        }






    }

    const isError = formDetails && formDetails.boardName.length < 3 || formDetails.boardColor === ''



    return (
        <ModalComp modalcont={[
            <Stack spacing={4} mb={4}>
                <FormControl isInvalid={isError}>
                    <FormLabel fontSize='xs'>Board Name</FormLabel>
                    <Input
                        type='email'
                        value={formDetails.boardName}
                        onChange={handleInputChange}
                    />
                    {!isError ? (
                        <FormHelperText fontSize='xs'>
                            The name of the board
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage fontSize='xs'>This field is required.</FormErrorMessage>
                    )}
                </FormControl>

                <FormControl >
                    <FormLabel fontSize='xs'>Board Description</FormLabel>
                    <Input
                        type='text'
                        value={formDetails.boardDesc}
                        onChange={(e) => setFormDetails({ ...formDetails, boardDesc: e.target.value })}
                    />



                </FormControl>


                <FormControl mb={0} isInvalid={isError} >
                    <FormLabel fontSize='xs'>Board Color Theme</FormLabel>
                    <Input
                        type='email'
                        value={theme}
                        readOnly
                        borderColor={theme}

                        onFocus={() => setPicker(true)}
                    />
                    {!isError ? (
                        <FormHelperText fontSize='xs'>
                            The color theme for your board
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage fontSize='xs'>This field is required.</FormErrorMessage>
                    )}
                    {picker ? <TwitterPicker color={color} onChange={handleChangeComplete}
                        onChangeComplete={() => setPicker(false)} /> : null}




                </FormControl>






                <Box p={0} pt={4}>
                    <FormLabel fontSize='xs'
                    >
                        <Box display='flex' alignItems='center' justifyContent='space-between' gap={4}>
                            <Text>
                                Board Priority Level -
                            </Text>

                            <Box px={2.5} py={1.5} borderRadius='full' bg={checkBg(priority[0])} mr={-2} >{priority ? (
                                priority[0]) : 'Not SET'}</Box>
                        </Box>
                    </FormLabel>
                    <RangeSlider defaultValue={[0, 100]} min={0} max={100} step={20} aria-label={['max']}
                        onChangeEnd={(val) => { setPriority(val); setFormDetails({ ...formDetails, boardLevel: val }) }}>
                        <RangeSliderTrack bg='purple.400'>
                            <RangeSliderFilledTrack bg='purple.100' />
                        </RangeSliderTrack>

                        <RangeSliderThumb boxSize={5} index={0} />
                    </RangeSlider>




                </Box>


            </Stack>


        ]} modaltit='New Board'
            buttontit={[

                <Box display='flex' alignItems='center' justifyContent='space-between' gap={2}>
                    <Text>Create</Text>
                    <Icon as={AiOutlinePlus} />
                </Box>

            ]}
            key='NewBoard'
            ModalFooter='true'
            saveSettings={saveDetails}


        />
    )
}

export default NewBoardComp