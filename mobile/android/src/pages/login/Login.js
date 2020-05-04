import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Grid, Button, TextField, Typography, Container, Avatar, FormControlLabel, Checkbox } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from "react-router-dom";
import api from '../../services/api';

import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    toggleContainer: {
        margin: theme.spacing(2, 0),
      },
}));


function Login(props) {
    const classes = useStyles();

    const history = useHistory();

    const [alignment, setAlignment] = React.useState('usuario');
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");


    async function handleLoginUser() {

        const data =
        {
            "email": email,
            "password": senha
        };

        try {
            //console.log('enviou: ', data);
            const response = await api.post('/auth/authenticate', data);

            localStorage.setItem('buyconta', 1);
            localStorage.setItem('buylocal', response.data.user.endereco[3].localidade);
            localStorage.setItem('buynome', response.data.user.name);
            localStorage.setItem('buyID', response.data.user._id);

            history.push({
                pathname: "/home",
                state: { call: 'Login bem sucedido!' }
            });
        } catch (err) {
            //console.log(err);
            alert('Error ao tentar logar usuário! Caso seja uma conta de vendedor, alterne a aba de login!');
        }
    }

    async function handleLoginVendor() {

        const data =
        {
            "email": email,
            "password": senha
        };

        try {
            //console.log('enviou: ', data);
            const response = await api.post('/auth/authenticateVendor', data);

            localStorage.setItem('buyconta', 2);
            localStorage.setItem('buylocal', response.data.vendor.endereco[3].localidade);
            localStorage.setItem('buynome', response.data.vendor.name);
            localStorage.setItem('buyID', response.data.vendor._id);
            localStorage.setItem('buysetor', response.data.vendor.setor);

            history.push({
                pathname: "/vendor/home",
                state: { call: 'Login bem sucedido!' }
            });
        } catch (err) {
            //console.log(err);
            alert('Error ao tentar logar vendedor! Caso seja uma conta de usuário, alterne a aba de login!');
        }
    }

    function handleLogin() {
        if (alignment == 'usuario') {
            handleLoginUser();
        } else {
            handleLoginVendor();
        }
    }

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
      };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
            </Typography>
                <div className={classes.toggleContainer}>
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                    >
                        <ToggleButton value="usuario" aria-label="usuario">
                            Usuário
                        </ToggleButton>
                        <ToggleButton value="empresa" aria-label="empresa">
                            Empresa
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Lembrar usuário"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleLogin}
                    >
                        Login
          </Button>
                    <Grid container>
                        <Grid item xs>
                            
                        </Grid>
                        <Grid item>
                            <Link  to={'/register'} style={{ textDecoration: 'none' }} >
                                <Button style={{textDecoration: 'none', color: 'blue'}} endIcon={<ExitToAppOutlinedIcon />}>Não possui conta? Registrar</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
export default Login;