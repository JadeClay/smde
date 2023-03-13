import React from 'react';
import {Divider, Paper, TextField, Box, Button, Stack} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {AccountCircle} from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {getCookie} from "cookies-next";

const ModifyAthlete = props => {
    const [name, setName] = React.useState(props.name);
    const [id, setId] = React.useState(props.id);
    const token = getCookie('token');

   /* const handleName = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = () => {
        fetch('http://51.222.27.252:3001/athletes/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + token,
            },
            body: JSON.stringify({
                'id': id,
                'name': name
            }),
        }).then(response => response.json()).then(r => {
            if(r.error){alert("Error al crear el atleta"); console.log(r.error)}else{alert("Atleta creado con éxito")}
        });
    } */
    return (
        <Paper style={{'margin-top': '10vh'}} elevation={5}>
            <Container style={{'padding': '10px 50px'}}>
                <Typography variant={"h4"} align={'center'}>
                    <AccountBoxIcon fontSize={"inherit"} style={{'vertical-align': '-6px'}}/> Atleta
                </Typography>
                <Divider />
                <Box sx={{ml: {'xs': 8, 'md': 0} }}>
                    <Stack>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 1 }}>
                            <Typography variant={"body1"} align={'center'}>
                                <strong>Nombre: </strong> {props.name}
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Container>
        </Paper>
    );
};

export default ModifyAthlete;
