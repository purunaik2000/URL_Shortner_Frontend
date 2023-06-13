import { Box} from '@mui/material';
import React from 'react';

export default function About() {
  return (
      <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box component={'h1'} color='primary' sx={{
            justifySelf: 'center',
            alignSelf: 'center'
        }}>
            Url Shortner
        </Box>
        <Box ml={2} sx={{
            width: {
                xs: '90%',
                sm: '80%'
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <ul style={{
                fontSize: '1.2rem',
                textAlign: 'left'
            }}>
                <li>
                    This is a basic ans simple application to shortena ans URL.
                </li>
                <li>
                    To short an URL you have to paste your url in URL box and click convert button.
                </li>
                <li>
                    After processing you will get shorten URL.
                </li>
                <li>
                    You will have 3 buttons for shorten URL.
                </li>
                <li>
                    First button is for copy the URL into the clipboard.
                </li>
                <li>
                    Second button is to genrate QR Code.
                </li>
                <li>
                    After genrating QR Code you can download QR Code by single click on image of QR Code.
                </li>
                <li>
                    The third and last button is to visite to the origial website using shorten URL.
                </li>
            </ul>
        </Box>
      </Box>
  );
}
