import React from 'react';
import {
    Divider,
    Paper,
    TextField,
    Box,
    Button,
    Stack,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio, Switch
} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {getCookie} from "cookies-next";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PoolIcon from '@mui/icons-material/Pool';
import SpeedIcon from '@mui/icons-material/Speed';
import AlarmIcon from '@mui/icons-material/Alarm';
import {ScubaDiving, UploadFile} from "@mui/icons-material";


const UploadSession = props => {
    const [type, setType] = React.useState(false);
    const [sessionFile, setSessionFile] = React.useState("");
    const [swolf, setSwolf] = React.useState(0);
    const [idealStroke, setIdealStroke] = React.useState(0);
    const [idealTime, setIdealTime] = React.useState(0);
    const [idealPace, setIdealPace] = React.useState(0);
    const token = getCookie('token');

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

    const handleSwolfChange = (e) => {
        setSwolf(e.target.value);
    }

    const handleType = (e) => {
        setType(!type);
        console.log(type);
    }

    const handleSubmit = () => {
        let formData = new FormData();
        formData.append('athlete_id', props.id);
        formData.append('file', sessionFile);
        formData.append('idealStroke', idealStroke);
        formData.append('idealTime', idealTime);
        formData.append('idealPace', idealPace);
        formData.append('swim', type);
        formData.append('swolf', swolf);

        fetch('http://51.222.27.252:3001/sessions/upload', {
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
                                <Button variant="contained" component="label" startIcon={<UploadFile />}>
                                    Seleccionar data
                                    <input hidden id={"file"} accept={"text/csv"} type={"file"} onChange={handleSessionFileChange} name={"file"}/>
                                </Button>
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
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 0.5, ml: 1 }}>
                                <ScubaDiving sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField id="swolf-ideal" label="Swolf Ideal" variant="standard" onChange={handleSwolfChange} type={'number'}/>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 0.5, ml: 3 }}>
                                <Typography variant={'body1'} sx={{m: 0.9}}>Nado abierto</Typography><FormControlLabel control={<Switch />} label="Piscina" onChange={handleType}/>
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
