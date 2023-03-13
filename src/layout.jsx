import Head from 'next/head'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navbar from './components/navbar'
import {createTheme, Stack, ThemeProvider} from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Footer from "@/components/Footer";

const theme = createTheme( {
    palette: {
        mode: 'dark',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
    },
});

export default function Layout({ children, size, navbar }) {
    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>SMDE</title>
                <meta name="description" content="Sistema de monitoreo deportivo con dispositivo electrónico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box style={{'backgroundImage': 'linear-gradient(to bottom, rgba(42, 44, 46, 0.7), rgba(42, 44, 46, 0.7)), URL(/background.jpg)', 'backgroundSize': 'cover', 'minHeight': '100vh' }}>
                {navbar && <Navbar/> }
                <Container maxWidth={size}>
                    <Stack>
                        {children}
                    </Stack>
                </Container>
            </Box>
            <Footer/>
        </ThemeProvider>
    )
}
