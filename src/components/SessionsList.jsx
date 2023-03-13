import * as React from 'react';
import Box from '@mui/material/Box';
import {DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import {Paper} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {getCookie} from "cookies-next";
import Link from "next/link";

export default function SessionsList({athlete, refresh}) {
    const [rows, setRows] = React.useState([]);
    const [athleteId, setAthleteId] = React.useState("");
    const token = getCookie('token');
    const columns = [
        {
            field: 'date',
            headerName: 'Fecha',
            type: 'dateTime',
            description: 'Fecha del entrenamiento',
            sortable: true,
            editable: false,
            width: 260,
            valueGetter: ({ value }) => value && new Date(value),
        },
        {
            field: 'distance',
            headerName: 'Distancia',
            description: 'Distancia recorrida',
            sortable: false,
            editable: false,
            width: 260,
            valueGetter: ({value}) => value + " metros",
        },
        {
            field: 'type',
            headerName: 'Tipo de Nado',
            description: 'Fue nado abierto o en piscina',
            width: 260,
            valueGetter: ({value}) => value == 1 ? "Piscina" : "Nado Abierto",
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Ver más',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {

                return [
                    <Link
                        key={id}
                        href={{
                            pathname: '/dashboard/sessions',
                            query: id
                        }}
                    >
                        <GridActionsCellItem
                            icon={<VisibilityIcon />}
                            label="Ver mas"
                            color="inherit"
                        />
                    </Link>,
                ];
            },
        }
    ];

    React.useEffect(() => {
        setAthleteId(athlete);
    })

    React.useEffect(() => {
        fetch(`http://51.222.27.252:3001/sessions/get/${athlete}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + token,
            },
        }).then(response => response.json()).then(r => {
            if(r.error){console.log("Error al buscar los entrenamientos"); console.log(r.error)}else{ console.log(r); setRows(r.Sessions.map((a) => a)) }
        });
    },[athleteId]);

    React.useEffect(() => {
        fetch(`http://51.222.27.252:3001/sessions/get/${athlete}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + token,
            },
        }).then(response => response.json()).then(r => {
            if(r.error){console.log("Error al buscar los entrenamientos"); console.log(r.error)}else{ console.log(r); setRows(r.Sessions.map((a) => a)) }
        });
    },[refresh]);

    return (
        <Paper style={{'marginTop': '10vh'}} elevation={5}>
            {console.log(rows)}
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    getRowId={(row) => row.id}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                        sorting: {
                            sortModel: [{ field: 'date', sort: 'desc' }],
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                />
            </Box>
        </Paper>
    );
}
