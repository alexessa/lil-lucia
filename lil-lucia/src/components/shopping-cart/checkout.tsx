import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { pink } from "@mui/material/colors";
import { Box, Button, Typography } from "@mui/material";

import { useShoppingCart } from "../../common/context/shopping-cart-context";
import { AuthContext } from "../../common/context/authentication-context";
import { CartItem } from "./cart-items";
import { FormatCurrency } from "../../util/reusable-functions";
import { useHttpClient } from "../../common/hooks/http-hook";
import { Order } from "../../models/order";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useShoppingCart();
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const totalAmount = cartItems.reduce((total, cartItem) => {
    return total + cartItem.product.Price * cartItem.quantity;
  }, 0);

  const handleOrderButtonClick = async () => {
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/orders",
        "POST",
        JSON.stringify({
          UserID: auth.user.UserID,
          OrderDate: new Date(),
          TotalAmount: totalAmount,
        }),
        { "Content-Type": "application/json" }
      );

      console.log(responseData.createdOrder);

      cartItems.map(async (item) => {
        const subtotal = item.product.Price * item.quantity;

        await sendRequest(
          "http://localhost:5000/api/orderItems",
          "POST",
          JSON.stringify({
            OrderID: (responseData.createdOrder as Order).OrderID,
            ProductID: item.product.ProductID,
            Quantity: item.quantity,
            Subtotal: subtotal,
          }),
          { "Content-Type": "application/json" }
        );

        removeFromCart(item.product);
      });
    } catch (err) {}
    navigate("/");
  };

  return (
    <>
      <Box sx={{ width: 500, textAlign: "center", mx: "auto" }}>
        <Typography variant="h6" p={2}>
          <b>Checkout</b>
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, px: 4 }}>
          {cartItems.map((item) => {
            return <CartItem key={item.product.ProductID} {...item} />;
          })}
        </Box>
        <Box px={5}>
          <Typography>
            {" "}
            Total:{" "}
            {FormatCurrency(
              cartItems.reduce((total, cartItem) => {
                return total + cartItem.product.Price * cartItem.quantity;
              }, 0)
            )}
          </Typography>
        </Box>
        <Button
          sx={{
            position: "absolute",
            bottom: 0,
            right: 410,
            p: 2,
            color: pink[400],
          }}
          onClick={handleOrderButtonClick}
        >
          Order Now
        </Button>
      </Box>
    </>
  );
};

export default Checkout;
