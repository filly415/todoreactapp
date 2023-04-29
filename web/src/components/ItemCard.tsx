import React, { useEffect, useState } from "react";
import {
    Box,
    Text,
    IconButton,
    useColorMode,
    Checkbox,
    useToast
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
// Types
import { Task } from "../interfaces/Task";

import TodoModal from "./TodoModal";
import { AXIOS } from "../config/config";

const ItemCard = ({ task, handleTasks }: any) => {
    const { colorMode } = useColorMode();
    const toast = useToast();
    const [modalOpen, setModalOpen] = useState<Boolean>(false);
    const [selectedTask, setSelectedTask] = useState<Task>();
    const [selectedComplete, setSelectedComplete] = useState<boolean>(false);
    const closeModal = () => {
        setModalOpen(false);
    }

    const handleUpdate = (task: Task) => {
        setModalOpen(true);
        setSelectedTask(task);
        setSelectedComplete(task.completed ? true : false);
    }

    const handleStatus = async () => {
        setSelectedComplete(!selectedComplete);
        const data = {
            ...task,
            completed: !selectedComplete ? 1 : 0,            
        }

        await AXIOS.put("/update", data).then((res) => {
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
    }

    useEffect(() => {
        if (Number(task.completed) === 1) {
            setSelectedComplete(true);
        } else {
            setSelectedComplete(false);
        }
    }, [task])

    return (        
        <Box 
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            gap={5}
            p={5}
            bg={colorMode === "dark" ? "blackAlpha.800" : "white"}
            borderRadius={10}
        >
            <Checkbox 
                colorScheme='green' 
                isChecked={selectedComplete ? true : false} 
                size={'lg'}
                onChange={handleStatus}
            />
            <Box flexGrow={1}>
                <Text
                    color={colorMode === "dark" ? "white" : "black"}
                    as={task.completed ? "del" : "samp"}
                >
                    {task.name}
                </Text>
            </Box>
            <IconButton 
                aria-label='Edit button'
                icon={<FaEdit />}
                size={'sm'}
                colorScheme={colorMode === "dark" ? "blue" : "pink"}
                _hover={{ boxShadow: colorMode === "light" ? '0px 3px 10px 2px rgba(0, 0, 0, 0.5)' : '0px 3px 10px 2px rgba(255, 255, 255, 0.5)' }}
                onClick={() => handleUpdate(task)}
            />
            <TodoModal type={'edit'} isOpen={modalOpen} closeModal={closeModal} task={selectedTask} handleTasks={handleTasks} />
        </Box>
    )
}

export default ItemCard;