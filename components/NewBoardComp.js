import { Box, Button, Container, FormControl, FormErrorMessage, FormHelperText, FormLabel, IconButton, Input, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { TwitterPicker } from "@hello-pangea/color-picker";



function NewBoardComp() {

    const [input, setInput] = useState('')
    const [priority, setPriority] = useState('')
    const [picker, setPicker] = useState(false)
    const [color, setColor] = useState('')
    const [theme, setTheme] = useState('')

    const handleInputChange = (e) => setInput(e.target.value)

    const handleChangeComplete = (color) => {
        setColor(color)
        console.log(color.hex)
        setTheme(color.hex)

    }

    const isError = input === ''



    return (
        <Stack spacing={4}>
            <FormControl isInvalid={isError}>
                <FormLabel fontSize='xs'>Board Name</FormLabel>
                <Input
                    type='email'
                    value={input}
                    onChange={handleInputChange}
                />
                {!isError ? (
                    <FormHelperText fontSize='xs'>
                        Enter the email you'd like to receive the newsletter on.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage fontSize='xs'>This field is required.</FormErrorMessage>
                )}
            </FormControl>

            <FormControl >
                <FormLabel fontSize='xs'>Board Description</FormLabel>
                <Input
                    type='email'
                    value={input}
                    onChange={handleInputChange}
                />



            </FormControl>


            <FormControl mb={0} >
                <FormLabel fontSize='xs'>Board Color Theme</FormLabel>
                <Input
                    type='email'
                    value={theme}
                    readOnly
                    borderColor={theme}

                    onFocus={() => setPicker(true)}
                />
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

                        <Box px={2.5} py={1.5} borderRadius='full' bg={priority[0] > 40 ? 'red.500' : 'green.400'} mr={-2} >{priority ? (
                            priority[0]) : 'Not SET'}</Box>
                    </Box>
                </FormLabel>
                <RangeSlider defaultValue={[0, 100]} min={0} max={100} step={20} aria-label={['max']}
                    onChangeEnd={(val) => setPriority(val)}>
                    <RangeSliderTrack bg='purple.400'>
                        <RangeSliderFilledTrack bg='purple.100' />
                    </RangeSliderTrack>

                    <RangeSliderThumb boxSize={5} index={0} />
                </RangeSlider>




            </Box>

        </Stack>
    )
}

export default NewBoardComp