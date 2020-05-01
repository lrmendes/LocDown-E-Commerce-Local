import React, {useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, Box, Button, Input, InputLabel, TextField, Typography, Select} from '@material-ui/core';
import axios from 'axios';

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
  categoryImg: {
      maxWidth: '40%',
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

  function getAddressAPI() {
    if (cep.length != 8) {
        return alert('Verifique o cep digitado! O cep deve conter somente números!');
    } 

    apiCep.get(`${cep}/json`)
    .then((response) => {
      if (response.data.erro) {
        return alert('Verifique o cep digitado! O cep deve conter somente números!');
      }
      setAddress(response.data);
    })
   .catch((error)=> {
       alert('Verifique o cep digitado! O cep deve conter somente números!');
       console.log(error);
   });
  }

  const history = useHistory();

  const apiCep = axios.create({
    baseURL: 'https://viacep.com.br/ws/',
    timeout: 2000,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  const [cep, setCep] = useState("");
  const [address,setAddress] = useState(null);
  const [endNum, setEndNum] = useState("");

  const [isClient, setIsClient] = useState(true);
  const [file, setFile] = useState(null);
  const [setor, setSetor] = useState(0);

  useEffect(() => {
      
  }, [address]);    

  function handleRegister() {
    if (name === "" || !name ) {
        return alert("O campo nome deve ser preenchido");
    }
    if (email === "" || !email ) {
        return alert("O campo email deve ser preenchido");
    }
    if (senha === "" || !senha ) {
        return alert("O campo senha deve ser preenchido");
    }
    if (cep === "" || !cep ) {
        return alert("O campo CEP deve ser preenchido!");
    }
    if (address === null || !address ) {
        return alert("Você deve buscar um cep válido!");
    }
    if (endNum === "" || !endNum) {
        return alert("O campo numero deve ser preenchido!");
    }    

      if (isClient) {
          handleClient();
      } else {
          handleVendor();
      }
  }

  async function handleClient() {
    const data = 
    {
        "name": name,
        "email": email,
        "endereco": [
            {"cep" : cep},
            {"logradouro": address.logradouro},
            {"bairro": address.bairro},
            {"localidade": address.localidade},
            {"uf": address.uf },
            {"numero": endNum}
        ],
        "password": senha
    };

    try {
        const response = await api.post('/auth/register', data);
        console.log(response.data);
    } catch (err) {
        alert('Error ao tentar registrar.');
    }

  }

  async function handleVendor() {

    if (file != null || !file) {
        return alert("Você deve enviar uma imagem!");
    }

    const data = 
    {
        "name": name,
        "email": email,
        "endereco": [
            {"cep" : cep},
            {"logradouro": address.logradouro},
            {"bairro": address.bairro},
            {"localidade": address.localidade},
            {"uf": address.uf },
            {"numero": endNum}
        ],
        "img": "",
        "password": senha
    };

    const form = new FormData();
    form.append('data', JSON.stringify(data));
    if (file != null && file) {
        form.append('img', file.file);
    } else {
        form.append('img','none');
    }
    
    
    const config = {
        headers: {
            'accept': 'application/json',
            'content-type': 'multipart/form-data'
        }
    };

    try {
        const response = await api.post('/auth/registervendor', form, config);
        history.push({
            pathname: "/login",
            state: { call: 'Registro bem sucedido!' }
        });
    } catch (err) {
        alert('Error ao tentar registrar.');
    }
  }

  return (
      
    <div className={classes.root}>

        <Grid container direction="column" justify="center" alignItems="center" style={{marginTop: 40}}>
        <Typography variant="h5" style={{marginTop: 10}}>Registro de {isClient ? 'Usuário' : 'Empresa'}</Typography>
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
                    id="name"
                    label={isClient ? "Nome" : "Empresa" }
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
                </Box>
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

            { !isClient 
            ? ( 

                <div>
                <Grid item style={{marginTop: 15}}>
                    <Box ml={2} mr={2}>
                    <InputLabel htmlFor="standard-key-native-simple">Setor da Empresa</InputLabel>
                    <Select
                        fullWidth
                        native
                        variant='standard'
                        onChange={ (e) => setSetor(e.target.value) }
                        value={setor}
                        inputProps={{
                        name: 'key',
                        id: 'standard-key-native-simple',
                        }}
                    >
                        <option key={'roupas'} value={0}>Roupas</option>
                        <option key={'calçados'} value={1}>Calçados</option>
                        <option key={'eletronicos'} value={2}>Eletrônicos</option>
                        <option key={'brinquedos'} value={3}>Brinquedos</option>
                    </Select>
                    </Box>
                </Grid>

                <Grid item style={{marginTop: 15}}>
                    <Paper className={classes.paper2}>
                    <Typography variant="body1">Logo/Imagem da Empresa:</Typography>
                    <Box mt={1}>
                        <input type="file" name="img" accept="image/*" onChange={ (e) => setFile({file:e.target.files[0]}) } />
                    </Box>
                    </Paper>
                </Grid>
                </div>
            )
            : null }

            <Grid item style={{ marginTop: 10 }}>
            <Paper className={classes.paper2}>
              {address != null
                ? (
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
                            style={{ width: 80 }}
                        />
                    </Box>
                    <Button size="small" variant="contained" color="primary" onClick={() => setAddress(null)}>Alterar/Remover</Button>
                </Grid>
                )
                : (
                <FormControl>
                    <Grid container direction="row">
                        <InputLabel htmlFor="component-helper">CEP</InputLabel>
                        <Input
                            id="inputCep"
                            type="number"
                            onChange={(e) => setCep(e.target.value)}
                            width="50px"
                        />
                        <Button variant="contained" color="primary" onClick={getAddressAPI}>Buscar</Button>
                    </Grid>
                </FormControl>
                )}
            </Paper>
            </Grid>
            </Paper>
            <Grid item style={{marginTop: 20, marginBottom: 20}}>
                <button onClick={handleRegister} className={classes.submit} type="submit">CADASTRAR</button>                    
            </Grid>
        </Grid>
    </div>
  );
}
export default Register;