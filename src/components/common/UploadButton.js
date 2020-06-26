import React from 'react';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(5),
  },
  input: {
    display: 'none',
  },
}));

const UploadButton = ({ productId }) => {
  const classes = useStyles();

  const [generateUploadUrl] = useMutation(GENERATE_S3_UPLOAD_URL, {
    variables: {
      input: { contentTypes: ['image/jpg', 'image/png'] },
    },
  });

  const getUploadUrl = async () => {
    try {
      const data = await generateUploadUrl();
      console.log(data.generateS3PresignedUrl.s3PresignedUrls.nodes[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCapture = ({ target }) => {
    const fileReader = new FileReader();
    const name = target.accept.includes('image') ? 'images' : 'videos';
    console.log(target.files);

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = async (e) => {
      let generatedUrl;
      try {
        generatedUrl = await generateUploadUrl();
      } catch (err) {
        console.log(err);
      }
      console.log(generatedUrl);

      const files3Url = await axios
        .post(
          generatedUrl.data.generateS3PresignedUrl.s3PresignedUrls.nodes[0].url,
          {
            ...generatedUrl.data.generateS3PresignedUrl.s3PresignedUrls.nodes[0]
              .formData,
            file: e.currentTarget.result,
          }
        )
        .then(console.log)
        .catch(console.log);
    };
  };

  return (
    <>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleCapture}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
          className={classes.button}
        >
          Upload
        </Button>
      </label>
    </>
  );
};

const GENERATE_S3_UPLOAD_URL = gql`
  mutation GenerateS3PresignedUrl($input: GenerateS3PresignedUrlInput!) {
    generateS3PresignedUrl(input: $input) {
      s3PresignedUrls {
        nodes {
          formData
          host
          url
        }
      }
    }
  }
`;

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
