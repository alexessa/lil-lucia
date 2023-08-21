import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { useShoppingCart } from "../../common/context/shopping-cart-context";
import { Product } from "../../models/product";
import { grey, red } from "@mui/material/colors";
import { FormatCurrency } from "../../util/reusable-functions";
import { DeleteOutline } from "@mui/icons-material";

type CartItemProps = {
  product: Product;
  quantity: number;
};

export const CartItem = ({ product, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();

  return (
    <>
      <Box p={1}>
        <Card sx={{ display: "flex", flexDirection: "row" }}>
          <CardMedia
            image={product?.ImageURL}
            title={product?.Name}
            sx={{ height: 100, width: 100, objectFit: "cover", p: 1 }}
          />
          <CardContent>
            <Typography variant="body2">
              {product.Name}{" "}
              {quantity > 1 && (
                <Typography variant="caption" sx={{ color: grey[400] }}>
                  x{quantity}
                </Typography>
              )}
            </Typography>
            <Typography variant="body2" sx={{ color: grey[400] }}>
              {FormatCurrency(product.Price)}
            </Typography>
          </CardContent>
          <Box py={4} px={1}>
            <Typography variant="body1">
              {FormatCurrency(product.Price * quantity)}
            </Typography>
          </Box>
          <Button
            onClick={() => removeFromCart(product)}
            sx={{ color: red[800] }}
          >
            <DeleteOutline />
          </Button>
        </Card>
      </Box>
    </>
  );
};
