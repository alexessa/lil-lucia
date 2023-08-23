import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import GenericInput from "../../common/ui-elements/generic-input";
import { VALIDATOR_REQUIRE } from "../../util/validators";
import { User } from "../../models/user";
import { useForm } from "../../common/hooks/form-hook";
import { useHttpClient } from "../../common/hooks/http-hook";
import { AuthContext } from "../../common/context/authentication-context";
import { indigo } from "@mui/material/colors";

const UpdateUserProfile = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [fetchedUser, setFetchedUser] = useState<User>();
  const { isLoading, error, sendRequest } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      firstName: {
        value: "",
        isValid: false,
      },
      lastName: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchParking = async () => {
      try {
        const responseData = await sendRequest(
          `https://ec2-54-80-72-110.compute-1.amazonaws.com:5000/api/user/${auth.user.UserID}`
        );
        setFetchedUser(responseData.user);
        setFormData(
          {
            firstName: {
              value: (responseData.user as User).FirstName,
              isValid: true,
            },
            lastName: {
              value: (responseData.user as User).LastName,
              isValid: true,
            },
            address: {
              value: (responseData.user as User).Address,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchParking();
  }, [sendRequest, auth, setFormData]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const profile = {
      FirstName: formState.inputs.firstName.value,
      LastName: formState.inputs.lastName.value,
      Address: formState.inputs.address.value,
    };
    try {
      const responseData = await sendRequest(
        `https://ec2-54-80-72-110.compute-1.amazonaws.com:5000/api/user/${auth.user.UserID}`,
        "PATCH",
        JSON.stringify(profile),
        { "Content-Type": "application/json" }
      );

      if (responseData) {
        navigate("/profile");
      }
    } catch (err) {}
  };

  if (!fetchedUser) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card>
          <Typography variant="h6">Could not find profile</Typography>
        </Card>
      </Box>
    );
  }

  return (
    <>
      {error && <Alert severity="error">{(error as any).message}</Alert>}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 27 }}>
          <CircularProgress />
        </Box>
      )}
      <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
        {!isLoading && fetchedUser && (
          <form onSubmit={submitHandler}>
            <GenericInput
              id="firstName"
              element="input"
              label="First Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your first name"
              onInput={inputHandler}
              initValue={formState.inputs.firstName.value}
              initValid={formState.inputs.firstName.isValid}
            />
            <GenericInput
              id="lastName"
              element="input"
              label="Last Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your last name"
              onInput={inputHandler}
              initValue={formState.inputs.lastName.value}
              initValid={formState.inputs.lastName.isValid}
            />
            <GenericInput
              id="address"
              element="input"
              label="Address"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your address"
              onInput={inputHandler}
              initValue={formState.inputs.address.value}
              initValid={formState.inputs.address.isValid}
            />
            <Button
              type="submit"
              size="small"
              variant="outlined"
              disabled={!formState.isValid}
              sx={{ color: indigo[400] }}
            >
              Update Profile
            </Button>
          </form>
        )}
      </Box>
    </>
  );
};

export default UpdateUserProfile;
