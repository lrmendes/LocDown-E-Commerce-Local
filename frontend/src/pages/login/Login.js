import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Grid, Button, TextField, Typography, Container, Avatar, FormControlLabel, Checkbox, Link } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import api from '../../services/api';

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


function Register(props) {
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

            history.push({
                pathname: "/home",
                state: { call: 'Login bem sucedido!' }
            });
        } catch (err) {
            //console.log(err);
            alert('Error ao tentar logar User.');
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

            history.push({
                pathname: "/vendor/home",
                state: { call: 'Login bem sucedido!' }
            });
        } catch (err) {
            //console.log(err);
            alert('Error ao tentar logar Vendor.');
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
                            <Link href="#" variant="body2">
                                Esqueceu a senha?
              </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Cadastrar-se "}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
export default Register;