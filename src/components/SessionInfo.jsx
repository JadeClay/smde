import React, {useState} from 'react';
import {Divider, Paper, Box, Stack} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {getCookie} from "cookies-next";
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import TimerIcon from '@mui/icons-material/Timer';
import PoolIcon from '@mui/icons-material/Pool';
import SpeedIcon from '@mui/icons-material/Speed';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import {MonitorHeart, ScubaDiving} from "@mui/icons-material";

const toHoursAndMinutes = (totalSeconds) => {
    const totalMinutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h, ${minutes}m, ${seconds}s`;
}


const SessionInfo = props => {
    const [swolf, setSwolf] = React.useState(0);
    const [actualize, toggleActualize] = React.useState(0);
    const [pace, setPace] = React.useState(0);
    const [strokes, setStrokes] = React.useState(0);
    const [time, setTime] = React.useState(0);
    const [distance, setDistance] = React.useState(0);
    const [idealStrokes, setIdealStrokes] = React.useState(0);
    const [idealTime, setIdealTime] = React.useState(0);
    const [idealPace, setIdealPace] = React.useState(0);
    const [heartRate, setHeartRate] = React.useState(0);
    const [type, setType] = React.useState(false);
    const token = getCookie('token');

    React.useEffect(() => {
        toggleActualize(props.session);
    })

    React.useEffect(() => {
        fetch(`http://51.222.27.252:3001/sessions/${props.session}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + token,
            }
        }).then(response => response.json()).then(response => {
            console.log(response.Sessions);
            setPace(response.Sessions[0].avg_pace);
            setStrokes(response.Sessions[0].avg_strokes);
            setTime(response.Sessions[0].time_done);
            setDistance(response.Sessions[0].distance);
            setIdealTime(response.Sessions[0].ideal_time);
            setIdealStrokes(response.Sessions[0].ideal_strokes);
            setIdealPace(response.Sessions[0].ideal_pace);
            setHeartRate(response.Sessions[0].heart_rate);
            if(response.Sessions[0].type){
                setType(true);
            }
            setSwolf(response.Sessions[0].swolf);
        })
    }, [actualize]);

    return (
        <Paper style={{'marginTop': '3vh', 'marginBottom': '3vh'}} elevation={5}>
            <Container style={{'padding': '10px 50px'}}>
                <Typography variant={"h4"} align={'center'}>
                    <ScoreboardIcon fontSize={"inherit"} style={{'verticalAlign': '-6px'}}/> Resultados
                </Typography>
                <Box sx={{ml: {'xs': 8, 'md': 0} }}>
                        <Stack>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 1, ml: 5}}>
                                <Typography variant={"body1"} align={'center'}>
                                    <DirectionsWalkIcon fontSize={"inherit"} style={{'verticalAlign': '-4px'}}/> <strong>Distancia</strong> <br/>
                                    {distance} metros nadados
                                </Typography>
                            </Box>
                            <Divider variant={'middle'}/>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 1, ml: 4}}>
                                <Typography variant={"body1"} align={'center'}>
                                    <TimerIcon fontSize={"inherit"} style={{'verticalAlign': '-4px'}}/> <strong>Tiempo</strong> <br/>
                                    {toHoursAndMinutes(time)} realizado<br/>
                                    <strong>{toHoursAndMinutes(idealTime)} esperado</strong>
                                </Typography>
                            </Box>
                            <Divider variant={'middle'}/>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 1, ml: 4}}>
                                <Typography variant={"body1"} align={'center'}>
                                    <PoolIcon fontSize={"inherit"} style={{'verticalAlign': '-4px'}}/> <strong>Brazadas</strong> <br/>
                                    {strokes} promedio realizadas<br/>
                                    <strong>{idealStrokes} promedio esperadas</strong>
                                </Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 1, ml: 4}}>
                                <Typography variant={"body1"} align={'center'}>
                                    <SpeedIcon fontSize={"inherit"} style={{'verticalAlign': '-4px'}}/> <strong>Pace</strong> <br/>
                                    {toHoursAndMinutes(pace)} obtenido<br/>
                                    <strong>{toHoursAndMinutes(idealPace)} esperado</strong>
                                </Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 1, ml: 4}}>
                                <Typography variant={"body1"} align={'center'}>
                                    <MonitorHeart fontSize={"inherit"} style={{'verticalAlign': '-4px'}}/> <strong>Frecuencia cardíaca</strong> <br/>
                                    {heartRate} por minutos<br/>
                                </Typography>
                            </Box>
                            {type &&<Divider />}
                            {type &&<Box sx={{ display: 'flex', alignItems: 'flex-end', m: 1, ml: 10}}>
                                <Typography variant={"body1"} align={'center'}>
                                    <ScubaDiving fontSize={"inherit"} style={{'verticalAlign': '-4px'}}/> <strong>Swolf</strong> <br/>
                                    32 obtenido<br/>
                                    <strong>{swolf} esperado</strong><br/>
                                </Typography>
                            </Box>}
                        </Stack>
                </Box>
            </Container>
        </Paper>
    );
};

export default SessionInfo;
