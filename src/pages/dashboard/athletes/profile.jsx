import React, {useState, useEffect} from 'react';
import Layout from "@/layout";
import {Grid, Stack} from "@mui/material";
import {getCookie} from "cookies-next";
import {useRouter} from "next/router";
import ModifyAthlete from "@/components/ModifyAthlete";
import SessionsList from "@/components/SessionsList";
import UploadSession from "@/components/UploadSession";

export default function Profile() {
    const [athlete, setAthlete] = React.useState({});
    const [reload, setReload] = React.useState(0);
    const token = getCookie('token');
    const username = getCookie('username');
    const router = useRouter();
    const data = router.query;
    const id = Object.keys(data)[0];

    const refreshTable = () => setReload(reload + 1);


    React.useEffect(() => {
        fetch(`http://51.222.27.252:3001/athletes/get`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + token,
            },
            body: JSON.stringify({
                'id': id
            }),
        }).then(response => response.json()).then(response => setAthlete(response.athletes))
    }, [])

    return(
        <Layout size={'xl'} navbar>
            { username &&
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <Stack>
                            <ModifyAthlete name={athlete.name} id={athlete.id}/>
                            <UploadSession id={athlete.id} refresh={refreshTable}/>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <SessionsList athlete={athlete.id} refresh={reload}/>
                    </Grid>
                </Grid>
            }
        </Layout>
    )
}
