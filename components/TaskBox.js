import { Box, Grid, Stack, Text, Flex, GridItem, SimpleGrid, Button, IconButton, Icon, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, VStack } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import cuid from 'cuid';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import MenuComponent from './MenuComponent';
import NewTaskComp from './NewTaskComp';
import BoxModel from './BoxModel';


const itemsFrom = [
    { id: cuid(), content: 'First task', description: 'This is test descp 1' },
    { id: cuid(), content: 'Second task', description: 'This is test descp 10' },
    { id: cuid(), content: 'Fourth task', description: 'This is test descp 2' },
    { id: cuid(), content: 'Third task', description: 'This is test descp 3' },
    { id: cuid(), content: 'Fifth task', description: 'This is test descp 4' },
    { id: cuid(), content: 'Sixth task', description: 'This is test descp 5' },
]

const columnsFrom =
{
    Todo: {
        name: 'Todo',
        items: itemsFrom,
        pillColor: 'red.300'
    },
    Doing: {
        name: 'Doing',
        items: [],
        pillColor: 'yellow.400'
    },
    Done: {
        name: 'Done',
        items: [],
        pillColor: 'purple.400'
    }

}




const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;

    const { source, destination } = result

    if (source.droppableId != destination.droppableId) {
        const sourceColumn = columns[source.droppableId]
        const destColumn = columns[destination.droppableId]
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items]

        const [removed] = sourceItems.splice(source.index, 1)
        destItems.splice(destination.index, 0, removed)
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        })
    }
    else {
        const column = columns[source.droppableId];
        const copy = [...column.items]
        const [removed] = copy.splice(source.index, 1);
        copy.splice(destination.index, 0, removed)

        console.log(columns)
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...columns,
                items: copy,
                name: column.name,
                pillColor: column.pillColor
            }
        })
    }
}

function TaskBox({ titleText }) {

    const [columns, setColumns] = useState(columnsFrom)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        isOpen: isOpenBoxModel,
        onOpen: onOpenBoxModel,
        onClose: onCloseBoxModel
    } = useDisclosure()

    const [selected, setSelected] = useState('')
    const [selectedName, setSelectedName] = useState('');
    const [selectedDesc, setSelectedDesc] = useState('');


    /*    const handleModal = () => {
   
           onOpen()
   
       }
    */
    function openModal(id) {
        onOpen()
        console.log(id)
        setSelected(id)

    }

    function openBoxModal(id, name, desc) {
        onOpenBoxModel()
        setSelectedName(name)
        setSelectedDesc(desc)
        setSelected(id)

    }


    return (

        <DragDropContext
            onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
            <SimpleGrid width='full' height='full' p={2} direction='rows' spacing={6}
                columns={{ sm: 1, md: 3 }}>
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (

                        <GridItem
                            rowSpan={0} colSpan={1}
                            h='full'
                            key={columnId}

                        >



                            <Flex direction='column' width='100%' height='100%' gap={2} border='1px' borderRadius='md' borderTopRadius={'xl'} borderColor='gray.600' pt={2}>
                                <Box display='flex' alignItems='center' gap={2} justifyContent='space-between' p={2} >
                                    <Box display='flex' alignItems='center' gap={2} p={2}>
                                        <Box as='button' w='12px' h='12px' bg={column.pillColor} borderRadius='full' p={2}>
                                        </Box>

                                        <Text fontFamily='sans-serif' fontSize='base' fontWeight='semibold' color='gray.200' display='flex' alignItems='center' gap={2} >
                                            {columnId}
                                        </Text>


                                    </Box>


                                    <MenuComponent />

                                </Box>


                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {

                                        return (
                                            <Box
                                                w='full' p={4} pt={0} pb={4}
                                                {...provided.droppableProps}
                                                minHeight={{ sm: '250px' }}
                                                borderBottomRadius='md'
                                                ref={provided.innerRef}
                                                h='full'
                                                bg={snapshot.isDraggingOver
                                                    ? "gray.500"
                                                    : "gray.900"}

                                            >

                                                {column && column.items.map((m) => m).length > 0 ? column.items.map((item, index) => {

                                                    return (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={item.id}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => {
                                                                return (

                                                                    <>



                                                                        <Box bg={snapshot.isDragging ? "purple.300" : "gray.700"} p={4} mt={4} borderRadius='base' ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            onClick={() => openBoxModal(item.content, column.name, item.description)}
                                                                            boxShadow='md'
                                                                            _hover={{
                                                                                cursor: "pointer",
                                                                                background: "blackAlpha.300",
                                                                                animationDuration: 20,

                                                                            }}

                                                                            style={{
                                                                                userSelect: "none",
                                                                                color: "white",
                                                                                ...provided.draggableProps.style
                                                                            }}
                                                                            role="group">

                                                                            <Box spacing={2} display='flex' alignItems={'center'} >
                                                                                <Box flex={1}>
                                                                                    <Text color='whitesmoke' fontSize='md' fontWeight='medium'>
                                                                                        {item.content}
                                                                                        <BoxModel isOpen={isOpenBoxModel} onOpen={onOpenBoxModel} onClose={onCloseBoxModel} columnId={selectedName} content={item.content} key={item.id} selected={selected} desc={selectedDesc} />

                                                                                    </Text>
                                                                                    <Text color='gray.500' fontSize='sm' fontWeight='thin'>
                                                                                        {item && item.description}
                                                                                    </Text>
                                                                                </Box>

                                                                                <Icon as={BsThreeDots} style={{
                                                                                    userSelect: "none",
                                                                                    color: "purple.500",


                                                                                }}
                                                                                    visibility="hidden"
                                                                                    _groupHover={{ visibility: "visible", color: 'pink.500' }} />


                                                                            </Box>
                                                                        </Box>

                                                                    </>

                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                }

                                                ) : (
                                                    <Box p={4} mt={4} display='flex' justifyContent='center' alignItems='center'>
                                                        <Text color='gray.500' fontSize='xl' textTransform='uppercase' fontWeight='semibold' letterSpacing='1.22px'>Nothing here ye </Text>
                                                    </Box>
                                                )}



                                                <Box bg={"transparent"} p={2} mt={4} borderRadius='base'
                                                    border='1px' borderColor='gray.600'
                                                    onClick={() => openModal(column.name)}
                                                    boxShadow='md'
                                                    _hover={{
                                                        cursor: "pointer",
                                                        background: "blackAlpha.300",
                                                        animationDuration: 3000,

                                                    }}
                                                    style={{
                                                        userSelect: "none",
                                                        color: "white",

                                                    }}>

                                                    <Stack spacing={2} p={2}>
                                                        <Text color='whitesmoke' fontSize='md' fontWeight='medium' display='flex' alignItems='center' justifyContent='space-between'>
                                                            Add Task

                                                            <Icon as={AiOutlinePlus} />
                                                        </Text>

                                                    </Stack>
                                                    <NewTaskComp isOpen={isOpen} onOpen={onOpen} onClose={onClose} columnId={columnId} column={selected} />

                                                </Box>


                                                {provided.placeholder}
                                            </Box>
                                        );
                                    }}
                                </Droppable>
                            </Flex>
                        </GridItem>
                    );
                })}
            </SimpleGrid>
        </DragDropContext >

    )
}

export default TaskBox