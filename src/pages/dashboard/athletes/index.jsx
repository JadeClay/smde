import React from 'react';
import Layout from "@/layout";
import {getCookie} from "cookies-next";
import {Grid} from "@mui/material";
import CreateAthlete from "@/components/CreateAthlete";
import AthletesList from "@/components/AthletesList";

export default function Index() {
    const username = getCookie('username');

    return (
        <Layout size={'xl'} navbar>
            { username &&
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <CreateAthlete/>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <AthletesList/>
                    </Grid>
                </Grid>
            }
        </Layout>
    )


}
