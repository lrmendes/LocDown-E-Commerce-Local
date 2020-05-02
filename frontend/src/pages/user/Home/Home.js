import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Grid, Paper, Box} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Sidebar from '../../../components/Sidebar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from "react-router-dom";


import imgCat1 from '../../../assets/category0.svg';
import imgCat2 from '../../../assets/category1.svg';
import imgCat3 from '../../../assets/category2.svg';
import imgCat4 from '../../../assets/category3.svg';

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
        maxWidth: '40%',
    },
}));

const categories = [
    {id: 0, name:'Roupas', route:'/categorias/0', icon:imgCat1 },
    {id: 1, name:'Calçados', route:'/categorias/1', icon:imgCat2},
    {id: 2, name:'Eletrônicos', route:'/categorias/2', icon:imgCat3},
    {id: 3, name:'Brinquedos', route:'/categorias/3', icon:imgCat4},
];

function Home( props ) {
  
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
    <Sidebar currentPage={0} title={"Inicio"} />
      <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" alignItems="center">
          <Box pt={2} pb={4}>
          <Typography variant="h4">O que deseja comprar hoje?</Typography>
          </Box>
        </Grid>
        <Grid container spacing={3}>
            {categories.map(({id, name, route, icon}) => (
                <Grid key={id} item xs={6} sm={3}>
                    <Link to={route} style={{ textDecoration: 'none' }}>
                        <Paper className={classes.paper} >
                            <img src={icon} className={classes.categoryImg} />
                            <ThemeProvider theme={theme}>
                                <Typography variant="h4">{name}</Typography>
                            </ThemeProvider>
                        </Paper>
                    </Link>
                </Grid>
            ))}    
        </Grid>
        </main>
        </div>
  );
}
export default Home;