import * as React from 'react';
import Box from '@mui/material/Box';
import {DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import {Paper} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {getCookie} from "cookies-next";
import Link from "next/link";

export default function AthletesList() {
    const [rows, setRows] = React.useState([]);
    const token = getCookie('token');
    const columns = [
        {
            field: 'name',
            headerName: 'Nombre completo',
            description: 'Nombre completo del atleta',
            sortable: false,
            editable: false,
            width: 260,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Ver el perfil',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {

                return [
                    <Link
                        key={id}
                        href={{
                            pathname: '/dashboard/athletes/profile',
                            query: id
                        }}
                    >
                        <GridActionsCellItem
                            icon={<VisibilityIcon />}
                            label="Entrar al perfil"
                            color="inherit"
                        />
                    </Link>
                ];
            },
        }
    ];

    React.useEffect(() => {
        fetch(`http://51.222.27.252:3001/athletes/athletes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + token,
            },
        }).then(response => response.json()).then(r => {
            if(r.error){console.log("Error al buscar los atleta"); console.log(r.error)}else{ setRows(r.athletes) }
        });
    },[])

    return (
        <Paper style={{'margin-top': '10vh'}} elevation={5}>
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
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                />
            </Box>
        </Paper>
    );
}
