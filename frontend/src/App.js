import React, { useState } from 'react';
import './App.css';
import Button from './components/Button/Button';
import Heading from './components/Heading/Heading'
import Input from './components/Input/Input';
import Loading from './components/Loading/Loading';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Backdrop, IconButton } from '@mui/material';
import Result from './components/Result/Result';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

const BASE_URL = process.env.REACT_APP_BASE_URL

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarStatus({ open: false, severity: "", message: "" });
  };
  const shortenLink = async () => {
    const link = document.getElementById("url").value
    const backhalf = document.getElementById("backhalf").value

    if (link.length === 0) {
      setSnackbarStatus({ open: true, severity: "error", message: "URL cannot be empty" })
      return
    }

    // if (backhalf.length > 9) {
    //   setSnackbarStatus({ open: true, severity: "error", message: "Back Half length cannot be more than 9" })
    //   return
    // }

    setLoading(true)
    const response = await fetch(`${BASE_URL}/short`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "url": link,
        "back_half": backhalf
      }),
    });
    setLoading(false)
    const json = await response.json();
    if (!json.success) {
      setSnackbarStatus({ open: true, severity: "error", message: json.message });
      return
    }
    setResults(json.shortenUrl)
    setOpen(true)
    document.getElementById("url").value = ""
    document.getElementById("backhalf").value = ""
    console.log(results)
  }
  return (
    <div className="container">
      <Snackbar
        open={snackbarStatus.open}
        anchorOrigin={{vertical:'bottom', horizontal:'center'}}
        autoHideDuration={3000}
        onClose={handleClose}>
        <Alert
          severity={snackbarStatus.severity}
          sx={{ width: "100%" }}
          onClose={handleClose}>
          {snackbarStatus.message}
        </Alert>
      </Snackbar>

      <Backdrop
        className='backdrop'
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "#1a1a1d" }}
        open={open}>
        <h1 className='result-head'>Your Shorten URL</h1>
        {results.map((link) => {
          return <Result key={link} link={link} />
        })}
        <Tooltip
          title="Close"
          placement="bottom"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          arrow>
          <IconButton onClick={() => setOpen(false)}>
            <i className="fa-solid fa-xmark close-btn"></i>
          </IconButton>
        </Tooltip>
      </Backdrop>

      {loading && <Loading />}
      <Heading />
      <Input id="url" placeholder="Your URL here." />
      <br></br>
      <Input id="backhalf" placeholder="Slug (Optional)" />
      <br></br>
      <Button onClick={shortenLink} />
      <p className='footer'>Made with ❤️ by <a className='portfolio-link' href='https://prasoon.codes/' target='_blank'>Prasoon Soni</a></p>
    </div>
  );
}

export default App;
