import { useInputTypes } from "./useInput.types";

export const initialInputState = {
  value: "",
  isTouched: false,
};

export const inputStateReducer = (state, action) => {
  if (action.type === useInputTypes.INPUT) {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === useInputTypes.BLUR) {
    return { value: state.value, isTouched: true };
  }
  if (action.type === useInputTypes.RESET) {
    return { value: "", isTouched: false };
  }
  if (action.type === useInputTypes.SET) {
    return { value: action.value, isTouched: false };
  }
  return initialInputState;
};
