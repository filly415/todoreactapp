import React from "react";
import { 
    Box,
    Flex,
    IconButton,
    Link
} from "@chakra-ui/react";
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <Box
            display={'flex'}
            justifyContent={'center'}    
            p={10}
        >
            <Flex>
                <Link href='https://www.linkedin.com/company/weatherworks' target='_blank'>
                    <IconButton 
                    aria-label='Linkedin'
                    icon={<FaLinkedin/>}
                    isRound={true}
                    size='md'
                    m='1'
                /> 
                </Link>
                <Link href='https://www.instagram.com/weatherworksllc/?ref=badge' target='_blank'>
                    <IconButton 
                    aria-label='Instagram'
                    icon={<FaInstagram/>}
                    isRound={true}
                    size='md'
                    m='1'
                /> 
                </Link>
                <Link href='https://www.twitter.com/weatherworks' target='_blank'>
                    <IconButton 
                    aria-label='Twitter'
                    icon={<FaTwitter/>}
                    isRound={true}
                    size='md'
                    m='1'
                /> 
                </Link>
                <Link href='https://www.facebook.com/WeatherWorks' target='_blank'>
                    <IconButton
                    aria-label='Facebook' 
                    icon={<FaFacebook/>}
                    isRound={true}
                    size='md'
                    m='1'
                /> 
                </Link>
                <Link href='https://www.youtube.com/user/WeatherWorksLLC' target='_blank'>
                    <IconButton
                    aria-label='Facebook' 
                    icon={<FaYoutube/>}
                    isRound={true}
                    size='md'
                    m='1'
                /> 
                </Link>
            </Flex>
        </Box>
    )
}

export default Footer;