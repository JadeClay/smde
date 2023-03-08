import React from 'react';
import Layout from "@/layout";
import {getCookie} from "cookies-next";
import {Card, CardActionArea, CardContent, CardMedia, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";

export default function Index() {
    const role = getCookie('isAdmin');
    const user = getCookie('username');
    const router = useRouter()

    return (
        <Layout size={'md'} navbar>
            <Stack sx={{m: {'xs': 2, 'md': 4} , p: {'xs': 10, 'md': 20}}} style={{'width': '100%'}} direction={{'xs': 'column', 'md':'row'}} spacing={{'xs': 2, 'md': 5}}>
                { user &&
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea onClick={() => {(role && user) ? router.push("/dashboard/settings") : null}}>
                            <CardMedia
                                component="img"
                                height="180"
                                image="/control.png"
                                alt="Panel de control"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" align={'center'}>
                                        Panel de Control
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                }
                { user &&
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea onClick={() => router.push("/dashboard/athletes")}>
                            <CardMedia
                                component="img"
                                height="180"
                                image="/athletes.jpg"
                                alt="Atletas"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" align={'center'}>
                                    Atletas
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                }
            </Stack>
        </Layout>
    )


}
