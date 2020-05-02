import React, {useState,useEffect} from 'react';
import {useParams} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Box, Button, Divider } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Sidebar from '../../../components/Sidebar';
import CssBaseline from '@material-ui/core/CssBaseline';

import api from '../../../services/api';
import productIcon from '../../../assets/productIcon.svg';
import { Link } from "react-router-dom";

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
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    categoryImg: {
        width: '50px',
        height: '50px',
        '@media (min-width:600px)': {
            width: '100px',
            height: '100px',
        },
    },
}));

function VendorProducts(props) {
    let { vendorId, vendorName } = useParams();

    const { window } = props;
    const classes = useStyles();

    const [products, setProducts] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [msg, setMsg] = useState("Buscando produtos do vendedor...");

    useEffect(() => {

        //console.log("Chamou Vendedores Locais: ");
        api.get('vendorProducts', {
            headers: {
                vendorId: vendorId
            }
        }).then(response => {
            
            if (!response.data.length) {
                setNotFound(true);
                setMsg("Não foram encontrados produtos desse vendedor.");
            }
            setProducts(response.data);
        }).catch(err => {
            setNotFound(true);
            setMsg("Não foi possível realizar a comunicação com o servidor. Tente novamente!");
        })
    }, [vendorId]);

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
        <Sidebar currentPage={0} title={`Loja ${vendorName}` } />
        <main className={classes.content}>
        <div className={classes.toolbar} />
            <Grid container spacing={3}>

            { !notFound && products.length
                ? (
                products.map(({_id,pictures,name,price,desc}) => ( 
                    (desc.length > 50 ? desc = desc.substring(0,50) + "..." : null),
                    <Grid key={_id} item xs={12} sm={4}>
                        <Paper className={classes.paper}>
                            <Grid container direction="row" justify="flex-start">
                                <img src={hostIP.hostIP+pictures[0]} className={classes.categoryImg} />
                                <Grid item>
                                    <Grid container direction="row" alignItems="flex-start">
                                        <Box ml={2}>
                                        <ThemeProvider theme={theme}>
                                            <Typography variant="h4"  align="left" style={{marginTop: 3}}>{name}</Typography>
                                            <Typography variant="body2" align="left" style={{marginLeft: 2, marginTop: 3}}>{desc}</Typography>
                                        </ThemeProvider>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Box mt={2} mb={2}>
                            <Divider />
                            </Box>
                            <Grid container direction="row" alignItems="flex-end" justify="space-between">
                                <Grid item>
                                    <Typography variant="h4" style={{marginLeft: 5}}>R$ {price}</Typography>
                                </Grid>
                                <Grid item>
                                    <Link to={`/produto/${_id}`} style={{ textDecoration: 'none' }}>
                                        <Button variant="contained" color="primary">Visualizar</Button>
                                    </Link>
                                </Grid>
                            
                            </Grid>
                        </Paper>
                    </Grid>
                )))
                : <Typography variant="h6"  align="center">{msg}</Typography>
            }

                
            </Grid>
        </main>
        </div>

    );
}

export default VendorProducts;