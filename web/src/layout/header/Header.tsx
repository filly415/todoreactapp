import React from "react";
import { 
    Heading,
    useColorMode,
    IconButton
} from "@chakra-ui/react";
import { FaSun, FaMoon } from 'react-icons/fa';

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Heading
                p='5'
                fontWeight='700'
                bgGradient={colorMode === "dark" ? 'linear(to-l, teal.300, blue.500)' : 'linear(to-l, red.300, yellow.500)'}
                size='xl'
                bgClip='text'
                display={'flex'}
                justifyContent={'center'}
            >
                To Do List
            </Heading>
            <IconButton 
                aria-label='Change theme'
                icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
                isRound={true} 
                size='md'
                alignSelf='flex-end'
                onClick={toggleColorMode}
                position={'absolute'}
                top={5}
                right={5}
            />
        </>
    )
}

export default Header;