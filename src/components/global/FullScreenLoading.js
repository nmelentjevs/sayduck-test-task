import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const FullScreenLoading = ({ transparent, fit }) => {
  return (
    <div
      style={{
        height: fit ? '100%' : '100vh',
        width: fit ? '100%' : '100vw',
        opacity: transparent ? 0.6 : 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        zIndex: 100,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <CircularProgress color="secondary" />
    </div>
  );
};

export default FullScreenLoading;
