import React, { useState } from 'react';
import {useParams} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Box, Button, Divider, MenuItem, Select } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Sidebar from '../../../components/Sidebar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; 


import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import productIcon from '../../../assets/productIcon.svg';
import { Link } from "react-router-dom";

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
}));

const product = {
    id: 0,
    name: '' ,
    sectorId: 0,
    vendorId: '',
    preco:  199.99,
    attributes: [
        { Gênero: 'XX' },
        { Cor: 'YY' },
        { Observação: 'Um texto muito grande Um texto muito grande Um texto muito grande Um texto muito grande Um texto muito grande'}
    ],
    pictures: [
        'http://192.168.1.28:3000/uploads/empresaID_produtoID_img1.jpg',
        'http://192.168.1.28:3000/uploads/empresaID_produtoID_img2.jpg',
        'http://192.168.1.28:3000/uploads/empresaID_produtoID_img3.jpg' ],
    estoque: [
        { tipo: 36, quantidade: 1 },
        { tipo: 36, quantidade: 4 },
    ]
};
    

const images = product.pictures;

function Products(props) {
    const [photos,setPhotos] = useState({
        photoIndex: 0,
        isOpen: false,
    })

    let { id } = useParams();
    let vendorName = id;
    const { window } = props;
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
        <Sidebar currentPage={0} title={`Produto: ${id}` } />
        <main className={classes.content}>
        <div className={classes.toolbar} />
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                    <Paper className={classes.customBox} onClick={() => setPhotos({...photos, isOpen: true })}>
                        <img src={images[0]} className={classes.categoryImg} />
                    </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <Grid container direction="column">
                        <Grid item style={{marginBottom: 10, textAlign: 'left'}}>
                            <Typography variant="h6" color="textPrimary">Características</Typography>
                        </Grid>
                       
                        <Divider style={{marginBottom: 10}} />
                        
                        { product.attributes.map( (attribute) => (
                            <Grid key={Object.keys(attribute)} item style={{marginBottom: 10, textAlign: 'left'}}>
                                <Typography variant={Object.keys(attribute) == 'Observação' ? "body1" : "h6"} ><b>{Object.keys(attribute)}:</b> {attribute[Object.keys(attribute)]}</Typography>
                            </Grid>
                        )) }
                        <Divider style={{marginBottom: 10}} />
                        <Grid container direction="row" alignItems="flex-end" justify="space-between" spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h6" color="textPrimary">R$ {product.preco}</Typography>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                { product.estoque.length > 1 
                                ? (
                                    <FormControl className={classes.formControl}>
                                    <Select
                                        defaultValue={""}
                                      displayEmpty
                                      className={classes.selectEmpty}
                                      inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                      <MenuItem value="" disabled>
                                        Selecionar
                                      </MenuItem>
                                      <MenuItem value={10}>44</MenuItem>
                                      <MenuItem value={20}>45</MenuItem>
                                      <MenuItem value={30}>46</MenuItem>
                                    </Select>
                                    <FormHelperText>Tamanho do Produto</FormHelperText>
                                  </FormControl>
                                )
                                : <Typography variant="body1">Produto com Tamanho Unico</Typography> }
                            </Grid>
                            <Grid item xs={6} sm={4}>
                            <Link to={`/produto/X`} style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="primary">Comprar</Button>
                            </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

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
                
            </Grid>
        </main>
        </div>

    );
}

export default Products;