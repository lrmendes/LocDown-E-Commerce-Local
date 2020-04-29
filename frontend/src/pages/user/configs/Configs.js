import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Sidebar from '../../../components/Sidebar';
import {Grid, Paper, Box, Button, Input, Divider, InputLabel, TextField} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';

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


function Configs( props ) {
  const { window } = props;
  const classes = useStyles();
  const theme = createMuiTheme();

  const apiCep = axios.create({
    baseURL: 'https://viacep.com.br/ws/',
    timeout: 2000,
  });

  const [cep, setCep] = useState("");

  
  const [endNum, setEndNum] = useState();

  const [address,setAddress] = useState(null);

  useEffect(() => {
      console.log(address)
  }, [address]);

 /* async function getAddressAPI() {
    try {
        const response = await apiCep.get(`${cep}/json`);
        console.log(response.data);
        setAddress({data: response.data});
        console.log('----');
        console.log(address);
    } catch (err) {
        alert('Não foi possível obter os dados para esse CEP.');
    }
    {
            cep: response.data.cep,
            logradouro: response.data.logradouro,
            bairro: response.data.bairro ,
            localidade: response.data.localidade ,
            uf: response.data.uf ,
        }
  }*/

  function getAddressAPI() {
    apiCep.get(`${cep}/json`)
    .then((response) => {
      console.log(response.data);
      setAddress(response.data);
    })
   .catch((error)=>{
      console.log(error);
   });
  }

  



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
    <Sidebar currentPage={3} title={"Configurações"} />
      <main className={classes.content}>
      <div className={classes.toolbar} />
        <Grid container spacing={3}>
                        
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h4" color="textPrimary">Dados Pessoais</Typography>
                    </ThemeProvider>
                </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Grid item>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h4" color="textPrimary">Endereço</Typography>
                        </ThemeProvider>
                        </Grid>
                        
                        { address != null
                        ? (
                            <Grid item style={{marginTop: 10}}>
                                <Grid container direction="column" alignItems="center">
                                    <Typography>{address.logradouro}</Typography>
                                    <Typography>{address.bairro}</Typography>
                                    <Typography>{address.localidade} - {address.uf}</Typography>
                                    <Typography>CEP: {address.cep}</Typography>
                                    <Box mt={2} mb={4}>
                                        <TextField
                                            id="standard-number"
                                            size="small"
                                            label="Número"
                                            type="number"
                                            onChange={(e) => setEndNum(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            style={{width: 80}}
                                            />
                                    </Box>
                                    <Button variant="contained" color="primary" onClick={ () => setAddress(null) }>Alterar/Remover</Button>
                                </Grid>
                            </Grid>
                        )
                        : (
                            <Grid item style={{marginTop: 25}}>
                                <FormControl>
                                    <Grid container direction="row">
                                    <InputLabel htmlFor="component-helper">CEP</InputLabel>
                                    <Input
                                    id="inputCep"
                                    onChange={(e) => setCep(e.target.value)}
                                    style={{width: 150}} />
                                    <Button variant="contained" color="primary" style={{marginLeft: 20}} onClick={getAddressAPI}>Buscar</Button>
                                    </Grid>
                                </FormControl>
                            </Grid>
                        )}

                    </Grid>
                </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h4" color="textPrimary">Pagamento</Typography>
                    </ThemeProvider>
                </Paper>
            </Grid>
        </Grid>
      </main>
    </div>
  );
}
export default Configs;