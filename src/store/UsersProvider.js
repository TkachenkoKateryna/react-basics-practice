import React, { useReducer, useCallback, useState } from "react";
import UsersContext from "./users-context";
import {
  changeLoadingAction,
  getUsersAction,
  getErrorAction,
  deleteUserAction,
  addUserAction,
  editUserAction,
} from "./UsersProvider.actions";
import usersReducer, { defaultUsersState } from "./UsersProvider.reducer";

const UsersProvider = (props) => {
  const [usersState, dispatchUsersAction] = useReducer(
    usersReducer,
    defaultUsersState
  );

  const [user, setUser] = useState(null);

  console.log("user", user);

  const getUsersHandler = useCallback(async () => {
    dispatchUsersAction(changeLoadingAction(true));

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      console.log("data", data);

      dispatchUsersAction(getUsersAction(data));
    } catch (error) {
      dispatchUsersAction(getErrorAction(error));
    }

    dispatchUsersAction(changeLoadingAction(false));
  }, []);

  const deleteUserHandler = useCallback(async (id) => {
    console.log("id :>> ", id);
    dispatchUsersAction(changeLoadingAction(true));

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        { method: "DELETE" }
      );

      console.log("response", response);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      console.log("data :>> ", data);

      dispatchUsersAction(deleteUserAction(id));
    } catch (error) {
      dispatchUsersAction(getErrorAction(error));
    }

    dispatchUsersAction(changeLoadingAction(false));
  }, []);

  const addUserHandler = useCallback(async (user) => {
    console.log("user :>> ", user);
    dispatchUsersAction(changeLoadingAction(true));

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users`,
        {
          method: "POST",
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            phone: user.phone,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      console.log("response", response);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      console.log("data :>> ", data);

      dispatchUsersAction(addUserAction(data));
    } catch (error) {
      dispatchUsersAction(getErrorAction(error));
    }

    dispatchUsersAction(changeLoadingAction(false));
  }, []);

  const editUserHandler = useCallback(async (user) => {
    console.log("user :>> ", user);
    dispatchUsersAction(changeLoadingAction(true));

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${user.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            email: user.email,
            phone: user.phone,
            name: user.name,
            id: user.id,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      console.log("response", response);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      console.log("data :>> ", data);

      dispatchUsersAction(editUserAction(data));
      setUser();
    } catch (error) {
      dispatchUsersAction(getErrorAction(error));
    }

    dispatchUsersAction(changeLoadingAction(false));
  }, []);

  const usersContext = {
    users: usersState.users,
    loading: usersState.loading,
    error: usersState.error,
    getUsers: getUsersHandler,
    deleteUser: deleteUserHandler,
    addUser: addUserHandler,
    editUser: editUserHandler,
    setUser,
    user,
  };

  return (
    <UsersContext.Provider value={usersContext}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
