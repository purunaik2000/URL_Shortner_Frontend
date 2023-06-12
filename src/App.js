import './App.css';
import { Button, AppBar, Typography, Toolbar, Switch, Box, TextField, Stack, Alert, AlertTitle, ButtonGroup } from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ContentCopy } from '@mui/icons-material';
// import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import EastSharpIcon from '@mui/icons-material/EastSharp';
import qrGenrator from 'qrcode';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

function App() {
  const [isDark, setIsDark] = useState(true);
  const [mode, setMode] = useState('dark');
  const [shortenUrl, setShortenUrl] = useState('');
  const [alert, setAlert] = useState(null);
  const [url, setUrl] = useState('');
  const [qrCode, setQrCode] = useState('');

  const theme = createTheme({
    palette: {
      mode: mode
    }
  });

  function toggle(e) {
    isDark ? setMode('light') : setMode('dark');
    setIsDark(!isDark);
  }

  function urlHandler(e){
    setUrl(e.target.value);
  }

  async function convertHandler(){
    setShortenUrl('');
    setQrCode('');
    if(!url.length || !url.trim().length){
      setAlert({
        type: 'error',
        msg: 'Please provide URL'
      });
    }else{
      try {
        let res;
        await axios.post(process.env.REACT_APP_URL,
          {
            longUrl: url
          }
        )
        .then((data)=>res=data.data)
        .catch(err=>setAlert({
          type: 'error',
          msg: err.response.data.message
        }));
        if(res){
          let {data, message} = res;
          setShortenUrl(data.shortUrl);
          setAlert({
            type: 'success',
            msg: message
          });
        }
      } catch (error) {
        console.log(error)
        setAlert({
          type: 'error',
          msg: 'Invalid Url'
        });
      }
    }
  }

  function handleCopy(){
    let element = document.getElementById('shorten');
    element.select();
    navigator.clipboard.writeText(element.value);
    setAlert({
      type: 'success',
      msg: 'Copied'
    })
  }

  async function handleGenrateQrCode(){
    try {
      const res = await qrGenrator.toDataURL(shortenUrl);
      setQrCode(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    setTimeout(()=>{
      setAlert(null);
    }, 10000)
  }, [alert])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="App" sx={
        {
          display: 'grid',
          width: '100vw',
          height: '100vh',
          gridTemplateRows: '8% 92%'
        }
      }>


        {/* Navbar */}
        <AppBar position='static' sx={{
          display: 'grid',
          gridTemplateColumns: '80% 20%'
        }}>
          <Toolbar sx={{
            display: 'flex'
          }}>
            <Typography
              variant='h6'
              component='div'
              m={2}
            >
              <Button sx={{
                color: 'white',
                fontSize: 'large'
              }}>
                Home
              </Button>
            </Typography>
            <Typography
              variant='h6'
              component='div'
              m={2}
            >
              <Button sx={{
                color: 'white',
                fontSize: 'large'
              }}>
                About
              </Button>
            </Typography>
          </Toolbar>
          <Toolbar sx={{
            display: 'flex'
          }}>
            <MaterialUISwitch checked={isDark} onClick={toggle} />
          </Toolbar>
        </AppBar>

        {/* Main Container */}
        <Box sx={{
          display: 'grid',
          gridTemplateRows: '30% 30% 1fr'
        }} >

          {/* Alert Box */}
          {
            alert &&
            <Stack sx={{
              position: 'absolute',
              width: '100%'
            }} spacing={1} >
              <Alert severity={alert.type} direction='row' >
                <AlertTitle><strong>{alert.type.toUpperCase() + ' : ' + alert.msg} </strong></AlertTitle>
              </Alert>
            </Stack>
          }

          {/* Url Container */}
          <Box sx={{
            display: 'flex',
            marginTop: '10vh',
            justifySelf: 'center',
            height: '20vh'
          }}>
            <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>

              <TextField placeholder='URL' value={url} onChange={urlHandler} sx={{
                width: { xs: '90vw', sm: '50vw'}
              }} />

              <Button sx={{
                width: {xs: '90vw', sm: '20vw'},
                height: '4em',
              }} variant='outlined' m={2} onClick={convertHandler}>Convert</Button>

            </Stack>
          </Box>

          {/* Shorten Url container */}
          {shortenUrl
            &&
            <Box sx={{
              display: 'flex',
              justifySelf: 'center'
            }}>

              <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>

                <TextField id='shorten' sx={{
                  width: { xs: '90vw', sm: '40vw'}
                }} value={shortenUrl} ></TextField>

                <ButtonGroup aria-label='medium secondary button group' sx={{
                  height: '3.5em',
                  display: {xs: 'inline', sm: 'flex'},
                  direction: 'row'
                }}>
                  <Button onClick={handleCopy}><ContentCopy/></Button>
                  <Button onClick={handleGenrateQrCode}><QrCode2Icon/></Button>
                  <Button component='a' target='_blank' href={shortenUrl} ><EastSharpIcon/></Button>
                </ButtonGroup>
              </Stack>

            </Box>
          }

          {
            qrCode &&
            <Box sx={{
              display: 'flex',
              justifySelf: 'center'
            }}>
              <a href={qrCode} download>
                <img src={qrCode} alt='qrcode'/>
              </a>
            </Box>
          }
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
