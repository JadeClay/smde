import React from 'react';
import {Divider, Paper, TextField, Box, Button, Stack} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {AccountCircle} from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {getCookie} from "cookies-next";

const CreateAthlete = props => {
    const [name, setName] = React.useState("");
    const token = getCookie('token');

    const refreshPage = () => window.location.reload(false);

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = () => {
        fetch(`http://51.222.27.252:3001/athletes/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + token,
            },
            body: JSON.stringify({
                'name': name
            }),
        }).then(response => response.json()).then(r => {
            if(r.error){alert("Error al crear el atleta"); console.log(r.error)}else{alert("Atleta creado con éxito"); refreshPage();}
        });
    }
    return (
        <Paper style={{'margin-top': '10vh'}} elevation={5}>
            <Container style={{'padding': '10px 50px'}}>
                <Typography variant={"h4"} align={'center'}>
                    <AddCircleIcon fontSize={"inherit"} style={{'vertical-align': '-6px'}}/> Crear atleta
                </Typography>
                <Divider />
                <Box sx={{ml: {'xs': 8, 'md': 0} }}>
                    <Stack>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 1 }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="name" label="Nombre Completo" variant="standard" onChange={handleName}/>
                        </Box>
                        <Box sx={{m: 1,ml: 6}} >
                            <Button variant="contained" disableElevation onClick={handleSubmit}>
                                Crear atleta
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Container>
        </Paper>
    );
};

export default CreateAthlete;
