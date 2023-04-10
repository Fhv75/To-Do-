import { Box, Button, Grid, GridItem, Heading, useDisclosure, VStack } from "@chakra-ui/react"
import { AddIcon } from '@chakra-ui/icons'
import TaskCard from "../components/TaskCard"
import { useState } from "react"
import TaskForm from "../components/TaskForm"
import uuid from 'react-uuid';


function TodoList() {
    const [tasks, setTasks] = 
        useState<Array<{
            taskName: string, 
            taskDescription?: string, 
            isDone: boolean}>>
            (JSON.parse(localStorage.getItem("tasks")) || []);

    const [taskToEdit, setTaskToEdit] = useState<number>(-1)   

    const {isOpen: isNewOpen, onOpen: onNewOpen, onClose: onNewClose } = useDisclosure()
    const {isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()

    localStorage.setItem("tasks", JSON.stringify(tasks));

    return(
        <Box bg="gray.50" minH="100vh" h="100%">
            {/* Header */}
            <Grid placeItems="center" templateColumns="repeat(2, 1fr)" gap={6} p={8} bg="purple.600" color="white">
                <GridItem>
                    <Heading as='h1' size='xl'>To-Do!</Heading>
                </GridItem>
                <GridItem>
                    <Button colorScheme="blackAlpha" onClick={onNewOpen}> 
                        <AddIcon boxSize={3.5} mr={2}/>
                        New Task
                    </Button>
                </GridItem>
            </Grid>

            {/* Tasks */}
            <VStack spacing={4} my={8}>
                {tasks.map((element: {taskName: string, taskDescription?: string, isDone: boolean}, index: number) => {
                    return (
                            <TaskCard 
                                key={uuid()}
                                index={index}
                                taskName={element.taskName} 
                                taskDescription={element.taskDescription}
                                isDone={element.isDone}
                                deleteTask={() => {
                                    const newTasks: Array<{taskName: string, taskDescription?: string, isDone: boolean}> = [...tasks]
                                    newTasks.splice(index, 1)
                                    setTasks(newTasks)
                                }}
                                editTask={() => {
                                    setTaskToEdit(index)
                                    onEditOpen()
                                }}
                                setDone={() => {
                                    const newTasks =[...tasks]
                                    newTasks.at(index).isDone = !newTasks.at(index).isDone
                                    setTasks(newTasks)
                                }}
                            />
                    )
                })}  
            </VStack>

            {/* Modals */}
            <TaskForm 
                isOpen={isNewOpen}
                onClose={onNewClose}
                tasks={tasks}
                setTasks={setTasks}
                onSubmit={(values: {taskName: string, taskDescription?: string, isDone: boolean}) => {                            
                            const newTasks: any = [
                                ...tasks,
                                values
                            ]
                            setTasks(newTasks)
                            onNewClose()
                        }}
                btnName="Add New Task"
            />
            <TaskForm 
                isOpen={isEditOpen}
                onClose={onEditClose}
                tasks={tasks}
                setTasks={setTasks}
                onSubmit={(values: {taskName: string, taskDescription?: string, isDone: boolean}) => {                            
                            const newTasks = tasks
                            newTasks.at(taskToEdit).taskName = values.taskName
                            newTasks.at(taskToEdit).taskDescription = values.taskDescription
                            setTasks(newTasks)
                            setTaskToEdit(-1)
                            onEditClose()
                        }}
                btnName="Edit Task"
            />
        </Box>
    )
}

export default TodoList


