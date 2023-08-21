import { Box, List, Typography } from "@mui/material";

import OrderDetailItem from "./order-detail-item";
import { OrderItem } from "../../../models/order-item";
import { FormatCurrency } from "../../../util/reusable-functions";

const OrderDetailList = (props: any) => {
  if (props.data === undefined || props.data.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" sx={{ m: 1 }}>
          No Order Items Found
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <List sx={{ textAlign: "center"}}>
        <Typography variant="h5">Order ID: {props.orderId}</Typography>
        {props.data.map((prop: OrderItem) => {
          const newKey = prop.OrderID + "-" + prop.OrderItemID;

          return <OrderDetailItem key={newKey} data={prop} />;
        })}
        <Box px={5}>
          <Typography> Total: {FormatCurrency(props.totalAmount)}</Typography>
        </Box>
      </List>
    </>
  );
};

export default OrderDetailList;
