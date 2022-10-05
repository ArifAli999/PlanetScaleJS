import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { ButtonGroup, Editable, EditableInput, EditablePreview, Icon, IconButton, Input, InputGroup, InputRightAddon, InputRightElement, Tooltip, useColorModeValue, useEditableControls } from "@chakra-ui/react";
import { AiFillAlert } from 'react-icons/ai'
function EditableComp({ value }) {
    /* Here's a custom control */
    function EditableControls() {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps
        } = useEditableControls();

        return isEditing ? (
            <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
                <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} color='green.300' />
                <IconButton
                    icon={<CloseIcon boxSize={3} />}
                    {...getCancelButtonProps()}
                    color='red.300'
                />
            </ButtonGroup>
        ) : null;
    }

    return (
        <Editable
            defaultValue={value}
            isPreviewFocusable={true}
            selectAllOnFocus={false}
        >

            <EditablePreview
                py={2}
                px={4}
                _hover={{
                    background: 'gray.500'
                }}
                w='full'
                border='1px solid '
                borderColor='gray.400'

            >

                <CheckIcon color='green.500' />


            </EditablePreview>
            <InputGroup>
                <Input py={2} px={4} as={EditableInput} border='1px solid' />
            </InputGroup>
            <EditableControls />
        </Editable>
    );
}

export default EditableComp;