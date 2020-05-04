import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, Box, Divider, Card, CardContent, CardMedia} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import SidebarVendor from '../../../components/SidebarVendor';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from "react-router-dom";

import { useHistory } from 'react-router-dom';
import { Button, InputLabel, TextField, Select, IconButton } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import api from '../../../services/api';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CheckIcon from '@material-ui/icons/Check';
import { green } from '@material-ui/core/colors';

const hostIP = require('../../../services/hostIP.json');

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        border: '1px solid #c6c6c6 rgba(0,0,0,0.1)',
        color: theme.palette.text.secondary,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
    modalButtonRegister: {
      color: '#ffffff',
      backgroundColor: '#2196F3',
      '&:hover': {
          backgroundColor: '#63004a'
       }
    },
    removeIcon: {
      color: '#00065c'
    },
    card: {
      display: 'flex',
      width: '100%',
      paddingLeft: '10px',
      border: '1px solid #c6c6c6 rgba(0,0,0,0.1)',
      boxShadow: '1px 2px 3px 2px rgba(0,0,0,0.1)',
    },
    cardDetails: {
        flex: 1,
    },
    cardItem: {
        marginTop: '4px',
    },
    cardMedia: {
        
        alignSelf: 'center',
        width: '64px',
        height: '64px',
        marginBottom: '4px',
    },
}));

function VProducts( props ) {
  
  const { window } = props;

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  //const [pictures, setPictures] = useState([]);
  const [file, setFile] = useState({ file: null });
  const [file2, setFile2] = useState({ file: null });
  
  const [stockU, setStockU] = useState([]);

  const [stock, setStock] = useState([]);
  const [stockType, setStockType] = useState(0);
  const [stockMult, setStockMult] = useState({
    tipo: "",
    quantidade: 0,
  })

  const history = useHistory();

  const [dialogOpen, setDialogOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [msg, setMsg] = useState("Buscando produtos...");

  useEffect(() => {

    //console.log("Chamou Vendedores Locais: ");
    api.get('vendorProducts', {
        headers: {
            vendorId: localStorage.getItem('buyID')
        }
    }).then(response => {
        if (!response.data.length) {
            setNotFound(true);
            setMsg("Você não possui produtos cadastrados.");
        }
        setProducts(response.data);
    }).catch(err => {
        setNotFound(true);
        setMsg("Não foi possível realizar a comunicação com o servidor. Tente novamente!");
    })
  }, []);

  const classes = useStyles();
  const theme = createMuiTheme();

  function removeStock(item) {
    let existsID = stock.findIndex(element => element.tipo === item.tipo);
    //console.log(stock);
    if (existsID !== -1) {
      setStock(stock.filter(element => { return element.tipo !== item.tipo } ));
      //console.log(stock);
    }
  }

  function handleRegister() {

    if (name === "" || !name) {
      return alert("O campo Nome deve ser preenchido");
    }
    if (price === "" || !price) {
        return alert("O campo Preço deve ser preenchido");
    }
    if (desc === "" || !desc) {
        return alert("O campo Descrição deve ser preenchido");
    }

    if (file.file == null || !file.file) {
      return alert("Você deve enviar uma imagem principal!");
    }
    if (file2.file == null || !file2.file) {
      return alert("Você deve enviar uma imagem secundária!");
    }

    if (stockType) {
      if ( stock.length == 0 || stock == [] ) {
        return alert("Você deve inserir itens no estoque!");
      } else {
        return handleRegisterSend();
      }
    } else {
      if ( stockU.length == 0 || stockU == [] ) {
        return alert("Você deve inserir um valor para o estoque!");
      } else {
        return handleRegisterSend();
      }
    }
  }

  async function handleRegisterSend() {
    //console.log("Passou nas validações");

    const data =
        {
            "name": name,
            "vendorId": localStorage.getItem('buyID'),
            "setor": localStorage.getItem('buysetor'),
            "desc": desc,
            "price": price,
            "localidade": localStorage.getItem('buylocal'),
            "pictures": "",
            "stock": stockU
        };

    if (stockType) {
      data.stock = stock;
    }

    const form = new FormData();
    form.append('data', JSON.stringify(data));
    form.append('img', file.file);
    form.append('img2', file2.file);

    const config = {
      headers: {
          'accept': 'application/json',
          'content-type': 'multipart/form-data'
      }
    };

    try {

      //console.log("enviou:",data);
      const response = await api.post('/vendorAddProduct', form, config);
      //console.log("recebeu");
      alert("O Produto foi Cadastrado!");
      
      //history.push('/vendor/home');
      const history2 = require("history").createBrowserHistory();
      history2.go(0);

    } catch (err) {
        alert('Erro ao tentar registrar: ' + err);
    }

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
    <SidebarVendor currentPage={0} title={"Produtos"} />
      <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h4" color="textPrimary">Cadastro de Produtos</Typography>
                </ThemeProvider>
                <Divider style={{marginTop:10, marginBottom: 10}} />
                
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
                                label="Nome"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="price"
                                label="Preço"
                                name="price"
                                type="number"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="desc"
                                label="Descrição"
                                id="desc"
                                multiline={true}
                                rows="5"
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <Typography variant="body1">Foto Principal:</Typography>
                          <input type="file" className={classes.input} id="contained-button-file" name="img" accept="image/*" onChange={(e) => { e.target.files[0] ? setFile({ file: e.target.files[0] }) : setFile({ file: null });  }} />
                          <label htmlFor="contained-button-file">
                              <Button fullWidth startIcon={<CloudUploadIcon />} endIcon={!file.file ? "" : <CheckIcon style={{ color: green[500] }} />} variant="contained" color="primary" component="span">
                                  Upload
                              </Button>
                          </label>
                          <Box mt={2}>
                          <Typography variant="body1">Foto Secundária:</Typography>
                          <input type="file" className={classes.input} id="contained-button-file2" name="img2" accept="image/*" onChange={(e) => { e.target.files[0] ? setFile2({ file: e.target.files[0] }) : setFile2({ file: null });  }} />
                          <label htmlFor="contained-button-file2">
                              <Button fullWidth startIcon={<CloudUploadIcon />} endIcon={!file2.file ? "" : <CheckIcon style={{ color: green[500] }} />} variant="contained" color="primary" component="span">
                                  Upload
                              </Button>
                          </label>
                          </Box>
                          <Grid item xs={12} style={{marginTop:20}}>
                            <InputLabel htmlFor="demo-simple-select-outlined-label">Estoque do Produto</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={stockType}
                                onChange={(e) => setStockType(e.target.value)}
                                label="Estoque do Produto"
                                variant="outlined"
                                fullWidth
                                inputProps={{
                                    name: 'key',
                                    id: 'standard-key-native-simple',
                                }}
                              >
                              <MenuItem key={'unico'} value={0}>Único</MenuItem>
                              <MenuItem key={'variado'} value={1}>Variado</MenuItem>
                              </Select>

                              <Grid item style={{marginTop: 10}}>
                                { !stockType
                                ? (
                                  <TextField
                                  variant="outlined"
                                  required
                                  fullWidth
                                  name="quant"
                                  label="Quantidade de Estoque"
                                  id="quant"
                                  type="number"
                                  onChange={(e) => setStockU([{tipo: 'Único', quantidade: e.target.value}])}
                                  />
                                  )
                                : <Button fullWidth onClick={() => setDialogOpen(true)} variant="contained" color="primary">Adicionar Estoque</Button>
                                }
                                { stockType 
                                ? stock.map((item) => (
                                    <Typography key={item.tipo+item.quantidade}>Tipo:{item.tipo} - Quantidade:{item.quantidade} <IconButton size="small" onClick={() => removeStock(item)} ><DeleteForeverOutlinedIcon className={classes.removeIcon}/></IconButton>
                                    </Typography>
                                ))
                                : null }
                              </Grid>

                          </Grid>
                        </Grid>
                  </Grid>
                  <Grid item style={{marginTop: 15}}>
                  <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleRegister}
                    >
                        Cadastrar
                    </Button>
                    </Grid>
                </form>
            </Paper>
        </Grid>

        <Grid item xs={12} sm={8}>
            <Paper className={classes.paper}>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Grid item>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h4" color="textPrimary">Meus Produtos</Typography>
                    </ThemeProvider>
                    <Divider style={{marginTop:10, marginBottom: 10}} />
                    </Grid>
                    <Grid container spacing={3}>
                    {!notFound && products.length
                        ? (
                            products.map(({ _id, pictures, name, price, desc }) => (
                                (desc.length > 50 ? desc = desc.substring(0, 50) + "..." : null),
                                <Grid key={_id} item xs={12} sm={4} >

                                    <Card className={classes.card} >
                                        <CardContent className={classes.cardDetails} >
                                            <Grid container direction="row"  alignItems="center" className={classes.cardItem} spacing={2}>
                                                <Grid item xs={3} >
                                                    <CardMedia component="img" className={classes.cardMedia} src={hostIP.hostIP + pictures[0]} />
                                                </Grid>
                                                <Grid item xs >
                                                    <Typography component="h2" variant="h5">
                                                        {name}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {desc}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            
                                            <Divider />
                                            <Grid container direction="row" justify="space-between" alignItems="center" className={classes.cardItem} spacing={2}>
                                                <Grid item >
                                                    <Typography variant="h5" color="textSecondary">
                                                        R$ {price}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Link to={`/vendor/produto/${_id}`} style={{ textDecoration: 'none' }}>
                                                        <Button variant="contained" color="primary">Visualizar</Button>
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )))
                        : <Typography variant="h6" align="center">{msg}</Typography>
                    }
                    </Grid>
                </Grid>
            </Paper>
        </Grid>

        <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Estoque Multíplo</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Adicionar Estoque Variado.
          </DialogContentText>

          < TextField
            variant="outlined"
            name="tipo"
            label="Tipo/Tamanho/Cor"
            id="tipo"
            onChange={(e) => setStockMult({tipo: e.target.value, quantidade: stockMult.quantidade})}
          />
          <Box mt={1} mb={1}></Box>
          < TextField
            variant="outlined"
            name="quantstock"
            label="Quantidade de Estoque"
            id="quantstock"
            type="number"
            onChange={(e) => setStockMult({tipo: stockMult.tipo, quantidade: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => { setStock([...stock, {tipo: stockMult.tipo, quantidade: stockMult.quantidade} ]); setDialogOpen(false); }} color="primary" variant="contained" >
            Adicionar
          </Button>
          </DialogActions>
        </Dialog>

      </Grid>
      </main>
      </div>
  );
}
export default VProducts;