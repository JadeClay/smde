import React from 'react';
import {Divider, Paper, TextField, Box, Button, Stack} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import PoolIcon from '@mui/icons-material/Pool';
import LoginIcon from '@mui/icons-material/Login';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {AccountCircle} from "@mui/icons-material";
import {useRouter} from 'next/router';
import {setCookie} from "cookies-next";

const LoginForm = props => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const router = useRouter();

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = () => {
        fetch(`http://51.222.27.252:3001/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        }).then(response => response.json()).then(r => {
            if(r.token){
                setCookie('isAdmin', r.user.isAdmin);
                setCookie('username', r.user.username);
                setCookie('token', r.token);
                router.push("/dashboard");
            }
            if(r.error){alert("Error al iniciar sesión")}
        });
    }

    return (
            <Paper style={{'margin-top': '35vh', 'margin-bottom': '36vh'}}>
                <Container style={{'padding': '10px 100px'}}>
                    <Typography variant={"h4"} align={'center'}>
                        <PoolIcon fontSize={"inherit"} style={{'vertical-align': '-6px'}}/> SMDE
                    </Typography>
                    <Divider />
                    <Box sx={{ml: 7}}>
                        <Stack>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 1 }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField id="input-with-sx" label="Usuario" variant="standard" onChange={handleUsername}/>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 1}}>
                                <VpnKeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField id="input-with-sx" label="Contraseña" variant="standard" type={"password"} onChange={handlePassword} />
                            </Box>
                            <Box sx={{m: 1,ml: 6}} >
                                <Button variant="contained" disableElevation startIcon={<LoginIcon />} onClick={handleSubmit}>
                                    Iniciar sesión
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </Container>
            </Paper>
    );
};

export default LoginForm;
