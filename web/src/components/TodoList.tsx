import React from "react";
import {
    Box,
    useColorMode,
    Text
} from "@chakra-ui/react";

import ItemCard from "./ItemCard";

const TodoList = ({ totalTasks, handleTasks }:any) => {
    const { colorMode } = useColorMode();

    return (
        <>
            {totalTasks?.length > 0 ?
            <Box
                display={'flex'}
                flexDirection={'column'}
                bg={colorMode === "dark" ? "blackAlpha.300" : "#cccdde"}
                gap={5}
                p={10}
                borderRadius={10}
            >
                {totalTasks.map((item: any) => (
                    <Box key={item.id}>
                        <ItemCard task={item} handleTasks={handleTasks} />
                    </Box>
                ))}
            </Box>
            : 
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    bg={colorMode === "dark" ? "blackAlpha.300" : "#cccdde"}
                    gap={5}
                    p={10}
                    borderRadius={10}
                >
                    <Text fontSize={20} fontWeight={700} color={colorMode === "dark" ? "cyan" : "#d53f8c"}>No Data</Text>
                </Box>
            }
        </>
    )
}

export default TodoList;