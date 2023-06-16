import { Box, styled } from '@mui/material'
import React from 'react'

const Footer = () => {
    return <Container className="mt-[70px]" p="20px" py="70px" display="flex" width="100%" justifyContent="center">
        <Box>Copyright © 2023 <a href={"#"} style={{color: '#007bff'}}>LONO STAKE</a>.</Box>
        <Box> All rights reserved. </Box>
    </Container>
}

export default Footer;

const Container = styled(Box)`
    padding: 20px;
    padding-top: 70px;
    padding-bottom: 70px;
    width: 100%;
    display: flex;
    justify-content: center;
    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
    }
`