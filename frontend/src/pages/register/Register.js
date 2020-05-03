import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Box, Button, Input, InputLabel, TextField, Typography, Select } from '@material-ui/core';
import { CssBaseline, Container, Avatar, FormControlLabel, Checkbox, MenuItem } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CheckIcon from '@material-ui/icons/Check';
import { green } from '@material-ui/core/colors';
import axios from 'axios';
import { Link } from "react-router-dom";

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import FormControl from '@material-ui/core/FormControl';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    toggleContainer: {
        margin: theme.spacing(2, 0),
    },
    input: {
        display: 'none',
    },
}));


function Register(props) {
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
            .catch((error) => {
                alert('Verifique o cep digitado! O cep deve conter somente números!');
            });
    }

    const history = useHistory();

    const apiCep = axios.create({
        baseURL: 'https://viacep.com.br/ws/',
        timeout: 2000,
    });

    const [alignment, setAlignment] = React.useState('usuario');

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    
    const [whats, setWhats] = useState("");

    const [cep, setCep] = useState("");
    const [address, setAddress] = useState(null);
    const [endNum, setEndNum] = useState("");

    const [isClient, setIsClient] = useState(true);
    const [file, setFile] = useState({
        file: null
    });
    const [setor, setSetor] = useState(0);

    useEffect(() => {

    }, [address]);

    function handleRegister() {
        if (name === "" || !name) {
            return alert("O campo nome deve ser preenchido");
        }
        if (email === "" || !email) {
            return alert("O campo email deve ser preenchido");
        }
        if (senha === "" || !senha) {
            return alert("O campo senha deve ser preenchido");
        }
        if (cep === "" || !cep) {
            return alert("O campo CEP deve ser preenchido!");
        }
        if (address === null || !address) {
            return alert("Você deve buscar um cep válido!");
        }
        if (endNum === "" || !endNum) {
            return alert("O campo numero deve ser preenchido!");
        }

        if (alignment == 'usuario') {
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
            "whatsapp": whats,
            "endereco": [
                { "cep": cep },
                { "logradouro": address.logradouro },
                { "bairro": address.bairro },
                { "localidade": address.localidade },
                { "uf": address.uf },
                { "numero": endNum }
            ],
            "password": senha
        };

        try {
            const response = api.post('/auth/register', data);
            alert('Cadastro Realizado!');
            history.push({
                pathname: "/login",
                state: { call: 'Registro bem sucedido!' }
            });
        } catch (err) {
            alert('Erro ao tentar registrar! Tente novamente com outro email!');
        }

    }

    async function handleVendor() {

        if (file.file == null || !file.file) {
            return alert("Você deve enviar uma imagem!");
        }

        const data =
        {
            "name": name,
            "email": email,
            "whatsapp": whats,
            "setor": setor,
            "endereco": [
                { "cep": cep },
                { "logradouro": address.logradouro },
                { "bairro": address.bairro },
                { "localidade": address.localidade },
                { "uf": address.uf },
                { "numero": endNum }
            ],
            "img": "",
            "password": senha
        };

        const form = new FormData();
        form.append('data', JSON.stringify(data));
        form.append('img', file.file);

        const config = {
            headers: {
                'accept': 'application/json',
                'content-type': 'multipart/form-data'
            }
        };

        try {
            const response = await api.post('/auth/registervendor', form, config);
            //console.log(response);
            alert('Cadastro Realizado!');
            history.push({
                pathname: "/login",
                state: { call: 'Registro bem sucedido!' }
            });
        } catch (err) {
            alert('Error ao tentar registrar: ' + err);
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
                    Cadastro
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
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="nome"
                                name="nome"
                                autoComplete="nome"
                                label={alignment == 'usuario' ? "Nome" : "Empresa"}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="whats"
                                label="Whatsapp (DDD+Numero)"
                                type="number"
                                name="whats"
                                onChange={(e) => setWhats(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </Grid>
                        {address != null
                            ? (
                                <Grid container direction="column" alignItems="center">
                                    <Typography>{address.logradouro}</Typography>
                                    <Typography>{address.bairro}</Typography>
                                    <Typography>{address.localidade} - {address.uf}</Typography>
                                    <Typography>CEP: {address.cep}</Typography>

                                    <TextField
                                        id="standard-number"
                                        size="small"
                                        label="Número"
                                        type="number"
                                        onChange={(e) => setEndNum(e.target.value)}
                                        size="small"
                                        variant="outlined"
                                        style={{ width: 80, marginBottom: 2 }}
                                    />
                                    <Button size="small" variant="contained" color="primary" onClick={() => setAddress(null)}>Alterar/Remover</Button>
                                </Grid>
                            )
                            : (


                                <Grid item xs={8}>
                                    <TextField
                                        id="inputCep"
                                        variant="outlined"
                                        label="CEP"
                                        required
                                        size="small"
                                        onChange={(e) => setCep(e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                            )}
                        {address == null ?
                            (
                                <Grid item xs={4}>
                                    <Button size="large" fullWidth variant="contained" color="primary" onClick={getAddressAPI}>Buscar</Button>
                                </Grid>
                            ) : null}

                        {alignment == 'empresa'
                            ? (
                                <Grid item xs={12}>
                                    <InputLabel htmlFor="demo-simple-select-outlined-label">Setor da Empresa</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={setor}
                                        onChange={(e) => setSetor(e.target.value)}
                                        label="Setor da Empresa"
                                        variant="outlined"
                                        fullWidth
                                        inputProps={{
                                            name: 'key',
                                            id: 'standard-key-native-simple',
                                        }}
                                    >
                                        <MenuItem key={'roupas'} value={0}>Roupas</MenuItem>
                                        <MenuItem key={'calçados'} value={1}>Calçados</MenuItem>
                                        <MenuItem key={'eletronicos'} value={2}>Eletrônicos</MenuItem>
                                        <MenuItem key={'brinquedos'} value={3}>Brinquedos</MenuItem>
                                    </Select>
                                </Grid>
                            ) : null}

                        {alignment == 'empresa'
                            ? (
                                <Grid item xs={12}>

                                    <Typography variant="body1">Logo/Imagem da Empresa:</Typography>

                                    <input type="file" className={classes.input} id="contained-button-file" name="img" accept="image/*" onChange={(e) => { e.target.files[0] ? setFile({ file: e.target.files[0] }) : setFile({ file: null });  }} />
                                    <label htmlFor="contained-button-file">
                                        <Button fullWidth startIcon={<CloudUploadIcon />} endIcon={!file.file ? "" : <CheckIcon style={{ color: green[500] }} />} variant="contained" color="primary" component="span">
                                            Upload
                                        </Button>
                                    </label>

                                </Grid>
                            ) : null}


                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleRegister}
                    >
                        Cadastrar
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link  to={'/login'} style={{ textDecoration: 'none' }} >
                                <Button style={{textDecoration: 'none', color: 'blue'}} endIcon={<ExitToAppOutlinedIcon />}>Já possui uma conta? Entrar</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container >

    );
}
export default Register;