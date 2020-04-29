import React from 'react';
import {useParams} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Box, Button, Divider } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Sidebar from '../../../components/Sidebar';
import CssBaseline from '@material-ui/core/CssBaseline';

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
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    categoryImg: {
        width: '30%',
    },
}));

const products = [
    {id: 0, name: 'Adidas Shot', attribute: 'Masculino', price: 199.99, picture: productIcon},
    {id: 1, name: 'Nike Max', attribute: 'Feminino', price: 299.99, picture: productIcon},
    {id: 2, name: 'Asics Gel Rocket', attribute: 'Masculino', price: 189.90, picture: productIcon},
    {id: 3, name: 'Adidas Retro', attribute: 'Masculino', price: 250.00, picture: productIcon}
]

function VendorProducts(props) {
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
        <Sidebar currentPage={0} title={`Loja ${id}` } />
        <main className={classes.content}>
        <div className={classes.toolbar} />
            <Grid container spacing={3}>

                {products.map(({id,name,attribute, price, picture}) => ( 
                    <Grid key={id} item xs={12} sm={4}>
                        <Paper className={classes.paper}>
                            <Grid container direction="row" justify="flex-start">
                                <img src={picture} className={classes.categoryImg} />
                                <Grid item>
                                    <Grid container direction="row" alignItems="flex-start">
                                        <Box ml={2}>
                                        <ThemeProvider theme={theme}>
                                            <Typography variant="h4"  align="left" style={{marginTop: 3}}>{name}</Typography>
                                            <Typography variant="body2" align="left" style={{marginLeft: 2, marginTop: 3}}>{attribute}</Typography>
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
                                    <Link to="/empresa/1" style={{ textDecoration: 'none' }}>
                                        <Button variant="contained" color="primary">Visualizar</Button>
                                    </Link>
                                </Grid>
                            
                            </Grid>
                        </Paper>
                    </Grid>
                ))}

                
            </Grid>
        </main>
        </div>

    );
}

export default VendorProducts;