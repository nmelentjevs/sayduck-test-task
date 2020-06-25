import React, { useState, useEffect, Fragment } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

const GlobalAlert = ({ alert }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (alert.msg) setOpen(true);
  }, [alert]);

  const handleAlertClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        key={`top,center`}
        open={open}
        onClose={() => handleAlertClose()}
        autoHideDuration={2000}
        TransitionComponent={TransitionDown}
      >
        <Alert onClose={() => handleAlertClose()} severity={alert.type}>
          {alert.msg}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default GlobalAlert;
