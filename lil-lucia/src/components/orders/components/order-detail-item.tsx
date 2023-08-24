import {
  Box,
  Card,
  CardContent,
  CardMedia,
  ListItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { grey } from "@mui/material/colors";

import { FormatCurrency } from "../../../util/reusable-functions";
import { OrderItem } from "../../../models/order-item";
import { Product } from "../../../models/product";
import { useHttpClient } from "../../../common/hooks/http-hook";

const OrderDetailItem = (prop: any) => {
  const [loadedProducts, setLoadedProducts] = useState<Product>();
  const { sendRequest } = useHttpClient();
  const orderItem: OrderItem = prop.data;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const responseData = await sendRequest(
          `http://ec2-54-80-72-110.compute-1.amazonaws.com:5000/api/products/${orderItem.ProductID}`
        );

        setLoadedProducts(responseData.product);
      } catch (e) {}
    };

    fetchProduct();
  }, []);

  return (
    <>
      <ListItem>
        {loadedProducts && (
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
              height: 100,
              width: 400,
            }}
          >
            <CardMedia
              image={loadedProducts?.ImageURL}
              title={loadedProducts?.Name}
              sx={{ height: 100, width: 100, objectFit: "cover", p: 1 }}
            />
            <CardContent>
              <Typography variant="body2">
                {loadedProducts.Name} &nbsp;
                <Typography variant="caption" sx={{ color: grey[400] }}>
                  x{orderItem.Quantity}
                </Typography>
              </Typography>
              <Typography variant="body2" sx={{ color: grey[400] }}>
                {FormatCurrency(loadedProducts.Price)}
              </Typography>
            </CardContent>
            <Box py={4} px={1}>
              <Typography variant="body1">
                {FormatCurrency(orderItem.Subtotal)}
              </Typography>
            </Box>
          </Card>
        )}
      </ListItem>
    </>
  );
};

export default OrderDetailItem;
