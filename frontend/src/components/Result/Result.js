import React, { useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import './result.css'
import { IconButton } from '@mui/material';
import Fade from '@mui/material/Fade';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Result = (props) => {

    const [open, setOpen] = useState(false);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(props.link)
        setOpen(true)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false)
    };
    return (
        <>
            <div className='result-container'>
                <Snackbar
                    open={open}
                    autoHideDuration={1000}
                    onClose={handleClose}>
                    <Alert
                        severity="success"
                        sx={{ width: "100%" }}>
                        Copied to Clipboard
                    </Alert>
                </Snackbar>
                <a className='link-text' href={props.link} target='_blank'>{props.link}</a>
                <Tooltip
                    title="Copy to clipboard"
                    placement="right"
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    arrow>
                    <IconButton onClick={copyToClipboard} className='icon-btn'>
                        <i className="fa-solid fa-copy link-icon" ></i>
                    </IconButton>
                </Tooltip>
            </div>
            <br />
        </>

    )
}

export default Result