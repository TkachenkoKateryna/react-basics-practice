import { usersActionTypes } from "./UsersProvider.types";

export const changeLoadingAction = (isLoading) => {
  return {
    type: usersActionTypes.LOADING,
    value: isLoading,
  };
};

export const getErrorAction = (error) => {
  return {
    type: usersActionTypes.ERROR,
    error,
  };
};

export const getUsersAction = (users) => {
  return {
    type: usersActionTypes.GET,
    users,
  };
};

export const deleteUserAction = (id) => {
  return {
    type: usersActionTypes.DELETE,
    id,
  };
};

export const addUserAction = (user) => {
  return {
    type: usersActionTypes.ADD,
    user,
  };
};

export const editUserAction = (user) => {
  return {
    type: usersActionTypes.EDIT,
    user,
  };
};
