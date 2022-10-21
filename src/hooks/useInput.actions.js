import { useInputTypes } from "./useInput.types";

export const inputAction = (value) => {
  return {
    type: useInputTypes.INPUT,
    value,
  };
};

export const onBlurAction = () => {
  return {
    type: useInputTypes.BLUR,
  };
};

export const resetAction = () => {
  return {
    type: useInputTypes.RESET,
  };
};

export const setAction = (value) => {
  return {
    type: useInputTypes.SET,
    value,
  };
};
