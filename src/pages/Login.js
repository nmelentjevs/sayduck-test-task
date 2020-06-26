import React, { useState, useContext } from 'react';
import { gql } from 'apollo-boost';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { history } from '../history';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GlobalAlert from '../components/global/GlobalAlert';
import { useMutation } from '@apollo/react-hooks';
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
}));

const Login = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ msg: '', type: '' });
  const [authenticateUser] = useMutation(LOGIN_USER);
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (email, password) => {
    authenticateUser({
      variables: {
        input: {
          email,
          password,
        },
      },
    })
      .then((data) => {
        const { user } = data.data.authenticateUser;
        sessionStorage.setItem('token', user.token);
        sessionStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        history.push('/products');
      })
      .catch((err) => {
        setAlert({ msg: err.message.split(':')[1], type: 'error' });
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <GlobalAlert alert={alert} />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(email, password);
            }}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

const LOGIN_USER = gql`
  mutation authenticateUser($input: AuthenticateUserInput!) {
    authenticateUser(input: $input) {
      errors {
        code
        message
        path
      }
      user {
        id
        token
        customer {
          products {
            nodes {
              id
            }
          }
        }
      }
    }
  }
`;

export default Login;
