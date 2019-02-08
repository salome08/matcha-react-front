import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    resetPassword,
    updatePassword,
    forgotPassword,
    editProfile,
    register,
    getAll,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

//update new password into database
function updatePassword(password, user_id) {
  return dispatch => {
    dispatch({type: userConstants.UPDATE_PASSWORD_REQUEST}, password);
    userService.updatePassword(password, user_id)
    .then(
      user => {
        dispatch({type: userConstants.UPDATE_PASSWORD_SUCCESS});
        dispatch(alertActions.success('Your password has been changed'));
      },
      error => {
        dispatch({type: userConstants.UPDATE_PASSWORD_FAILURE}, error.toString());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

//check reset pass token from url
function resetPassword(id, token) {
  return dispatch => {
    dispatch({type: userConstants.RESET_PASSWORD_REQUEST }, id, token);

    userService.resetPassword(id, token)
    .then(
      user => {
        dispatch({type: userConstants.RESET_PASSWORD_SUCCESS, user: user.user});
        dispatch(alertActions.success('You can change your password'));
      },
      error => {
        dispatch({type: userConstants.RESET_PASSWORD_FAILURE}, error.toString());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

//send reset password mail
function forgotPassword(email) {
  return dispatch => {
      dispatch({type: userConstants.FORGOT_PASSWORD_REQUEST});

      userService.forgotPassword(email)
      .then(
        user => {
          dispatch({type: userConstants.FORGOT_PASSWORD_SUCCESS});
          dispatch(alertActions.success('A reinitialization password email has been sent to this adress'));
        },
        error => {
          dispatch({type: userConstants.FORGOT_PASSWORD_FAILURE}, error.toString());
          dispatch(alertActions.error(error.toString()))
        }
    );
  };
}

function editProfile(toEdit, user){
  return dispatch => {
    dispatch({type: userConstants.EDIT_PROFILE_REQUEST});

    userService.editProfile(toEdit, user.id)
    .then(
      user => {
        console.log('user action : ', user);
        dispatch({type: userConstants.EDIT_PROFILE_SUCCESS, user});
        dispatch(alertActions.success('Your informations has been changed'));
      },
      error => {
        dispatch({type: userConstants.EDIT_PROFILE_FAILURE}, error.toString());
        dispatch(alertActions.error(error.toString()))
      }
    );
  }
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful, A verification email has been sent'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}
