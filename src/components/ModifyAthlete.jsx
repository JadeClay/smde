import React from 'react';
import {Divider, Paper, TextField, Box, Button, Stack} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {AccountCircle} from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import {getCookie} from "cookies-next";

const ModifyAthlete = props => {
    const [name, setName] = React.useState(props.name);
    const token = getCookie('token');

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = () => {
        fetch('http://localhost:3001/athletes/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + token,
            },
            body: JSON.stringify({
                'name': name
            }),
        }).then(response => response.json()).then(r => {
            if(r.error){alert("Error al crear el atleta"); console.log(r.error)}else{alert("Atleta creado con éxito")}
        });
    }
    return (
        <Paper style={{'margin-top': '10vh'}} elevation={5}>
            {console.log(props.name)}
            <Container style={{'padding': '10px 50px'}}>
                <Typography variant={"h4"} align={'center'}>
                    <EditIcon fontSize={"inherit"} style={{'vertical-align': '-6px'}}/> Atleta
                </Typography>
                <Divider />
                <Box sx={{ml: {'xs': 8, 'md': 0} }}>
                    <Stack>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 1 }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="name" label={props.name} variant="standard" onChange={handleName}/>
                        </Box>
                        <Box sx={{m: 1,ml: 6}} >
                            <Button variant="contained" disableElevation onClick={handleSubmit}>
                                Modificar atleta
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Container>
        </Paper>
    );
};

export default ModifyAthlete;
