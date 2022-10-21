import React, { useContext, useEffect } from "react";
import UsersContext from "../../store/users-context";
import UserCard from "./UserCard";
import classes from "./UsersList.module.css";

const UsersList = (props) => {
  const { users, loading, error, getUsers } = useContext(UsersContext);

  console.log("users", users);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  let content = <p>Found no users.</p>;

  if (users.length > 0) {
    content = (
      <div className={classes.cards}>
        <div className={classes["cards-actions"]}>
          <button onClick={props.onShowModal}>Add</button>
        </div>
        <div className={classes["cards-container"]}>
          {users.map((user) => (
            <UserCard
              key={user.id}
              onShowModal={props.onShowModal}
              user={user}
              {...user}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    content = <p>ERROR</p>;
  }

  if (loading) {
    content = <p>Loading</p>;
  }

  return <div className={"section-center"}>{content}</div>;
};

export default UsersList;
