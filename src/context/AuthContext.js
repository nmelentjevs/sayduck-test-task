import createDataContext from './createDataContext';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signout':
      return { user: {}, token: null, errorMessage: '' };
    case 'get_user':
      return { ...state, user: action.payload };
    case 'set_user':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const setUser = (dispatch) => (user) => {
  dispatch({ type: 'set_user', payload: user });
};

const signout = (dispatch) => async ({ history }) => {
  localStorage.removeItem('token');
  localStorage.removeItem('pending-order');
  dispatch({ type: 'signout' });

  if (window.location.href[window.location.href.length - 1] === '/') {
    window.location.reload();
  } else {
    history.push('/');
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { setUser, signout },
  { user: {}, token: null, errorMessage: '', loading: false }
);
