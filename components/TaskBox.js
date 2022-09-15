import { Box, Grid, Stack, Text, Flex, GridItem, SimpleGrid } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import cuid from 'cuid';


const itemsFrom = [
    { id: cuid(), content: 'First task' },
    { id: cuid(), content: 'Second task' },
    { id: cuid(), content: 'Fourth task' },
    { id: cuid(), content: 'Third task' },
    { id: cuid(), content: 'Fifth task' },
    { id: cuid(), content: 'Sixth task' },
]

const columnsFrom =
{
    [cuid()]: {
        name: 'TODO',
        items: itemsFrom,
        pillColor: '#fff'
    },
    [cuid()]: {
        name: 'DOING',
        items: [],
        pillColor: 'yellow.400'
    },
    [cuid()]: {
        name: 'DONE',
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
        console.log(columns)
    }
    else {
        const column = columns[source.droppableId];
        const copy = [...column.items]
        const [removed] = copy.splice(source.index, 1);
        copy.splice(destination.index, 0, removed)
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...columns,
                items: copy
            }
        })
    }



}

function TaskBox({ titleText }) {

    const [columns, setColumns] = useState(columnsFrom)







    return (

        <DragDropContext
            onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
            <SimpleGrid width='full' height='full' p={4} direction='rows' spacing={2}
                columns={{ sm: 1, md: 3 }}>
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <GridItem
                            rowSpan={0} colSpan={1}
                            h='full'
                            key={columnId}
                        >



                            <Flex direction='column' width='100%' height='100%' gap={4}>
                                <Text fontFamily='sans-serif' fontSize='sm' fontWeight='semibold' color='gray.500' display='flex' alignItems='center' gap={2} >
                                    <Box as='button' w='12px' h='12px' bg='purple.400' borderRadius='full' p={2}></Box>
                                    {column.name}
                                </Text>

                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <Box
                                                w='full' p={6} borderRight={{ sm: '0px', md: '1px' }} borderRightColor={{ sm: 'transparent', md: 'gray.700' }}
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                h='full'
                                                bg={snapshot.isDraggingOver
                                                    ? "gray.500"
                                                    : "blackAlpha.500"}
                                                style={{

                                                    padding: 10,




                                                }}
                                            >
                                                {provided.placeholder}
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={item.id}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => {
                                                                return (



                                                                    <Box bg={snapshot.isDragging ? "purple.300" : "gray.700"} p={4} mt={4} borderRadius='base' ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        boxShadow='md'
                                                                        style={{
                                                                            userSelect: "none",
                                                                            color: "white",
                                                                            ...provided.draggableProps.style
                                                                        }}>
                                                                        <Stack spacing={2} >
                                                                            <Text color='whitesmoke' fontSize='md' fontWeight='medium'>
                                                                                {item.content}
                                                                            </Text>
                                                                            <Text color='gray.500' fontSize='sm' fontWeight='thin'>
                                                                                4 subtasks (2 completed)
                                                                            </Text>
                                                                        </Stack>
                                                                    </Box>



                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                })}
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
        </DragDropContext>

    )
}

export default TaskBox