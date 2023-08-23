import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  Typography,
} from "@mui/material";
import {
  Add,
  DeleteOutline,
  EditOutlined,
  Remove,
  RemoveShoppingCartOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import { Product } from "../../../models/product";
import { AuthContext } from "../../../common/context/authentication-context";
import { useHttpClient } from "../../../common/hooks/http-hook";
import { pink, red } from "@mui/material/colors";
import { FormatCurrency } from "../../../util/reusable-functions";
import { useShoppingCart } from "../../../common/context/shopping-cart-context";

const ProductItem = (prop: any) => {
  const auth = useContext(AuthContext);
  const { error, sendRequest } = useHttpClient();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const product: Product = prop.data;
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  let quantity: number = getItemQuantity(product);

  const openDeleteHandler = () => setDeleteConfirmation(true);
  const closeDeleteHandler = () => setDeleteConfirmation(false);

  const deleteParkingAreaHandler = async () => {
    try {
      await sendRequest(
        `https://ec2-54-80-72-110.compute-1.amazonaws.com:5000/api/products/${product.ProductID}`,
        "DELETE"
      );
      prop.onDelete(product.ProductID);
    } catch (error) {}
  };

  return (
    <>
      {error && <Alert severity="error">{(error as any).message}</Alert>}
      <Dialog
        open={deleteConfirmation}
        onClose={closeDeleteHandler}
        aria-labelledby="delete-dialog"
        aria-describedby="delete-text"
      >
        <DialogTitle
          id="delete-dialog"
          sx={{ background: "red", color: "white" }}
        >
          Delete Product
        </DialogTitle>
        <DialogContent sx={{ m: 2 }}>
          <DialogContentText id="delete-text">
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteHandler} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={deleteParkingAreaHandler}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ListItem>
        <Card sx={{ height: 520, width: 500, justifyItems: "center" }}>
          <CardMedia
            image={product.ImageURL}
            title={product.Name}
            sx={{ height: 300, width: 500, objectFit: "cover" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.Name}
            </Typography>
            <Typography variant="subtitle2" color="text.primary">
              {product.Description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {FormatCurrency(product.Price)}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            {quantity === 0 ? (
              <Button
                sx={{ width: 150, color: pink[400] }}
                onClick={() => increaseCartQuantity(product)}
              >
                <Add /> Add To Cart
              </Button>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    sx={{ color: pink[400] }}
                    onClick={() => decreaseCartQuantity(product)}
                  >
                    <Remove />
                  </Button>
                  <Box>
                    <Typography variant="h6">{quantity}</Typography>
                  </Box>
                  <Button
                    sx={{ color: pink[400] }}
                    onClick={() => increaseCartQuantity(product)}
                  >
                    <Add />
                  </Button>
                  <Button
                    sx={{ color: red[800] }}
                    onClick={() => removeFromCart(product)}
                  >
                    <RemoveShoppingCartOutlined />
                  </Button>
                </Box>
              </Box>
            )}
            {auth.isLoggedIn && auth.user.IsAdmin === true && (
              <Link
                to={`/product/edit/${product.ProductID}`}
                className="all-unset"
              >
                <Button size="small" sx={{ color: pink[400] }}>
                  <EditOutlined />
                </Button>
              </Link>
            )}
            {auth.isLoggedIn && auth.user.IsAdmin === true && (
              <Button
                size="small"
                onClick={openDeleteHandler}
                sx={{ color: red[800] }}
              >
                <DeleteOutline />
              </Button>
            )}
          </CardActions>
        </Card>
      </ListItem>
    </>
  );
};

export default ProductItem;
