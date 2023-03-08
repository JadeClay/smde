import React from "react";
import {getCookie} from "cookies-next";
import {
    Box,
    Button,
    Divider,
    FormControl,
    InputLabel, MenuItem,
    Paper, Select,
    Stack
} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {useRouter} from "next/router";

const DeleteUser = props => {
    const [selectedUser, setSelectedUser] = React.useState('');
    const [users, setUsers] = React.useState([]);
    const token = getCookie('token');
    const router = useRouter();

    React.useEffect(() => {
        fetch(`http://localhost:3001/auth/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + token,
            }
        }).then(response => response.json()).then(r => {
            setUsers(r);
        });
    },[]);

    const handleChange = (event) => {
        setSelectedUser(event.target.value);
    };

    const handleSubmit = () => {
        fetch(`http://localhost:3001/auth/users/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + token,
            },
            body: JSON.stringify({
                '_id': selectedUser
            }),
        }).then(response => response.json()).then(r => {
            if(r.error){alert("Error al eliminar el usuario usuario"); console.log(r.error)}else{alert("Usuario borrado con éxito"); router.reload()}
        });
    }
    return (
        <Paper style={{'margin-top': '10vh',}} elevation={5}>
            {console.log(users)}
            <Container style={{'padding': '10px 50px'}}>
                <Typography variant={"h4"} align={'center'}>
                    <PersonRemoveIcon fontSize={"inherit"} style={{'vertical-align': '-6px'}}/> Borrar usuario
                </Typography>
                <Divider />
                <Box sx={{ml: {'xs': 8, 'md': 0}, p: 2 }}>
                    <Stack>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 1 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Usuario</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedUser}
                                    label={"Usuario"}
                                    onChange={handleChange}
                                >
                                    {users.map(user => (
                                        <MenuItem key={user._id} value={user._id}>{user.username}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{m: 1,ml: 5}} >
                            <Button variant="contained" disableElevation onClick={handleSubmit}>
                                Borrar usuario
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Container>
        </Paper>
    );
};

export default DeleteUser;
