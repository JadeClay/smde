import React, {useState, useEffect} from 'react';
import Layout from "@/layout";
import {Grid, Stack} from "@mui/material";
import {getCookie} from "cookies-next";
import {useRouter} from "next/router";
import SessionInfo from "@/components/SessionInfo";
import SessionTipsList from "@/components/SessionTipsList";

export default function Profile() {
    const username = getCookie('username');
    const router = useRouter();
    const data = router.query;
    const id = Object.keys(data)[0];

    return(
        <Layout size={'xl'} navbar>
            { username &&
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <Stack>
                            <SessionInfo session={id} />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <SessionTipsList session={id}/>
                    </Grid>
                </Grid>
            }
        </Layout>
    )
}
