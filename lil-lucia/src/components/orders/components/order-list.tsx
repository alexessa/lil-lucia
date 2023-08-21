import { Box, List, Typography } from "@mui/material";

import OrderItem from "./order-item";
import { Order } from "../../../models/order";

const OrderList = (props: any) => {
  if (props.data === undefined || props.data.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" sx={{ m: 1 }}>
          No Orders Found
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <List>
        {props.data.map((prop: Order) => (
          <OrderItem key={prop.OrderID} data={prop} />
        ))}
      </List>
    </>
  );
};

export default OrderList;
