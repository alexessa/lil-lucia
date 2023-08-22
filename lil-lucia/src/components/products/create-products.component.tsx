import { FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import GenericInput from "../../common/ui-elements/generic-input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import { useForm } from "../../common/hooks/form-hook";
import { useHttpClient } from "../../common/hooks/http-hook";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      category: {
        value: "",
        isValid: false,
      },
      imageUrl: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://ec2-54-80-72-110.compute-1.amazonaws.com:5000/api/products",
        "POST",
        JSON.stringify({
          Name: formState.inputs.name.value,
          Description: formState.inputs.description.value,
          Price: formState.inputs.price.value,
          Category: formState.inputs.category.value,
          ImageURL: formState.inputs.imageUrl.value,
        }),
        { "Content-Type": "application/json" }
      );
      navigate("/");
    } catch (err) {}
  };

  return (
    <>
      {error && <Alert severity="error">{(error as any).message}</Alert>}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 27 }}>
          <CircularProgress />
        </Box>
      )}
      <Box p={4}>
        <Typography variant="h6">Add Product</Typography>
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <form onSubmit={handleFormSubmit}>
            <GenericInput
              id="name"
              element="input"
              label="Product Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name for the product."
              onInput={inputHandler}
            />
            <GenericInput
              id="description"
              element="textarea"
              label="Description"
              validators={[VALIDATOR_MINLENGTH(8)]}
              errorText="Please enter a valid description of at least 8 characters."
              onInput={inputHandler}
            />
            <GenericInput
              id="price"
              element="input"
              label="Price"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a price for the product."
              onInput={inputHandler}
            />
            <GenericInput
              id="category"
              element="input"
              label="Category"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a category for the product."
              onInput={inputHandler}
            />
            <GenericInput
              id="imageUrl"
              element="input"
              label="Image URL"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter an image URL of the product."
              onInput={inputHandler}
            />
            <Button
              type="submit"
              disabled={!formState.isValid}
              variant="outlined"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default CreateProduct;
