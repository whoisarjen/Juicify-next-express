import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react'
import Alert from '@mui/material/Alert';

const ErrorNotification = ({ notificationMessage, openNotification, closeNotification }) => {
    const [snackBarValues] = useState({
      vertical: 'bottom',
      horizontal: 'right'
    });

    const { vertical, horizontal } = snackBarValues;

    return (
      <Snackbar
        open={ openNotification }
        autoHideDuration={6000}
        onClose={closeNotification}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={closeNotification} severity="error" sx={{ width: '100%' }}>
          { notificationMessage || 'Something went wrong!'}
        </Alert>
      </Snackbar>
    );
}
 
export default ErrorNotification;