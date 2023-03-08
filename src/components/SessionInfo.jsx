import React, {useState} from 'react';
import {Divider, Paper, TextField, Box, Button, Stack, InputAdornment} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {getCookie} from "cookies-next";
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import TimerIcon from '@mui/icons-material/Timer';
import PoolIcon from '@mui/icons-material/Pool';
import SpeedIcon from '@mui/icons-material/Speed';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import {useRouter} from "next/router";

const toHoursAndMinutes = (totalSeconds) => {
    const totalMinutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h, ${minutes}m, ${seconds}s`;
}


const SessionInfo = props => {
    const [actualize, toggleActualize] = React.useState(0);
    const [pace, setPace] = React.useState(0);
    const [strokes, setStrokes] = React.useState(0);
    const [time, setTime] = React.useState(0);
    const [distance, setDistance] = React.useState(0);
    const [idealStrokes, setIdealStrokes] = React.useState(0);
    const [idealTime, setIdealTime] = React.useState(0);
    const [idealPace, setIdealPace] = React.useState(0);
    const token = getCookie('token');
    const router = useRouter();

    React.useEffect(() => {
        toggleActualize(props.session);
    })

    React.useEffect(() => {
        fetch(`http://localhost:3001/sessions/${props.session}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + token,
            }
        }).then(response => response.json()).then(response => {
            setPace(response.Sessions.avg_pace);
            setStrokes(response.Sessions.avg_strokes);
            setTime(response.Sessions.time_done);
            setDistance(response.Sessions.distance);
            setIdealTime(response.Sessions.ideal_time);
            setIdealStrokes(response.Sessions.ideal_strokes);
            setIdealPace(response.Sessions.ideal_pace);
        })
    }, [actualize]);

    return (
        <Paper style={{'marginTop': '3vh', 'marginBottom': '3vh'}} elevation={5}>
            {console.log(props.name)}
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
                        </Stack>
                </Box>
            </Container>
        </Paper>
    );
};

export default SessionInfo;
