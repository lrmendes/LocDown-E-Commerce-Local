import React, { useState,useEffect } from 'react';
import {useParams} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Box, Button, Divider, MenuItem, Select, TextField } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Sidebar from '../../../components/Sidebar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; 
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import api from '../../../services/api';
import { Link } from "react-router-dom";

import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useHistory } from 'react-router-dom';


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
        '&:hover': {
            boxShadow: '1px 2px 3px 1px rgba(0,0,0,0.4)',
        }
    },
    customBox: {
        padding: theme.spacing(2),
        textAlign: 'center',
        '&:hover': {
            boxShadow: '1px 2px 3px 1px rgba(0,0,0,0.4)',
            border: '1px solid #c6c6c6 rgba(0,0,0,0.1)',
            cursor: 'pointer',
            padding: 20,
        }
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    categoryImg: {
        width: '80%',
        '@media (min-width:600px)': {
            width: '50%',
        },
        [theme.breakpoints.up('md')]: {
            width: '50%',
        }
    },
    dialogCustom: {
        width: '90%',
        '@media (min-width:600px)': {
            width: '400px',
        },
        [theme.breakpoints.up('md')]: {
            width: '400px',
        }
    }
}));

function Products(props) {
    let { id } = useParams();
    //console.log(id);
    const history = useHistory();

    const [dialogOpen, setDialogOpen] = useState(false);

    const [photos,setPhotos] = useState({
        photoIndex: 0,
        isOpen: false,
    });

    const [data, setData] = useState({
        product: null,
        vendor: null,
    });

    const [notFound, setNotFound] = useState(false);
    const [msg, setMsg] = useState("Buscando dados do produto...");
    const [images,setImages] = useState([]);

    const [tipo, setTipo] = useState(null);

    useEffect(() => {
        //console.log("Chamou Vendedores Locais: ");
        api.get('productData', {
            headers: {
                productid: id,
            }
        }).then(response => {
            //console.log("recebeu:", response.data);
            //console.log("recebeu2:", response.data.product[0]);
            //console.log("recebeu3:", response.data.vendor[0]);
            if (!response.data) {
                //console.log("entrou aqui");
                setNotFound(true);
                //console.log('entoru');
                setMsg("Não foram encontrados vendedores dessa categoria em sua região.");
            }
            setData( { product: response.data.product[0], vendor: response.data.vendor[0] } );
            setImages([hostIP.hostIP+response.data.product[0].pictures[0], hostIP.hostIP+response.data.product[0].pictures[1]]);
            setTipo(response.data.product[0].stock[0].tipo);
        }).catch(err => {
            //console.log(err);
            setNotFound(true);
            setMsg("Não foi possível realizar a comunicação com o servidor. Tente novamente!");
        })
    }, [id]);

    async function generateOrder() {
        setDialogOpen(false);

        const datasend = {
            userId: localStorage.getItem('buyID'),
            productId: data.product._id,
            vendorId: data.product.vendorId,
            tipo: tipo,
        }

        try {
            //console.log("enviou: ",datasend);
            const response = await api.post('/orderAdd', datasend);
            alert("Compra Realizada com Sucesso!");
            history.push('/orders');
          } catch (err) {
              alert('Erro ao tentar registrar: ' + err);
          }
    }

    const classes = useStyles();

    const theme = createMuiTheme();

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
        fontSize: '1.4rem',
        '@media (min-width:600px)': {
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.5rem',
        }
    };

    return (
        <div className={classes.root}>
        <CssBaseline />
        <Sidebar currentPage={0} title={data.product != null ? data.product.name : "Produto"} />
        <main className={classes.content}>
        <div className={classes.toolbar} />
        { !notFound && data.product != null
        ? (
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                    <Paper className={classes.customBox} onClick={() => setPhotos({...photos, isOpen: true })}>
                        <img src={images[photos.photoIndex]} className={classes.categoryImg} />
                    </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <Grid container direction="column">
                        <Grid item style={{marginBottom: 10, textAlign: 'left'}}>
                            <Typography variant="h6" color="textPrimary">Características</Typography>
                        </Grid>
                       
                        <Divider style={{marginBottom: 10}} />

                        <Grid item style={{marginBottom: 10}}>
                            <Typography variant="h6" color="textPrimary" align="left"><b>{data.product.name}</b></Typography>
                        </Grid>

                        <Grid item style={{marginBottom: 10}}>
                            <Typography variant="body1" color="textPrimary" align="left"><b>Descrição: </b>{data.product.desc}</Typography>
                        </Grid>

                        <Divider style={{marginBottom: 10}} />

                        <Grid item style={{marginBottom: 10}}>
                            <Typography variant="body1" color="textPrimary" align="left"><b>Vendedor: </b>{data.vendor.name}</Typography>
                        </Grid>

                        <Grid item style={{marginBottom: 10}}>
                            <Typography variant="body1" color="textPrimary" align="left"><b>Endereço: </b>{data.vendor.endereco[1].logradouro},
                            {data.vendor.endereco[5].numero} - {data.vendor.endereco[2].bairro}.</Typography>
                        </Grid>

                        {data.product.stock.length == 1
                        ?   <Grid item style={{marginBottom: 10}}>
                                <Typography variant="body1" color="textPrimary" align="left"><b>Estoque Disponível: </b>{data.product.stock[0].quantidade}</Typography>
                             </Grid>
                        : null }

                        <Divider style={{marginBottom: 10}} />
                        <Grid container direction="row" alignItems="flex-end" justify="space-between" spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h5" color="textPrimary">R$ {data.product.price}</Typography>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                            { data.product.stock.length > 1 
                                ? 
                                    <FormControl className={classes.formControl}>
                                    <Select
                                      defaultValue={""}
                                      displayEmpty
                                      className={classes.selectEmpty}
                                      inputProps={{ 'aria-label': 'Without label' }}
                                      onChange={(e) => setTipo(e.target.value)} >
                                    <MenuItem value="" disabled>Tipo do Produto</MenuItem>
                                    {data.product.stock.map((item) => (
                                      <MenuItem key={item.tipo} value={item.tipo}>{item.tipo} ( {item.quantidade} disponível )</MenuItem>
                                    ))}

                                    </Select>
                                  </FormControl>
                                
                                : <Typography variant="body1">Produto com Tamanho Unico</Typography> }

                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>Comprar</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            </Grid>
        )
        : <Typography variant="h6"  align="center">{msg}</Typography>
        }

    

    {photos.isOpen && (
        <Lightbox
        mainSrc={images[photos.photoIndex]}
        nextSrc={images[(photos.photoIndex + 1) % images.length]}
        prevSrc={images[(photos.photoIndex + images.length - 1) % images.length]}
        onCloseRequest={() => setPhotos({...photos, isOpen: false })}
        onMovePrevRequest={() => setPhotos({...photos, photoIndex: (photos.photoIndex + images.length - 1) % images.length }) }
        onMoveNextRequest={() => setPhotos({...photos, photoIndex: ((photos.photoIndex + 1) % images.length) }) }
        />
    )}   

        <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Confirmar Compra</DialogTitle>
        <Box mr={4}>
        <DialogContent>
          <Box mb={1}>
          <Typography component={'span'} style={{marginTop: 10}} variant="body1" color="textPrimary" align="left"><b>Produto: </b>{data.product != null ? data.product.name : "Produto"}</Typography>
          </Box>
          <Box mb={1}>
          <Typography component={'span'} style={{marginTop: 10}} variant="body1" color="textPrimary" align="left"><b>Tipo: </b>{data.product != null ? tipo : "Tipo"}</Typography>
          </Box>
          <Box mb={1}>
          <Typography component={'span'} style={{marginTop: 10}} variant="body1" color="textPrimary" align="left"><b>Valor: </b>R$ {data.product != null ? data.product.price : "Preco"}</Typography>
          </Box>
        </DialogContent>
        </Box>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => { generateOrder() }} color="primary" variant="contained" >
            Adicionar
          </Button>
          </DialogActions>
        </Dialog>

    </main>
    </div>
    );
}

export default Products;