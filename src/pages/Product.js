import React from 'react';
import { gql } from 'apollo-boost';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { history } from '../history';
import Container from '@material-ui/core/Container';
import GlobalAlert from '../components/global/GlobalAlert';
import { useQuery } from '@apollo/react-hooks';
import FullScreenLoading from '../components/global/FullScreenLoading';
import UploadButton from '../components/common/UploadButton';
import PreviewCard from '../components/common/PreviewCard';

const Product = ({ match }) => {
  const { loading, error, data } = useQuery(GET_PRODUCT_INFO, {
    variables: {
      id: match.params.id,
    },
  });
  console.log(loading, error, data);

  if (loading) return <FullScreenLoading />;
  if (error) history.push('/products');

  return (
    <Container component="main" maxWidth="xs">
      {error ? (
        <GlobalAlert
          alert={{ msg: 'Cannot load your products!', type: 'error' }}
        />
      ) : null}
      <CssBaseline />
      <Grid container justify="center">
        {!loading && data
          ? data.node.previews.nodes.map((preview, i) => {
              return (
                <PreviewCard
                  key={preview.id}
                  id={preview.id}
                  previewImage={{
                    src: preview ? preview.asset.styles[0].url : '',
                    name: preview ? preview.asset.fileName : '',
                  }}
                  title={`Preview #${i}`}
                  createdOn={preview.asset.updatedAt}
                ></PreviewCard>
              );
            })
          : null}
        <UploadButton productId={match.params.id} />
      </Grid>
    </Container>
  );
};

const GET_PRODUCT_INFO = gql`
  query GetProductCardInfo($id: ID!) {
    node(id: $id) {
      ... on Product {
        id
        name
        subtitle
        brand {
          id
          name
        }
        customer {
          id
          name
        }
        previews {
          nodes {
            id
            asset {
              ...SharedAssetFields
            }
          }
        }
        status
        latestPublishedVersion {
          id
          status
        }
        createdAt
        updatedAt
        publishedAt
        publishedFirstTimeAt
      }
    }
  }

  fragment SharedAssetFields on SharedAsset {
    contentType
    fileMeta
    fileName
    fingerprint
    id
    styles {
      name
      url
    }
    updatedAt
    uuid
  }
`;

export default Product;
