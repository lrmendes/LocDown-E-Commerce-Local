import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SidebarVendor from '../../../components/SidebarVendor';
import {Grid, Paper, Box, InputAdornment, TextField} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import api from '../../../services/api';

const hostIP = require('../../../services/hostIP.json');

function idToCategory(id) {
    switch (id) {
        case '0':
        case 0:
            return "Roupas";
        case 1:
        case '1':
            return "Calçados";
        case 2:
        case '2':
            return "Eletrônicos";
        case 3:
        case '3':
            return "Brinquedos";
        default:
            return "";
    }
}

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
      width: '100px',
      height: 'auto',
      '@media (min-width:600px)': {
        width: '300px',
        },
        [theme.breakpoints.up('md')]: {
            width: '300px',
        }
  },
}));


function VProfile( props ) {
  const { window } = props;
  const classes = useStyles();
  const theme = createMuiTheme();

  const [profiledata, setProfileData] = useState({
      vendor: null,
  });
  const [notFound, setNotFound] = useState(false);
  const [msg, setMsg] = useState("Buscando dados do perfil...");

  useEffect(() => {
    api.get('vendorData', {
        headers: {
            buyid: localStorage.getItem('buyID'),
        }
    }).then(response => {
        //console.log(response.data.vendor[0]);
        if (!response.data.vendor[0]) {
            setNotFound(true);
            setMsg("O perfil não foi encontrado.");
        }
        setProfileData({vendor: response.data.vendor[0]});
    }).catch(err => {
        //console.log(err);
        setNotFound(true);
        setMsg("Não foi possível realizar a comunicação com o servidor. Tente novamente!");
    })
    }, [window]);

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
    <SidebarVendor currentPage={2} title={"Perfil"} />
      <main className={classes.content}>
      <div className={classes.toolbar} />
      {!notFound && profiledata.vendor != null
        ? ( 
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h4" color="textPrimary">Dados Pessoais</Typography>
                    </ThemeProvider>
                    <Grid container direction="row" spacing={2}>
                        <Grid item>
                            <img alt="Logotipo do Vendedor" className={classes.categoryImg} src={hostIP.hostIP + profiledata.vendor.img} />
                        </Grid>
                        <Grid item xs>
                            <Box mt={2}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="nome"
                                label="Nome"
                                name="nome"
                                value={profiledata.vendor.name}
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
                                value={profiledata.vendor.email}
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
                                value={profiledata.vendor.whatsapp}
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
                                id="setor"
                                label="Setor"
                                name="setor"
                                value={idToCategory(profiledata.vendor.setor)}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                    <InputAdornment position="end">
                                      <LockOutlinedIcon color="disabled"/>
                                    </InputAdornment>
                                )}}
                            />
                            </Box>
                        </Grid>
                    </Grid>
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
                            value={profiledata.vendor.endereco[0].cep}
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
                            value={profiledata.vendor.endereco[1].logradouro}
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
                            value={profiledata.vendor.endereco[5].numero}
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
                                    value={profiledata.vendor.endereco[2].bairro}
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
                                    value={profiledata.vendor.endereco[3].localidade}
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
                                    value={profiledata.vendor.endereco[4].uf}
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
export default VProfile;