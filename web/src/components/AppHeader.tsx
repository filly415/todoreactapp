import React, { useState } from "react";
import {
    Button,
    Box,
    useColorMode
} from "@chakra-ui/react";
import { FaPlus, FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import TodoModal from "./TodoModal";
import { AXIOS } from "../config/config";

const AppHeader = ({ handleTasks }:any) => {
    const { colorMode } = useColorMode();
    const [modalOpen, setModalOpen] = useState<Boolean>(false);
    const [orderStatus, setOrderStatus] = useState<string>('asc');
    const closeModal = () => {
        setModalOpen(false);
    }

    const handleOrder = async () => {
        if (orderStatus === "asc") {
            setOrderStatus("desc");
        } else {
            setOrderStatus("asc");
        }
        const data = {
            orderStatus,
        }
        await AXIOS.post('/order', data).then((res) => {
            if (res.status === 200) {
                handleTasks(res.data.updateTasks)
            }
        })
    }

    return (
        <Box display={'flex'} justifyContent={'space-between'} height={'60px'} alignItems={'center'} width={'100%'} gap={30}>
            <Button 
                colorScheme={colorMode === "dark" ? "blue" : "pink"}
                color={colorMode === 'dark' ? 'black' : 'white'}
                leftIcon={<FaPlus size={15} />}
                p={5}
                _hover={{ boxShadow: colorMode === "light" ? '0px 3px 10px 2px rgba(0, 0, 0, 0.5)' : '0px 3px 10px 2px rgba(255, 255, 255, 0.5)' }}
                onClick={() => setModalOpen(true)}
            >
                Add Task
            </Button>
            <Button 
                colorScheme={colorMode === "dark" ? "blue" : "pink"}
                color={colorMode === 'dark' ? 'black' : 'white'}
                rightIcon={orderStatus === "asc" ? <FaSortAmountUpAlt size={15} /> : <FaSortAmountDownAlt size={15} />}
                p={5}
                _hover={{ boxShadow: colorMode === "light" ? '0px 3px 10px 2px rgba(0, 0, 0, 0.5)' : '0px 3px 10px 2px rgba(255, 255, 255, 0.5)' }}
                onClick={handleOrder}
            >
                Sort
            </Button>
            <TodoModal type={'add'} isOpen={modalOpen} closeModal={closeModal} handleTasks={handleTasks} />
        </Box>
    )
}

export default AppHeader;