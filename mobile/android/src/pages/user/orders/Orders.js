import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import Sidebar from '../../../components/Sidebar';
import CssBaseline from '@material-ui/core/CssBaseline';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import api from '../../../services/api';

import WhatsAppIcon from '@material-ui/icons/WhatsApp';

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
    card: {
        display: 'flex',
        paddingLeft: '10px',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        alignContent: 'center',
        alignSelf: 'center',
        width: '64px',
        height: '64px',
    },
}));

function Orders(props) {
    let { id } = useParams();
    const classes = useStyles();
    //console.log(hostIP.hostIP)

    const [orders, setOrders] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [products, setProducts] = useState([]);

    const [notFound, setNotFound] = useState(false);
    const [msg, setMsg] = useState("Buscando seus pedidos...");

    useEffect(() => {

        //console.log("Chamou");
        api.get('orderList', {
            headers: {
                searchid: localStorage.getItem('buyID'),
                contid: localStorage.getItem('buyconta'),
            }
        }).then(response => {
            //console.log("recebeu:", response.data);
            if (!response.data.orders.length) {
                setNotFound(true);
                //console.log('entoru');
                setMsg("Nenhum pedido foi encontrado.");
            }
            setOrders(response.data.orders);
            setVendors(response.data.vendors);
            setProducts(response.data.products);
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

    function convertDate(data) {
        let d = new Date(data);
        function pad(s) { return (s < 10) ? '0' + s : s; }
        let result = [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
        return result + " - " + pad(d.getHours()) + ":" + pad(d.getMinutes());
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Sidebar currentPage={1} title={"Meus Pedidos"} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container spacing={3}>

                    {!notFound && orders.length && vendors.length && products.length
                        ? (
                            vendors.map((item,index) => (
                                <Grid key={index} item xs={12} md={4}>
                                    <CardActionArea>
                                        <Card className={classes.card}>
                                            <CardMedia component="img" className={classes.cardMedia} src={hostIP.hostIP + products[index][0].pictures[0]} />
                                            <div className={classes.cardDetails}>
                                                <CardContent>
                                                    <Typography variant="body2" color="textSecondary">{convertDate(orders[index].createdAt)}</Typography>
                                                    <Typography variant="h5" style={{marginTop: 5}}>{products[index][0].name}</Typography>
                                                    <Typography variant="body1"  style={{marginTop: 2}} color="textSecondary"><b>Tipo/Tamanho: </b> {orders[index].tipo}</Typography>
                                                    <Typography variant="body1" style={{marginTop: 2}} color="textSecondary"><b>Total: </b>R$ {products[index][0].price}</Typography>
                                                    <Typography variant="body1" style={{marginTop: 2}} color="textSecondary"><b>Vendedor: </b>{vendors[index][0].name}</Typography>
                                                    <Typography variant="body1" style={{marginTop: 2}} color="textSecondary"><b>Endereço: </b>{vendors[index][0].endereco[1].logradouro},{vendors[index][0].endereco[5].numero} - {vendors[index][0].endereco[2].bairro} </Typography>
                                                    <Button color="primary" style={{marginTop: 2}} variant="contained" href={`https://api.whatsapp.com/send?phone=55${vendors[index][0].whatsapp}&text=Olá, realizei a compra do produto "${products[index][0].name}" em "${convertDate(orders[index].createdAt)}".%0aTenho a seguinte dúvida:%0a`} endIcon={<WhatsAppIcon/>}>Contatar Vendedor</Button>
                                                </CardContent>
                                                </div>
                                        </Card>
                                    </CardActionArea>
                            </Grid>
                            ))
                        )
                        : <Typography variant="h6" align="center">{msg}</Typography>
                    }

                </Grid>
            </main>
        </div>

    );
}

export default Orders;