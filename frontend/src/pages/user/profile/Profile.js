import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Sidebar from '../../../components/Sidebar';
import {Grid, Paper, Box, Button, Input, Divider, InputAdornment, TextField} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import api from '../../../services/api';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    border: '1px solid #c6c6c6 rgba(0,0,0,0.1)',
    boxShadow: '1px 2px 3px 1px rgba(0,0,0,0.2)',
    color: theme.palette.text.secondary,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  categoryImg: {
      maxWidth: '40%',
  },
}));


function Profile( props ) {
  const { window } = props;
  const classes = useStyles();
  const theme = createMuiTheme();

  const [profiledata, setProfileData] = useState({
      user: null,
  });
  const [notFound, setNotFound] = useState(false);
  const [msg, setMsg] = useState("Buscando dados do perfil...");

  useEffect(() => {

    api.get('userData', {
        headers: {
            buyid: localStorage.getItem('buyID'),
        }
    }).then(response => {
        if (!response.data.user.length) {
            setNotFound(true);
            setMsg("O perfil não foi encontrado.");
        }
        setProfileData({user: response.data.user[0]});
    }).catch(err => {
        //console.log(err);
        setNotFound(true);
        setMsg("Não foi possível realizar a comunicação com o servidor. Tente novamente!");
    })
    }, []);



    theme.typography.h3 = {
        fontSize: '1.2rem',
        '@media (min-width:600px)': {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.4rem',
        },
    };
    theme.typography.h4 = {
        fontSize: '1.1rem',
        '@media (min-width:600px)': {
            fontSize: '1.0rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.4rem',
        }
    };
    

  return (
    <div className={classes.root}>
    <CssBaseline />
    <Sidebar currentPage={2} title={"Perfil"} />
      <main className={classes.content}>
      <div className={classes.toolbar} />
      {!notFound && profiledata.user != null
        ? ( 
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h4" color="textPrimary">Dados Pessoais</Typography>
                    </ThemeProvider>
                            <Box mt={2}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="nome"
                                label="Nome"
                                name="nome"
                                value={profiledata.user.name}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                    <InputAdornment position="end">
                                      <LockOutlinedIcon color="disabled" />
                                    </InputAdornment>
                                )}}
                            />
                            </Box>
                            <Box mt={2}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                value={profiledata.user.email}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                    <InputAdornment position="end">
                                      <LockOutlinedIcon color="disabled"/>
                                    </InputAdornment>
                                )}}
                            />
                            </Box>
                            <Box mt={2}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="whats"
                                label="Whatsapp"
                                name="whats"
                                value={profiledata.user.whatsapp}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                    <InputAdornment position="end">
                                      <LockOutlinedIcon color="disabled"/>
                                    </InputAdornment>
                                )}}
                            />
                            </Box>
                </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h4" color="textPrimary">Endereço</Typography>
                    </ThemeProvider>
                    <Grid container direction="row" justify="space-evenly">
                        <Grid item>
                        <Box mt={2}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="CEP"
                            value={profiledata.user.endereco[0].cep}
                            InputProps={{
                                readOnly: true,
                                endAdornment: (
                                <InputAdornment position="end">
                                    <LockOutlinedIcon color="disabled" />
                                </InputAdornment>
                            )}}/>
                        </Box>
                        <Box mt={2}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Logradouro"
                            value={profiledata.user.endereco[1].logradouro}
                            InputProps={{
                                readOnly: true,
                                endAdornment: (
                                <InputAdornment position="end">
                                    <LockOutlinedIcon color="disabled" />
                                </InputAdornment>
                            )}}/>
                        </Box>
                        <Box mt={2}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Número"
                            value={profiledata.user.endereco[5].numero}
                            InputProps={{
                                readOnly: true,
                                endAdornment: (
                                <InputAdornment position="end">
                                    <LockOutlinedIcon color="disabled" />
                                </InputAdornment>
                            )}}/>
                        </Box>
                            </Grid>
                            <Grid item>
                                <Box mt={2}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Bairro"
                                    value={profiledata.user.endereco[2].bairro}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                        <InputAdornment position="end">
                                            <LockOutlinedIcon color="disabled" />
                                        </InputAdornment>
                                    )}}/>
                                </Box>
                                <Box mt={2}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Localidade"
                                    value={profiledata.user.endereco[3].localidade}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                        <InputAdornment position="end">
                                            <LockOutlinedIcon color="disabled" />
                                        </InputAdornment>
                                    )}}/>
                                </Box>
                                <Box mt={2}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="UF"
                                    value={profiledata.user.endereco[4].uf}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                        <InputAdornment position="end">
                                            <LockOutlinedIcon color="disabled" />
                                        </InputAdornment>
                                    )}}/>
                                </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            </Grid>
        )
        :  <Typography variant="h6" align="center">{msg}</Typography>
        }
      </main>
    </div>
  );
}
export default Profile;