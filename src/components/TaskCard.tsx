import { EditIcon, DeleteIcon, ChevronDownIcon } from "@chakra-ui/icons"
import {Box, Text, Card, CardBody, Grid, GridItem, Checkbox, Heading, Divider, Collapse, useDisclosure, ScaleFade } from "@chakra-ui/react"
import React, { useState } from "react"
import CardButton from "./CardButton"

interface TaskCardProps {
    key?: React.Key,
    index: number,
    taskName: string,
    taskDescription?: string
    isDone: boolean,
    deleteTask: () => void,
    editTask: () => void,
    setDone: () => void,
}

function TaskCard(props: TaskCardProps) {
    const {isOpen, onToggle} = useDisclosure()
    const togglerDisplay = !props.taskDescription ? "none" : "inline-block"

    const item = {
        hidden: { opacity: 0, scale: 0.5 },
        show: {
            opacity: 1,
            scale: 1,
            transition: {
            duration: 0.2,
            ease: "easeOut",
            },
        },
        exit: {
            opacity: 0,
            scale: 0.5,
            transition: {
            duration: 0.2,
            ease: "easeOut",
            },
        },
    }


    return (
        <ScaleFade initialScale={0.5} in={true}>
            <Card 
                mx={"auto"} 
                minW={{ xl: 1080, lg: 990, md: 760, sm: 470, base: 400 }}
            >
                <CardBody>
                    <Grid templateColumns="repeat(2, 1fr)">
                        {/* Task Name */}
                        <GridItem my="auto">
                            <Checkbox colorScheme={"purple"} onChange={props.setDone}>
                                <Heading 
                                    size="sm" 
                                    textTransform="uppercase" 
                                    mb={1} 
                                    ms={2} 
                                    style={
                                        props.isDone ? 
                                        {
                                            textDecoration: "line-through",
                                            color: "#A0AEC0",
                                        } 
                                        : {}
                                }>
                                    {props.taskName}
                                </Heading>
                            </Checkbox>
                        </GridItem>

                        {/* Buttons */}
                        <GridItem textAlign="right">
                            <CardButton 
                                onClick={props.editTask} 
                                icon={<EditIcon />}
                            />
                            <CardButton 
                                onClick={props.deleteTask} 
                                icon={<DeleteIcon />}
                            />
                            <CardButton 
                                onClick={onToggle} 
                                icon={<ChevronDownIcon />}
                                display={togglerDisplay}
                            />
                        </GridItem>
                    </Grid>

                    {/* Task Description */}
                    <Collapse in={isOpen} animateOpacity>
                            <Divider pt={3} />
                            <Text 
                                pt={4} 
                                mx={10} 
                                color={"gray"} 
                                style={
                                    props.isDone ? 
                                    {
                                        textDecoration: "line-through",
                                        color: "#A0AEC0"
                                    } : 
                                    {}
                                }>
                                {props.taskDescription}
                            </Text>
                    </Collapse>
                </CardBody>
            </Card>
        </ScaleFade>
    )
}

export default TaskCard

