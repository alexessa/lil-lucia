import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import GenericInput from "../../common/ui-elements/generic-input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import { Product } from "../../models/product";
import { useForm } from "../../common/hooks/form-hook";
import { useHttpClient } from "../../common/hooks/http-hook";

const UpdateParkingArea = () => {
  const productId = useParams().productId;
  const navigate = useNavigate();
  const [loadedProduct, setLoadedProduct] = useState<Product>();
  const { isLoading, error, sendRequest } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/products/${productId}`
        );
        setLoadedProduct(responseData.product);
        setFormData(
          {
            description: {
              value: (responseData.product as Product).Description,
              isValid: true,
            },
            price: {
              value: (responseData.product as Product).Price,
              isValid: true,
            },
            category: {
              value: (responseData.product as Product).Category,
              isValid: true,
            },
            imageUrl: {
              value: (responseData.product as Product).ImageURL,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchProduct();
  }, [sendRequest, productId, setFormData]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product = {
      Description: formState.inputs.description.value,
      Price: formState.inputs.price.value,
      Category: formState.inputs.category.value,
      ImageURL: formState.inputs.imageUrl.value,
    };
    try {
      await sendRequest(
        `http://localhost:5000/api/products/${productId}`,
        "PATCH",
        JSON.stringify(product),
        { "Content-Type": "application/json" }
      );
      navigate("/");
    } catch (err) {}
  };

  if (!loadedProduct) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card>
          <Typography variant="h6">Could not find product</Typography>
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
        {!isLoading && loadedProduct && (
          <>
            <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
              <Typography variant="h6">{loadedProduct.Name}</Typography>
            </Box>
            <form onSubmit={submitHandler}>
              <GenericInput
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(10)]}
                errorText="Please enter a valid description of at least 10 characters"
                onInput={inputHandler}
                initValue={formState.inputs.description.value}
                initValid={formState.inputs.description.isValid}
              />
              <GenericInput
                id="price"
                element="input"
                label="Price"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a price for the product"
                onInput={inputHandler}
                initValue={formState.inputs.price.value}
                initValid={formState.inputs.price.isValid}
              />
              <GenericInput
                id="category"
                element="input"
                label="Category"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a category for the product"
                onInput={inputHandler}
                initValue={formState.inputs.category.value}
                initValid={formState.inputs.category.isValid}
              />
              <GenericInput
                id="imageUrl"
                element="input"
                label="Image URL"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter an image URL for the product"
                onInput={inputHandler}
                initValue={formState.inputs.imageUrl.value}
                initValid={formState.inputs.imageUrl.isValid}
              />
              <Button
                type="submit"
                size="small"
                variant="outlined"
                disabled={!formState.isValid}
              >
                Update Product
              </Button>
            </form>
          </>
        )}
      </Box>
    </>
  );
};

export default UpdateParkingArea;
