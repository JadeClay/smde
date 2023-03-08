import React from 'react';
import {Divider, Paper, TextField, Box, Button, Stack} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {getCookie} from "cookies-next";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PoolIcon from '@mui/icons-material/Pool';
import SpeedIcon from '@mui/icons-material/Speed';
import AlarmIcon from '@mui/icons-material/Alarm';
import {useRouter} from "next/router";


const UploadSession = props => {
    const [sessionFile, setSessionFile] = React.useState("");
    const [idealStroke, setIdealStroke] = React.useState(0);
    const [idealTime, setIdealTime] = React.useState(0);
    const [idealPace, setIdealPace] = React.useState(0);
    const token = getCookie('token');
    const router = useRouter();

    const handleSessionFileChange = (e) => {
        setSessionFile(e.target.files[0]);
    }

    const handleIdealStrokeChange = (e) => {
        setIdealStroke(e.target.value);
    }

    const handleIdealTimeChange = (e) => {
        setIdealTime(e.target.value);
    }

    const handleIdealPaceChange = (e) => {
        setIdealPace(e.target.value);
    }

    const handleSubmit = () => {
        let formData = new FormData();
        formData.append('athlete_id', props.id);
        formData.append('file', sessionFile);
        formData.append('idealStroke', idealStroke);
        formData.append('idealTime', idealTime);
        formData.append('idealPace', idealPace);

        fetch('http://localhost:3001/sessions/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ` + token,
            },
            body: formData,
        }).then(response => response.json()).then(r => {
            if(r.error){alert("Error al añadir la sesión de entrenamiento"); console.log(r.error)}else{alert("Sesión de entrenamiento creada con éxito"); console.log(r);props.refresh()}
        });
    }

    return (
        <Paper style={{'marginTop': '3vh', 'marginBottom': '3vh'}} elevation={5}>
            <Container style={{'padding': '10px 50px'}}>
                <Typography variant={"h4"} align={'center'}>
                    <AddCircleIcon fontSize={"inherit"} style={{'verticalAlign': '-6px'}}/> Añadir entrenamiento
                </Typography>
                <Divider />
                <Box sx={{ml: {'xs': 8, 'md': 0} }}>
                    <form method='POST' encType="multipart/form-data">
                        <Stack>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 1, mb: 0, ml: 4 }}>
                                <input accept={"text/csv"} type={"file"} onChange={handleSessionFileChange} name={"file"}/>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 0.5, ml: 1 }}>
                                <AlarmIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField id="tiempo-ideal" label="Tiempo meta" variant="standard" onChange={handleIdealTimeChange} type={'number'}/>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 0.5, ml: 1 }}>
                                <PoolIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField id="brazada-ideal" label="Avg. Brazadas Ideal" variant="standard" onChange={handleIdealStrokeChange} type={'number'}/>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 0.5, ml: 1 }}>
                                <SpeedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField id="velocidad-ideal" label="Avg. Pace Ideal" variant="standard" onChange={handleIdealPaceChange} type={'number'}/>
                            </Box>
                            <Box sx={{m: 1,ml: 6}} >
                                <Button variant="contained" disableElevation onClick={handleSubmit}>
                                    Agregar sesión
                                </Button>
                            </Box>
                        </Stack>
                    </form>
                </Box>
            </Container>
        </Paper>
    );
};

export default UploadSession;
