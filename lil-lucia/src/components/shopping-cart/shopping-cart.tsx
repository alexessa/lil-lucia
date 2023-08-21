import { Box, Button, Drawer, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";

import { useShoppingCart } from "../../common/context/shopping-cart-context";
import { CartItem } from "./cart-items";
import { FormatCurrency } from "../../util/reusable-functions";
import { Link } from "react-router-dom";

type ShoppingCartProps = {
  isOpen: boolean;
};

export const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cartItems } = useShoppingCart();
  return (
    <>
      <div>
        <Drawer anchor="right" onClose={closeCart} open={isOpen}>
          <Box sx={{ width: 400 }}>
            <Typography variant="h6" p={2}>
              <b>Cart</b>
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {cartItems.map((item) => {
                return <CartItem key={item.product.ProductID} {...item} />;
              })}
            </Box>
            <Box px={2}>
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
          </Box>
          <Box sx={{ position: "absolute", bottom: 0, right: 0, p: 1 }}>
            <Link to={"/checkout"}>
              <Button sx={{ color: pink[400] }} onClick={closeCart}>Checkout</Button>
            </Link>
          </Box>
        </Drawer>
      </div>
    </>
  );
};
