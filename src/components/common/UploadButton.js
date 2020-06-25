import React from 'react';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(5),
  },
}));

const UploadButton = ({ productId }) => {
  const classes = useStyles();

  const { loading, error, data } = useMutation(UPDATE_PRODUCT, {
    variables: {
      id: productId,
      input: {},
    },
  });

  return (
    <Button
      variant="contained"
      color="default"
      className={classes.button}
      startIcon={<CloudUploadIcon />}
    >
      Upload
    </Button>
  );
};

const UPDATE_PRODUCT = gql`
  mutation updateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      errors {
        code
        message
        path
      }
      node {
        id
      }
    }
  }
`;

export default UploadButton;
