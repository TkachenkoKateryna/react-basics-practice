import { usersActionTypes } from "./UsersProvider.types";

export const defaultUsersState = {
  users: [],
  loading: false,
  error: "",
};

const usersReducer = (state, action) => {
  if (action.type === usersActionTypes.GET) {
    return {
      ...state,
      users: action.users,
    };
  } else if (action.type === usersActionTypes.LOADING) {
    return {
      ...state,
      loading: action.value,
    };
  }
  if (action.type === usersActionTypes.ERROR) {
    return {
      ...state,
      error: action.error,
    };
  }
  if (action.type === usersActionTypes.ADD) {
    return {
      ...state,
      users: [...state.users, action.user],
    };
  }
  if (action.type === usersActionTypes.EDIT) {
    return {
      ...state,
      users: state.users.map((user) => {
        if (user.id === action.user.id) {
          return action.user;
        }
        return user;
      }),
    };
  }
  if (action.type === usersActionTypes.DELETE) {
    return {
      ...state,
      users: state.users.filter((user) => {
        return user.id !== +action.id;
      }),
    };
  }

  return defaultUsersState;
};

export default usersReducer;
