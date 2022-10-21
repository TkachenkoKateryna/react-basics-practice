import classes from "./UserCard.module.css";

import React, { useContext } from "react";
import UsersContext from "../../store/users-context";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";

const UserCard = ({ onShowModal, user, id, name, email, phone }) => {
  const { deleteUser, setUser } = useContext(UsersContext);

  return (
    <div className={classes.card}>
      <div className={classes["card-icons"]}>
        <MdDeleteOutline
          onClick={() => {
            deleteUser(id);
          }}
        />
        <MdEditNote
          onClick={() => {
            console.log("user", user);
            setUser(user);
            onShowModal();
          }}
        />
      </div>
      <div className={classes["card-content"]}>
        <div>
          <img />
        </div>
        <h2 className={classes.name}>{name}</h2>
        <h3>{email}</h3>
        <h3>{phone}</h3>
      </div>
    </div>
  );
};

export default UserCard;
