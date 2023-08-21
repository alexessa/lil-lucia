import { useReducer, useEffect } from "react";
import { Box, FormControl, FormHelperText, TextField } from "@mui/material";

import { validate } from "../../util/validators";

const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const GenericInput = (props: any) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initValue || "",
    isTouched: false,
    isValid: props.initValid || false,
    validators: props.validators || [],
  });
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    props.onInput(id, value, isValid);
  }, [id, onInput, value, isValid]);

  const changeHandler = (event: any) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <>
        <TextField
          id={props.id}
          label={props.label}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
          error={!inputState.isValid && inputState.isTouched}
          sx={{m: 1}}
        />
      </>
    ) : (
      <TextField
        id={props.id}
        label={props.label}
        rows={3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        error={!inputState.isValid && inputState.isTouched}
        sx={{m: 1}}
      />
    );

  return (
    <Box>
      <FormControl>
        {element}
        {!inputState.isValid && inputState.isTouched && (
          <FormHelperText id={props.id} error>
            {props.errorText}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default GenericInput;
