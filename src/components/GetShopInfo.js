import React from 'react';
import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import config from "../config";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import LanguageIcon from '@mui/icons-material/Language';
import { Instagram , Facebook } from '@mui/icons-material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
//import GetCategoty from './GetCategory'

const APIKEY = global.config.credentials.apiKey;
const SPREADSHEET_ID = global.config.credentials.spreadsheetId;
const RANGE = global.config.credentials.ranges.puestos;

function GetShopInfo(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const [data, setData] = useState([]);
  //const data = props.data;

  const handleSelectChange = (event) => {
    // Update the state with the selected option
    setSelectedOption(event.target.value); 
  };
  let category = ""

  useEffect(() => {
    // Load the Google API client library
    gapi.load("client", () => {
      gapi.client.init({
        apiKey: APIKEY,
        discoveryDocs: [
          "https://sheets.googleapis.com/$discovery/rest?version=v4",
        ]
      });

      // Authenticate the user and load the spreadsheet data
      gapi.client.load("sheets", "v4", () => {
        gapi.client.sheets.spreadsheets.values
          .get({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE,
          })          
          .then((response) => {
            setData(response.result.values);
          })
          .catch((error) => {
            console.log("Error loading data from Google Sheets:", error);
          });
      });
    });    
  }, []);
  
    return (
        <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
            {data.map( (row, index) => (
              <Card key={index} sx={{ maxWidth: 345, p: 0, m: 2 }}>
                    
                <CardHeader
                    sx={ { fontWeight:'bold' } }
                    action={ <IconButton aria-label="settings"></IconButton> }
                    title={ <strong style={{ textTransform:'uppercase' }}> {row[3]} </strong> }
                    subheader={ 'Pasillo: '+ row[1] +' - Puesto: '+row[2] }
                    avatar={ <Avatar alt={row[4]+' '+row[5]} src={row[6]}></Avatar >}
                />
                <CardMedia
                    component="img"
                    height="200"
                    image={row[12]}
                    alt="Punta Mogote"
                />
                <CardContent>
                  <Typography variant="body1" color="text.secondary">
                      {row[13]}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    { (row[9] === "") ? "" : <IconButton aria-label="whatsapp" href={'https://wa.me/'+row[9]} target="_blank"><WhatsAppIcon color="primary"/></IconButton> }

                    { (row[7] === "") ? "" : <IconButton aria-label="instagram" href={row[7]} target="_blank"><Instagram color="primary"/></IconButton> }

                    { (row[8] === "") ? "" : <IconButton aria-label="facebook" href={row[8]} target="_blank"><Facebook color="primary"/></IconButton> }

                    { (row[10] === "") ? "" : <IconButton aria-label="web" href={row[10]} target="_blank"><LanguageIcon color="primary"/></IconButton> }
                </CardActions>

              </Card>
            )
            )}
        </Grid>
    );
}

export default GetShopInfo;