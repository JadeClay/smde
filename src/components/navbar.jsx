import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import PoolIcon from "@mui/icons-material/Pool";
import {useRouter} from "next/router";
import {deleteCookie} from "cookies-next";

function Navbar() {
    const router = useRouter();

    const logout = () => {
        deleteCookie('token');
        deleteCookie('username');
        deleteCookie('isAdmin');

        router.push("/");
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <PoolIcon sx={{ display: 'flex', mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        onClick={() => router.push("/dashboard")}
                    >
                        SwimFit
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        <Button
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            onClick={logout}
                        >
                            Cerrar sesión
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
