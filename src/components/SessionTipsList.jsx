import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {getCookie} from "cookies-next";

function provideSwimmingTips(timeSpent, distanceSwum, avgStrokes, pace, idealTime, idealStrokes, idealPace) {
    let tips = [];

    // Provide feedback on stroke technique
    if (avgStrokes >= idealStrokes) {
        tips.push('Concéntrate en reducir el número de brazadas alcanzando menos y pateando más.');
    } else if (avgStrokes <= idealStrokes) {
        tips.push('Trabaja en empujarte más fuerte y deslizarte menos.');
    } else {
        tips.push('Buen trabajo con las brazadas.');
    }

    // Offer training tips
    if (timeSpent >= idealTime) {
        tips.push('Trata de añadir más distancia a tus sesiones, para construir mayor resistencia. También puedes incluir cardio a tu rutina.');
    } else if (idealTime >= timeSpent) {
        tips.push('Toma ciertos descansos durante largas sesiones de nado, para evitar fatiga y lesiones');
    } else {
        tips.push('Continúa con el buen trabajo en las rutinas de entrenamiento.');
    }

    if(pace < idealPace){
        let i = Math.floor(Math.random() * 1);
        switch (i) {
            case 0:
                tips.push('Concéntrese en optimizar la posición de su cuerpo para reducir la resistencia.');
                break;
            default:
                tips.push('Trabaja en mejorar tu técnica de brazada para aumentar la eficiencia y tu velocidad.');
        }

    } else if(pace > idealPace){
        let i = Math.floor(Math.random() * 1);
        switch (i) {
            case 0:
                tips.push('Reduce ligeramente tu velocidad para mejorar tu forma.');
                break;
            default:
                tips.push('Concentrate en mantener buena postura y técnica.');
        }


    } else {
        tips.push('Buen trabajo manteniento tu postura y técnica.');
    }

    // Dando consejos generales

    let i = Math.floor(Math.random() * 2);
    switch (i) {
        case 0:
            tips.push('Recuerda siempre enfocarte en la respiración e intentar ejercitarte en otras actividades, como el entrenamiento de fuerza, ciclismo, etc.');
            break;
        case 1:
            tips.push('Impulsar el agua en vez de tirar de ella. Trata de empujar el agua en el momento en que la mano se sitúe a la altura del ombligo.');
            break;
        default:
            tips.push('Lleva la cuenta de las brazadas que haces para motivarte.');
    }

    return tips;
}

const SessionTipsList = props => {
    const [actualize, toggleActualize] = React.useState(0);
    const [pace, setPace] = React.useState(0);
    const [strokes, setStrokes] = React.useState(0);
    const [time, setTime] = React.useState(0);
    const [idealStrokes, setIdealStrokes] = React.useState(0);
    const [idealTime, setIdealTime] = React.useState(0);
    const [idealPace, setIdealPace] = React.useState(0);
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
            setPace(response.Sessions[0].avg_pace);
            setStrokes(response.Sessions[0].avg_strokes);
            setTime(response.Sessions[0].time_done);
            setIdealTime(response.Sessions[0].ideal_time);
            setIdealStrokes(response.Sessions[0].ideal_strokes);
            setIdealPace(response.Sessions[0].ideal_pace);
        })
    }, [actualize]);

    return (
        <TableContainer component={Paper} style={{'marginTop': '3vh', 'marginBottom': '3vh'}} elevation={5}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align={'justify'}>Consejos</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {provideSwimmingTips(time, pace, strokes, idealTime, idealStrokes, idealPace)
                        .map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default SessionTipsList;
