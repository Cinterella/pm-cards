import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
//import Header from './Header'

import { styled, useTheme } from '@mui/material/styles';

import { Card, CardHeader, CardActions, CardContent, Typography, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import Box from '@mui/joy/Box';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language';
import { Instagram , Facebook } from '@mui/icons-material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';




//import List from '@mui/joy/List';
//import ListItem from '@mui/joy/ListItem';
//import { StyledEngineProvider } from '@mui/joy/styles';
//import ListItem from '@mui/joy/ListItem';
//import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
//import AppBar from '@mui/material/AppBar';
import MuiAppBar from '@mui/material/AppBar';
//import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import List from '@mui/material/List';
//import ListItem from '@mui/material/ListItem';
//import ListItemButton from '@mui/material/ListItemButton';
//import ListItemIcon from '@mui/material/ListItemIcon';


//import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
//import LocalMallIcon from '@mui/icons-material/LocalMall';
//import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `0px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const GetShopingInfo = () => {
  const [cards, setCards] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        // Use the Google Sheets API to fetch the data from your spreadsheet
        //apiKey: "AIzaSyAIxeepIrQjzBOW23khBcC8SltbHGxQFPQ",
        //spreadsheetId: "1aw-hW9nUVYyeL02lei1FoO7SxFKIOPgU5ovDQaMC5wk",
        const response = await fetch(
          'https://sheets.googleapis.com/v4/spreadsheets/1aw-hW9nUVYyeL02lei1FoO7SxFKIOPgU5ovDQaMC5wk/values/puestos!A2:P200?key=AIzaSyAIxeepIrQjzBOW23khBcC8SltbHGxQFPQ'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch data from the spreadsheet.');
        }

        const data = await response.json();

        // Process the fetched data and transform it into the required format
        const transformedData = data.values.map((row) => ({
          //key	pasillo	local	nombre	categoria	detalle	icono	instagram	facebook	whatsapp	web	mail	imagen	description
          key: row[0],
          pasillo: row[1],
          local: row[2],
          nombre: row[3],
          category: row[4],
          detalle: row[5],
          icono: row[6],
          instagram: row[7],
          facebook: row[8],
          whatsapp: row[9],
          web: row[10],
          mail: row[11],
          imagen: row[12],
          description: row[13],
        }));

        setCards(transformedData);
      } catch (error) {
        console.error('Error fetching data from spreadsheet:', error);
      }
    };

    fetchSheetData();
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.name;
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((prevCategory) => prevCategory !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  const filteredCards = selectedCategories.length === 0
    ? cards
    : cards.filter((card) => selectedCategories.includes(card.category));

  return (
    <div>
     {/*  <div className='fixed-header'>
        <Header />
        
      </div> */}

      <div className="card-container">
        {/* Render your filter controls here */}


        <Box sx={{ }}>
          <CssBaseline />
          {/* <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 10 } }}
            aria-label="mailbox folders"
          > */}
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
              <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Nuestros Puestos
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <Typography variant="h6" noWrap component="div">
              Categorías
            </Typography>
          </List>
          <List>
            {['Indumentaria Deportiva', 'Indumentaria Femenina','Indumentaria Masculina','Indumentaria Unisex', 'Indumentaria Escolar', 'Indumentaria Infantil', 'Calzado', 'Accesorios', 'Seguridad', 'Cigarrillos'].map((text, index) => (
              <FormGroup key={index} style={{backgroundColor: "#f3f3f3", padding: "0 0 0 10px"}}>
                <FormControlLabel
                  control={<Checkbox checked={selectedCategories.includes(text)} 
                  onChange={handleCategoryChange} name={text} />}
                  label={text}
                />
            </FormGroup>
            ))}
          </List>
        </Drawer>
        
        {/* ... */}
        <Main>
          <Grid container justifyContent="center" rowSpacing={.5} sx={{ maxWidth: "1490px", margin: "auto"}}>
            {filteredCards.map((card, index) => (
              <Grid key={index} xs={12} sm={6} md={4} display="flex">
                <Card sx={{ maxWidth: 600, p: 0, m: 1 }}>
                  <CardHeader
                    sx={ { fontWeight:'bold' } }
                    title={ <strong style={{ textTransform:'uppercase' }} className="jaapokki"> {card.nombre} </strong> }
                    subheader={ <p style={{ margin: 0 }}><span><strong>Pasillo:</strong> {card.pasillo}</span> - <span><strong>Local:</strong> {card.local}</span><br/><span>{card.category}</span></p> }
                    avatar={ <Avatar alt={card.categoria} src={card.icono}></Avatar >}
                  />
                  <CardMedia
                    component="img"
                    height="200"
                    image={card.imagen}
                    alt="Punta Mogote"
                  />
                  <CardContent>
                    <Typography variant="body1" style={{ fontSize: "14px", textAlign: "left justified"}}>{card.description}</Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    { (card.whatsapp === "") ? "" : <IconButton aria-label="whatsapp" href={"https://wa.me/"+card.whatsapp} target="_blank"><WhatsAppIcon color="primary"/></IconButton> }
                    { (card.instagram === "") ? "" : <IconButton aria-label="instagram" href={"https://www.instagram.com/"+card.instagram} target="_blank"><Instagram color="primary"/></IconButton> }
                    { (card.facebook === "") ? "" : <IconButton aria-label="facebook" href={"https://www.facebook.com/"+card.facebook} target="_blank"><Facebook color="primary"/></IconButton> }
                    { (card.web === "") ? "" : <IconButton aria-label="web" href={card.web} target="_blank"><LanguageIcon color="primary"/></IconButton> }
                  </CardActions>

                </Card>
              </Grid>
            ))}
          </Grid>
        </Main>
        </Box>
      </div>

    </div>
  );
};


GetShopingInfo.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};



export default GetShopingInfo;