import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Typography,
} from "@mui/material";
import { FormEvent, useState, useContext } from "react";

import GenericInput from "../../common/ui-elements/generic-input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../util/validators";
import { AuthContext } from "../../common/context/authentication-context";
import { useForm } from "../../common/hooks/form-hook";
import { useHttpClient } from "../../common/hooks/http-hook";
import { User } from "../../models/user";

const Authentication = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttpClient();
  const [isLogin, setIsLogin] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchHandler = () => {
    if (isLogin) {
      setFormData(
        {
          ...formState.inputs,
          firstName: undefined,
          lastName: undefined,
          address: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          firstName: { value: "", isValid: false },
          lastName: { value: "", isValid: false },
          address: { value: "", isValid: false },
        },
        false
      );
    }
    setIsLogin((prevMode) => !prevMode);
  };

  const authenticationHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/user/login",
          "POST",
          JSON.stringify({
            Email: formState.inputs.email.value,
            Password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );

        auth.login(responseData.user as User);
      } catch (error) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/user/signup",
          "POST",
          JSON.stringify({
            FirstName: formState.inputs.firstName.value,
            LastName: formState.inputs.lastName.value,
            Address: formState.inputs.address.value,
            Email: formState.inputs.email.value,
            Password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        auth.login(responseData.user as User);
      } catch (error) {}
    }
  };

  return (
    <>
      {error && <Alert severity="error">{(error as any).message}</Alert>}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 27 }}>
          <CircularProgress />
        </Box>
      )}
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Card>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h5" component="h2" sx={{ m: 1 }}>
              {isLogin ? "Login" : "Register"}
            </Typography>
          </Box>
          <form onSubmit={authenticationHandler}>
            {!isLogin && (
              <>
                <GenericInput
                  element="input"
                  id="firstName"
                  type="text"
                  label="First Name"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter your first name"
                  onInput={inputHandler}
                />
                <GenericInput
                  element="input"
                  id="lastName"
                  type="text"
                  label="Last Name"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter your last name"
                  onInput={inputHandler}
                />
                <GenericInput
                  element="input"
                  id="address"
                  type="text"
                  label="Address"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter your address"
                  onInput={inputHandler}
                />
              </>
            )}
            <GenericInput
              element="input"
              id="email"
              type="email"
              label="E-Mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid Email"
              onInput={inputHandler}
            />
            <GenericInput
              element="input"
              id="password"
              type="password"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(8)]}
              errorText="Please enter a valid password of at least 8 characters in length"
              onInput={inputHandler}
            />
            <Box sx={{ display: "flex", justifyContent: "center", p: 0.5 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ m: 1 }}
                disabled={!formState.isValid}
              >
                {isLogin ? "Log In" : "Sign Up"}
              </Button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", p: 0.5 }}>
              <Button
                type="button"
                variant="outlined"
                color="primary"
                sx={{ m: 1 }}
                onClick={switchHandler}
              >
                Switch to {isLogin ? "Sign Up" : "Log In"}
              </Button>
            </Box>
          </form>
        </Card>
      </Box>
    </>
  );
};

export default Authentication;
