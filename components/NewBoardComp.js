import { Container, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { TwitterPicker } from "@hello-pangea/color-picker";
import { SketchPicker } from 'react-color';


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


            <FormControl >
                <FormLabel fontSize='xs'>Board Color Theme</FormLabel>
                <Input
                    type='email'
                    value={theme}
                    readOnly
                    borderColor={theme}
                    onBlur={() => setPicker(false)}
                    onFocus={() => setPicker(true)}
                />
                {picker ? <TwitterPicker color={color} onChangeComplete={handleChangeComplete} /> : null}




            </FormControl>


            <FormControl >
                <FormLabel fontSize='xs'>Board Deadline</FormLabel>
                <Input
                    type='email'
                    value={input}
                    onChange={handleInputChange}
                />

                <FormHelperText fontSize='xs'>
                    Enter the email you'd like to receive the newsletter on.
                </FormHelperText>


            </FormControl>


            <FormControl >
                <FormLabel fontSize='xs'>Board Priority Level - {priority ? (
                    priority[0]) : 'Not SET'}
                </FormLabel>
                <RangeSlider defaultValue={[0, 100]} min={0} max={100} step={20} aria-label={['max']}
                    onChangeEnd={(val) => setPriority(val)}>
                    <RangeSliderTrack bg='purple.400'>
                        <RangeSliderFilledTrack bg='purple.100' />
                    </RangeSliderTrack>

                    <RangeSliderThumb boxSize={6} index={0} />
                </RangeSlider>




            </FormControl>

        </Stack>
    )
}

export default NewBoardComp