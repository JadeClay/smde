import React, {useEffect} from 'react';
import {Divider, Paper, TextField, Box, Button, Stack, Switch, FormControlLabel} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {AccountCircle, VpnKey} from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {getCookie} from "cookies-next";

const CreateUser = props => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isAdmin, setIsAdmin] = React.useState(false);
    const token = getCookie('token');

    const handleUsername = (e) => {
        setUsername(e.target.value);
        console.log(username);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        console.log(password);
    }

    const handleAdmin = (e) => {
        setIsAdmin(!isAdmin);
        console.log(isAdmin);
    }

    const handleSubmit = () => {
        fetch(`http://localhost:3001/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + token,
            },
            body: JSON.stringify({
                'username': username,
                'password': password,
                'isAdmin': isAdmin
            }),
        }).then(response => response.json()).then(r => {
            if(r.error){alert("Error al crear usuario"); console.log(r.error)}else{alert("Usuario creado con éxito")}
        });
    }
    return (
        <Paper style={{'margin-top': '10vh',}} elevation={5}>
            <Container style={{'padding': '10px 50px'}}>
                <Typography variant={"h4"} align={'center'}>
                    <AddCircleIcon fontSize={"inherit"} style={{'vertical-align': '-6px'}}/> Crear usuario
                </Typography>
                <Divider />
                <Box sx={{ml: {'xs': 8, 'md': 0} }}>
                    <Stack>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 1 }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="input-with-sx" label="Usuario" variant="standard" onChange={handleUsername}/>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 1}}>
                            <VpnKey sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="input-with-sx" label="Contraseña" variant="standard" type={"password"} onChange={handlePassword} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 1}}>
                            <FormControlLabel control={<Switch />} label="Administrador" onChange={handleAdmin}/>
                        </Box>
                        <Box sx={{m: 1,ml: 6}} >
                            <Button variant="contained" disableElevation onClick={handleSubmit}>
                                Crear usuario
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Container>
        </Paper>
    );
};

export default CreateUser;
