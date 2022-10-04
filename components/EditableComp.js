import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { ButtonGroup, Editable, EditableInput, EditablePreview, IconButton, Input, Tooltip, useColorModeValue, useEditableControls } from "@chakra-ui/react";

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
            <Tooltip label="Click to edit">
                <EditablePreview
                    py={2}
                    px={4}
                    _hover={{
                        background: useColorModeValue("gray.800", "gray.600")
                    }}
                    w='full'
                    border='1px solid '
                    borderColor='gray.400'
                />
            </Tooltip>
            <Input py={2} px={4} as={EditableInput} border='1px solid' />
            <EditableControls />
        </Editable>
    );
}

export default EditableComp;