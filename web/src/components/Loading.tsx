import { Box } from "@chakra-ui/react";
import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const LoadingScreen = () => {
    return (
        <Box
            position={'fixed'}
            width={'100%'}
            height={'100%'}
            top={0}
            left={0}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            backgroundColor={'#0000008c'}
        >
            <ScaleLoader color={"#F864C5"}
                loading={true}
                aria-label="Loading Spinner"
                data-testid="loader"
            /> 
        </Box>
    )
}

export default LoadingScreen;