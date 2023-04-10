import { 
    Button, 
    FormControl, 
    FormErrorMessage, 
    FormLabel, 
    Input,
    Textarea,
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalHeader, 
    ModalOverlay, 
    HStack} from "@chakra-ui/react"
import { Field, Form, Formik } from 'formik'

interface TaskForm {
    isOpen: boolean,
    onClose: () => void,
    tasks: any,
    setTasks: any
    onSubmit: (values: {taskName: string, taskDescription?: string, isDone: boolean}) => void
    btnName: string,
}

function TaskForm (properties: TaskForm) {

    function validateTaskName(value: string) {
        let error
        if (value === "" || !value) {
            error = 'Task Name is required!'
        }
        return error
    }
    return(
        <Modal isOpen={properties.isOpen} onClose={properties.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Formik
                        initialValues={{taskName: "", taskDescription: "", isDone: false}}
                        onSubmit={properties.onSubmit}
                        >
                        {(props) => (
                            <Form>
                                <Field name='taskName' validate={validateTaskName}>
                                    {({ field, form }: any) => (
                                        <FormControl mb={5} isInvalid={form.errors.taskName && form.touched.taskName}>
                                            <FormLabel>Task Name</FormLabel>
                                            <Input {...field} placeholder='"My new Task"'/>
                                            <FormErrorMessage>{form.errors.taskName}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='taskDescription'>
                                    {({ field, form }: any) => (
                                        <FormControl isInvalid={form.errors.name && form.touched.name}>
                                            <FormLabel>Task Description</FormLabel>
                                            <Textarea {...field} placeholder='This one is optional!' />
                                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <HStack mt={8} mb={4} spacing={2}>
                                    <Button 
                                        colorScheme="purple"
                                        type="submit">
                                            {properties.btnName}
                                    </Button>
                                    <Button 
                                        variant="outline"
                                        colorScheme="purple"
                                        onClick={properties.onClose}
                                        >
                                        Close
                                    </Button>
                                </HStack>
                            </Form>
                        )}
                        </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default TaskForm