import React from "react";

const UsersContext = React.createContext({
  users: [],
  loading: false,
  error: "",
  getUsers: () => {},
});

export default UsersContext;
