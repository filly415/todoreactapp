import React, { useState, useEffect } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    useColorMode,
    useToast
} from "@chakra-ui/react";
import { AXIOS } from '../config/config';


function TodoModal({ type, isOpen, closeModal, task, handleTasks }: any) {
    const { colorMode } = useColorMode();
    const toast = useToast();
    const [status, setStatus] = useState<string>('incomplete');
    const [completed, setCompleted] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const handleSubmit = async () => {
        if (name && status) {
            if (type === "add") {
                closeModal();
                const todo = {
                    name: name,
                    completed: status === "complete" ? 1 : 0,
                };
                await AXIOS.post("/create", todo).then((res) => {
                    if (res.status === 200) {
                        handleTasks(res.data.updateTasks);
                        setName('');
                        setStatus('incomplete')
                        toast({
                            title: 'Add Task',
                            description: 'Successfully Add.',
                            status: 'success',
                            position: 'top-right',
                            duration: 1500
                        })
                    }
                })
            }
            if (type === "edit") {
                closeModal();
                if (task.name !== name || task.completed !== completed) {
                    const todo = {
                        id: task.id,
                        name: name,
                        completed: status === "complete" ? 1 : 0,
                    };
                    if (name !== "") {
                        await AXIOS.put("/update", todo).then((res) => {
                            if (res.status === 200) {
                                handleTasks(res.data.updateTasks);
                                toast({
                                    title: 'Update Task',
                                    description: 'Updated successfully!',
                                    status: 'success',
                                    position: 'top-right',
                                    duration: 1500
                                })
                            }
                        })
                    } else {
                        toast({
                            title: 'Update Task',
                            description: 'Please enter a Task.',
                            status: 'error',
                            position: 'top-right',
                            duration: 1500
                        })
                    }

               }
            }
        } else {
            toast({
                title: `${type === "add" ? "Add" : "Update"} Task`,
                description: 'Please input the name of task.',
                status: 'error',
                position: 'top-right',
                duration: 1500
            })
        }
        
    };

    const handleStatus = (e: any) => {
        setStatus(e.target.value);
        {e.target.value === "complete" ? setCompleted(1) : setCompleted(0)}                
    };

    useEffect(() => {
        if (task) {
            { task.completed === 1 ? setStatus('complete') : setStatus('incomplete'); }
            setName(task.name);
        }
    }, [task]);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {type === "add" ? 'Add' : 'Edit'} Task
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input
                                placeholder="i.e Do homework"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Status</FormLabel>
                            <Select
                                bgColor={colorMode === "dark" ? "blackAlpha.100" : "#cccdde"}
                                color={colorMode === "dark" ? "white" : "black"}
                                value={status}
                                onChange={handleStatus}
                            >
                                <option value={'incomplete'}>Incomplete</option>
                                <option value={'complete'}>Complete</option>
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => handleSubmit()}
                        >
                            {type === "add" ? 'Save' : 'Update'}
                        </Button>
                        <Button onClick={closeModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default TodoModal;
