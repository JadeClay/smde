import {  Box, Link, Typography } from '@mui/material';
import React from 'react';

export default function Footer() {
    return (
        <Box sx={{'padding': 2}}>
            <Link align='inherit' underline='hover' color='inherit' href='https://centenaria.com/' target='_blank'><Typography align={'center'}>&copy;  2023. Developed by Centenaria</Typography></Link>
        </Box>
    )
}
