import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const NotFound = () => {
  return (
    <Container maxWidth="xs" justify="center" align="center">
      <Typography variant="h2" style={{ marginTop: 100 }}>
        Not found
      </Typography>
    </Container>
  );
};

export default NotFound;
