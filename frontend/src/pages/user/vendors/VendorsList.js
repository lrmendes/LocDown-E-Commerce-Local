import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Box, Button } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Sidebar from '../../../components/Sidebar';
import CssBaseline from '@material-ui/core/CssBaseline';

import vendorIcon from '../../../assets/vendorIcon.svg';
import { Link } from "react-router-dom";
import api from '../../../services/api';

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
            cursor: 'pointer',
            boxShadow: '1px 2px 3px 1px rgba(0,0,0,0.2)',
            backgroundColor: '#ebebeb',
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
        width: '8%',
    },
}));

function idToCategory(id) {
    switch(id) {
        case '0':
            return "Roupa";
            break;
        case '1':
            return "Calçado";
            break;
        case '2':
            return "Eletrônicos";
            break;
        case '3':
            return "Brinquedos";
            break;
        default:
            return "";
            break;
    }
}

function VendorList(props) {
    let { id } = useParams();
    let category = idToCategory(id);
    const { window } = props;
    const classes = useStyles();

    const [vendors, setVendors] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [msg, setMsg] = useState("Buscando vendedores de sua região...");

    useEffect(() => {

        //console.log("Chamou Vendedores Locais: ");
        api.get('vendorlist', {
            headers: {
                Localidade: localStorage.getItem('buylocal'),
                Categoria: id,
            }
        }).then(response => {
            //console.log("recebeu:", response.data);
            if (!response.data.length) {
                setNotFound(true);
                //console.log('entoru');
                setMsg("Não foram encontrados vendedores dessa categoria em sua região.");
            }
            setVendors(response.data);
        }).catch(err => {
            //console.log(err);
            setNotFound(true);
            setMsg("Não foi possível realizar a comunicação com o servidor. Tente novamente!");
        })
    }, [id]);

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
        <Sidebar currentPage={0} title={`Lojas de ${category}` } />
        <main className={classes.content}>
        <div className={classes.toolbar} />
            <Grid container spacing={3}>

                { !notFound && vendors.length
                ? (
                vendors.map( ({_id,name,endereco,img}) => (
                    <Grid key={_id} item xs={12} sm={6}>
                    <Link to={`/empresa/${_id}/${name}`} style={{ textDecoration: 'none' }}>
                        <Paper className={classes.paper}>
                            <Grid container direction="row" justify="flex-start" alignItems="center">
                                <img src={hostIP.hostIP+img} className={classes.categoryImg} />
                                <Grid item>
                                    <Box ml={2}>
                                    <ThemeProvider theme={theme}>
                                        <Typography variant="h4"  align="left">{name}</Typography>
                                        <Typography variant="body1" align="left" style={{marginLeft: 2, marginTop: 3}}>{endereco[1].logradouro},{endereco[5].numero} - {endereco[2].bairro}</Typography>
                                    </ThemeProvider>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Link>
                    </Grid>
                ))
                )
                : <Typography variant="h6"  align="center">{msg}</Typography>
                }

            </Grid>
        </main>
        </div>

    );
}

export default VendorList;