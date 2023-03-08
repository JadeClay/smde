import React from 'react';
import Layout from "@/layout";
import {getCookie} from "cookies-next";
import {Stack} from "@mui/material";
import CreateUser from "@/components/CreateUser";
import DeleteUser from "@/components/DeleteUser";

export default function Index() {
    const role = getCookie('isAdmin');
    const user = getCookie('username');

    return (
        <Layout size={'md'} navbar>
            {(role && user) && <Stack sx={{ mt: {xs: 0, md: 5} }} direction={{'xs': 'column', 'md': 'row'}} spacing={2}>
                <CreateUser/>
                <DeleteUser/>
            </Stack>
            }
        </Layout>
    )


}
