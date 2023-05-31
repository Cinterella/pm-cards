import React, { useEffect, useState } from 'react';
import Header from './Header'


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

const GetShopingInfo = () => {
  const [cards, setCards] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  //const [selectedCategory, setSelectedCategory] = useState('all');

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
      <div className='fixed-header'>
        <Header />
        
      </div>

      <div className="card-container">
        {/* Render your filter controls here */}
        <FormGroup style={{backgroundColor: "#f3f3f3"}}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3} sx={{ maxWidth: "900px", margin: "auto"}}>
            <Grid xs={6} sm={4} md={3} display="flex">
              <FormControlLabel
                control={<Checkbox checked={selectedCategories.includes("Infantil")} onChange={handleCategoryChange} name="Infantil" />}
                label="Infantil"
              />
            </Grid>
            <Grid xs={6} sm={4} md={3} display="flex">
              <FormControlLabel
                control={<Checkbox checked={selectedCategories.includes("Indumentaria")} onChange={handleCategoryChange} name="Indumentaria" />}
                label="Indumentaria"
              />
            </Grid>
            <Grid xs={6} sm={4} md={3} display="flex">
              <FormControlLabel
                control={<Checkbox checked={selectedCategories.includes("Indumentaria Unisex")} onChange={handleCategoryChange} name="Indumentaria Unisex" />}
                label="Indumentaria Unisex"
              />
            </Grid>
            <Grid xs={6} sm={4} md={3} display="flex">
              <FormControlLabel
                control={<Checkbox checked={selectedCategories.includes("Cigarrillos")} onChange={handleCategoryChange} name="Cigarrillos" />}
                label="Cigarrillos"
              />
            </Grid>
            <Grid xs={6} sm={4} md={3} display="flex">
              <FormControlLabel
                control={<Checkbox checked={selectedCategories.includes("Juguetería")} onChange={handleCategoryChange} name="Juguetería" />}
                label="Juguetería"
              />
            </Grid>
          </Grid>
          </Box>
        </FormGroup>
        {/* ... */}

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
      </div>
    </div>
  );
};

export default GetShopingInfo;