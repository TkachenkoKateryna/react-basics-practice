import { useReducer } from "react";
import {
  inputAction,
  onBlurAction,
  resetAction,
  setAction,
} from "./useInput.actions";
import { initialInputState, inputStateReducer } from "./useInput.reducer";

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  console.log("inputState", inputState);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  console.log("valueIsValid :>> ", valueIsValid);

  const valueChangeHandler = (event) => {
    dispatch(inputAction(event.target.value));
  };

  const valueBlurHandler = () => {
    dispatch(onBlurAction());
  };

  const resetValue = () => {
    dispatch(resetAction());
  };

  const setValue = (value) => {
    dispatch(setAction(value));
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    resetValue,
    setValue,
  };
};

export default useInput;
