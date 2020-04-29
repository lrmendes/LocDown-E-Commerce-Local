import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Sidebar from '../../../components/Sidebar';
import {Grid, Paper, Box} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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



function Configs( props ) {
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
    <Sidebar currentPage={3} title={"Configurações"} />
      <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" alignItems="center">
          <Box pt={2} pb={4}>
          <Typography variant="h4">O que deseja comprar hoje?</Typography>
          </Box>
        </Grid>
        <Grid container spacing={3}>
                        
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper} onClick={() => {console.log("clicou");}}>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h4">Dados Pessoais</Typography>
                    </ThemeProvider>
                </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper} onClick={() => {console.log("clicou");}}>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h4">Endereço</Typography>
                    </ThemeProvider>
                </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper} onClick={() => {console.log("clicou");}}>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h4">Pagamento</Typography>
                    </ThemeProvider>
                </Paper>
            </Grid>
        </Grid>
      </main>
    </div>
  );
}
export default Configs;