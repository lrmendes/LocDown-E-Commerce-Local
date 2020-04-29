import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  sidebarItem: {
    color: '#000000',
  },
  sidebarItemCurrent: {
    color: '#7f00ff',
  },
  customBar: {
    backgroundColor: '#7f00ff',
  },
  textData: {
    color: '#7f00ff',
  }
}));

function Sidebar( {currentPage = 0, title = 'DashBoard'}, ...props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuUser = [
    { name: 0, label: 'Inicio', route: '/home', Icon: HomeOutlinedIcon },
    { name: 1, label: 'Buscar', route: '/inventory', Icon: SearchOutlinedIcon},
    { name: 2, label: 'Carrinho', route: '/sales', Icon: AddShoppingCartOutlinedIcon},
    { name: 3, label: 'Configurações', route: '/configs', Icon: SettingsOutlinedIcon},
    { name: 4, label: 'Sair', route: '/fa', Icon: ExitToAppOutlinedIcon},
  ]

  const drawer = (
    <div>
      <div className={classes.toolbar} style={{  display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Typography variant={'h6'} style={{color: '#7f00ff'}}>BUY BUY</Typography></div>
      <Divider />
      <Box mt={1} style={{textAlign: 'center'}}>
      <Typography>Bem vindo,</Typography>
      <Typography className={classes.textData}>Lucas</Typography>
      <Box mt={1}>
      <Typography>Sua Região:</Typography>
      <Typography className={classes.textData}>Ponta Grossa</Typography>
      </Box>
      </Box>
      <Box mt={1}>
        <Divider />
      </Box>
      <List>
        {menuUser.map(({label, name, Icon, route, ...rest }) => (
          <Link key={label} to={route} style={{ textDecoration: 'none' }} >
            <Box mt={2}>
          <ListItem>
              <ListItemIcon><Icon className={ name === currentPage ? classes.sidebarItemCurrent : classes.sidebarItem } /></ListItemIcon>
              <ListItemText className={ name === currentPage ? classes.sidebarItemCurrent : classes.sidebarItem }>{label}</ListItemText>
          </ListItem>
            </Box>
          </Link>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.customBar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      </div>
  );
}

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Sidebar;