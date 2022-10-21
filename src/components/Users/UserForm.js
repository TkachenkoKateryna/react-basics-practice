import React, { useContext, useEffect } from "react";
import useInput from "../../hooks/use-input";
import UsersContext from "../../store/users-context";
import Modal from "../UI/Modal";
import classes from "./UserForm.module.css";

const UserForm = (props) => {
  const { addUser, user, setUser, editUser } = useContext(UsersContext);

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    resetValue: resetName,
    setValue: setName,
  } = useInput((value) => value?.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    resetValue: resetEmail,
    setValue: setEmail,
  } = useInput((value) => value.includes("@") && value?.trim() !== "");

  const {
    value: enteredPhone,
    isValid: enteredPhoneIsValid,
    hasError: phoneInputHasError,
    valueChangeHandler: phoneChangeHandler,
    valueBlurHandler: phoneBlurHandler,
    resetValue: resetPhone,
    setValue: setPhone,
  } = useInput((value) => value?.trim() !== "");

  console.log("user", user);

  useEffect(() => {
    // nameChangeHandler({
    //   target: {
    //     value: user?.name || "",
    //   },
    // });
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
  }, [user]);

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid && enteredPhoneIsValid) {
    formIsValid = true;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid || !enteredPhoneIsValid) {
      return;
    }

    if (user) {
      editUser({
        id: user.id,
        name: enteredName,
        email: enteredEmail,
        phone: enteredPhone,
      });
    } else {
      console.log("enteredName :>> ", enteredName);
      addUser({ name: enteredName, email: enteredEmail, phone: enteredPhone });
    }
    resetName("");
    resetEmail("");
    resetPhone("");
    props.onClose();
  };

  const nameInputClasses = nameInputHasError
    ? classes["form-control"] + " " + classes.invalid
    : classes["form-control"];

  const emailInputClasses = emailInputHasError
    ? classes["form-control"] + " " + classes.invalid
    : classes["form-control"];

  const phoneInputClasses = phoneInputHasError
    ? classes["form-control"] + " " + classes.invalid
    : classes["form-control"];

  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={onSubmitHandler}>
        <div className={nameInputClasses}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameInputHasError && (
            <p className={classes["error-text"]}>Name should not be empty</p>
          )}
        </div>
        <div className={emailInputClasses}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailInputHasError && (
            <p className={classes["error-text"]}>
              Email should not be empty and should contain @ sign
            </p>
          )}
        </div>
        <div className={phoneInputClasses}>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            value={enteredPhone}
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
          />
          {phoneInputHasError && (
            <p className={classes["error-text"]}>Phone should not be empty</p>
          )}
        </div>
        <div className={classes["form-actions"]}>
          <button type="submit" disabled={!formIsValid}>
            Submit
          </button>
          <button
            type="button"
            onClick={() => {
              props.onClose();
              setUser();
            }}
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserForm;
