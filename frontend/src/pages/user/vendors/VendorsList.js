import React from 'react';
import {useParams} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Box, Button } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Sidebar from '../../../components/Sidebar';
import CssBaseline from '@material-ui/core/CssBaseline';

import vendorIcon from '../../../assets/vendorIcon.svg';
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
        case '1':
            return "Roupa";
            break;
        case '2':
            return "Calçado";
            break;
        case '3':
            return "Eletrônicos";
            break;
        case '4':
            return "Brinquedos";
            break;
        default:
            return "";
            break;
    }
}

const vendors = [
    {id: 0, name: 'Gregory Store', address: 'Rua Porto Alegre, 33', picture: vendorIcon},
    {id: 1, name: 'Malu Vestidos', address: 'Avenida Brasil, 192', picture: vendorIcon},
    {id: 2, name: 'Veste Tudo', address: 'Avenida Aparecida da Sé, 559', picture: vendorIcon},
    {id: 3, name: 'Modas Brasil', address: 'Rua Curitiba, 45', picture: vendorIcon},
]

function VendorList(props) {
    let { id } = useParams();
    let category = idToCategory(id);
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
        <Sidebar currentPage={0} title={`Lojas de ${category}` } />
        <main className={classes.content}>
        <div className={classes.toolbar} />
            <Grid container spacing={3}>

                {vendors.map( ({id,name,address,picture}) => (
                    <Grid key={id} item xs={12} sm={6}>
                    <Link to={`/empresa/${id}`} style={{ textDecoration: 'none' }}>
                        <Paper className={classes.paper}>
                            <Grid container direction="row" justify="flex-start" alignItems="center">
                                <img src={picture} className={classes.categoryImg} />
                                <Grid item>
                                    <Box ml={2}>
                                    <ThemeProvider theme={theme}>
                                        <Typography variant="h4"  align="left">{name}</Typography>
                                        <Typography variant="body1" align="left" style={{marginLeft: 2, marginTop: 3}}>{address}</Typography>
                                    </ThemeProvider>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Link>
                    </Grid>
                ))}
            </Grid>
        </main>
        </div>

    );
}

export default VendorList;