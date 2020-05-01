import React, {useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, Box, Button, Input, InputLabel, TextField, Typography, Select} from '@material-ui/core';

import FormControl from '@material-ui/core/FormControl';

import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    width: '90%',
    '@media (min-width:600px)': {
        width: 400
    }
  },
  paper2: {
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: '#fcfcfc',
    border: '1px solid #c6c6c6 rgba(0,0,0,0.1)',
    color: theme.palette.text.secondary,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  submit: {
      backgroundColor: '#128209',
      padding: 15,
      color: '#ffffff',
      border: '1px solid #4BB543',
      borderRadius: 5,
      width: '200px',
      '@media (min-width:600px)': {
        width: 400
      },
      '&:hover': {
        backgroundColor: '185913'
      }
  }
}));


function Register( props ) {
  const classes = useStyles();

  const history = useHistory();

  const [isClient, setIsClient] = useState(true);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");


  async function handleLoginUser() {

    const data = 
    {
        "email": email,
        "password": senha
    };

    try {
        console.log('enviou: ',data);
        const response = await api.post('/auth/authenticate', data);

        localStorage.setItem('buyconta', 1);
        localStorage.setItem('buylocal', response.data.user.endereco[3].localidade);
        localStorage.setItem('buynome', response.data.user.name);

        history.push({
            pathname: "/home",
            state: { call: 'Login bem sucedido!' }
        });
    } catch (err) {
        console.log(err);
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
        console.log('enviou: ',data);
        const response = await api.post('/auth/authenticateVendor', data);

        localStorage.setItem('buyconta', 2);
        localStorage.setItem('buylocal', response.data.vendor.endereco[3].localidade);
        localStorage.setItem('buynome', response.data.vendor.name);

        history.push({
            pathname: "/vendor/home",
            state: { call: 'Login bem sucedido!' }
        });
    } catch (err) {
        console.log(err);
        alert('Error ao tentar logar Vendor.');
    }
  }

  function handleLogin() {
      if (isClient) {
          handleLoginUser();
      } else {
          handleLoginVendor();
      }
  }

  return (
      
    <div className={classes.root}>

        <Grid container direction="column" justify="center" alignItems="center" style={{marginTop: 40}}>
        <Typography variant="h5" style={{marginTop: 10}}>Login de {isClient ? 'Usuário' : 'Empresa'}</Typography>
            <Paper className={classes.paper} style={{marginTop: 10}}>
            <Grid item> 
                <Grid container style={{marginTop: 10}}>
                <Grid item xs={6} sm={6}>
                <Box ml={2}>
                    <Button variant="contained" style={{ width:'100%' }} onClick={ () => setIsClient(true)} color={isClient ? 'primary' : 'inherit' }>Usuário</Button>
                </Box>
                </Grid>
                <Grid item xs={6} sm={6}>
                <Box mr={2}>
                    <Button variant="contained" style={{ width:'100%' }} onClick={ () => setIsClient(false)} color={isClient ?  'inherit' : 'primary' }>Empresa</Button>
                </Box>
                </Grid>
                </Grid>
            </Grid>

            <Grid item className={classes.entrada}>
                <Box ml={2} mr={2}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="mail"
                    label="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                />
                </Box>
            </Grid>

            <Grid item className={classes.entrada}>
                <Box ml={2} mr={2}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="pass"
                    label="Senha"
                    type="password"
                    onChange={(e) => setSenha(e.target.value)}
                    fullWidth
                />
                </Box>
            </Grid>
            </Paper>
            <Grid item style={{marginTop: 20, marginBottom: 20}}>
                <button onClick={handleLogin} className={classes.submit} type="submit">Login</button>                    
            </Grid>
        </Grid>
    </div>
  );
}
export default Register;