import React, { useContext } from 'react';
import { gql } from 'apollo-boost';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { history } from '../history';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GlobalAlert from '../components/global/GlobalAlert';
import { useQuery } from '@apollo/react-hooks';
import FullScreenLoading from '../components/global/FullScreenLoading';
import ProductCard from '../components/common/ProductCard';
import { Context as AuthContext } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const Login = () => {
  const classes = useStyles();

  const {
    state: { user },
  } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_CUSTOMER_PRODUCTS, {
    variables: {
      ids: user
        ? user.customer.products.nodes.map((node) => node.id)
        : JSON.parse(
            sessionStorage.getItem('user')
          ).customer.products.nodes.map((node) => node.id),
    },
  });
  console.log(loading, error, data);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    history.push('/');
  };

  if (loading) return <FullScreenLoading />;

  return (
    <Container maxWidth="md" className={classes.container}>
      {error ? (
        <GlobalAlert
          alert={{ msg: 'Cannot load your products!', type: 'error' }}
        />
      ) : null}
      <CssBaseline />
      <Grid container justify="center">
        {!loading && data ? (
          data.nodes.map((product, i) => {
            const firstPreview = product.previews.nodes[0];

            return (
              <ProductCard
                key={product.id}
                id={product.id}
                previewImage={{
                  src: firstPreview ? firstPreview.asset.styles[0].url : '',
                  name: firstPreview ? firstPreview.asset.fileName : '',
                }}
                title={product.name}
                description={product.subtitle}
                createdOn={product.createdAt}
              />
            );
          })
        ) : (
          <Typography variant="h4">Nothing to show</Typography>
        )}
        <Grid container justify="center">
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

const GET_CUSTOMER_PRODUCTS = gql`
  query GetProductCardInfo($ids: [ID!]!) {
    nodes(ids: $ids) {
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
          products {
            nodes {
              id
            }
          }
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

export default Login;
