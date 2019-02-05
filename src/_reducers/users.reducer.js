import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.EDIT_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case userConstants.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.user,
        edit: true,
      };
    case userConstants.EDIT_PROFILE_FAILURE:
      return {
        edit: false,
        error: true
      };
    case userConstants.UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        update: false,
        error: false
      };.0
    case userConstants.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        update: true,
        error: false
      };
    case userConstants.UPDATE_PASSWORD_FAILURE:
      return {
        update: false,
        error: true
      };
    case userConstants.RESET_PASSWORD_REQUEST:
      return {
        update: false,
        isLoading: false,
        error: false
      };
    case userConstants.RESET_PASSWORD_SUCCESS:
      return {
        user: action.user,
        update: false,
        isLoading: false,
        error: false
      };
    case userConstants.RESET_PASSWORD_FAILURE:
      return {
        error: true
      };
    case userConstants.FORGOT_PASSWORD_REQUEST:
      return {
        sendingForgetPass: true,
      };
    case userConstants.FORGOT_PASSWORD_SUCCESS:
      return {
        sendingForgetPass: true,
      };
    case userConstants.FORGOT_PASSWORD_FAILURE:
      return {};
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state
  }
}
