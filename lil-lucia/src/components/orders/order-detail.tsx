import { Alert, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

import { OrderItem } from "../../models/order-item";
import { useParams } from "react-router-dom";
import { Order } from "../../models/order";
import OrderDetailList from "./components/order-detail-list";
import { useHttpClient } from "../../common/hooks/http-hook";

const OrderDetails = () => {
  const orderId = useParams().orderId;
  const [loadedOrderItems, setLoadedOrderItems] = useState<OrderItem[]>([]);
  const [loadedOrder, setLoadedOrder] = useState<Order>();
  const { isLoading, error, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const responseData = await sendRequest(
          `https://ec2-54-80-72-110.compute-1.amazonaws.com:5000/api/orderItems/${orderId}`
        );

        setLoadedOrderItems(responseData.orderItems);
      } catch (e) {}
    };

    const fetchOrders = async () => {
      try {
        const responseData = await sendRequest(
          `https://ec2-54-80-72-110.compute-1.amazonaws.com:5000/api/orders/${orderId}`
        );

        setLoadedOrder(responseData.order);
      } catch (e) {}
    };

    fetchOrderDetails();
    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 27 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{(error as any).message}</Alert>;
  }

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      {!isLoading && loadedOrderItems && loadedOrder && (
        <>
          <OrderDetailList
            data={loadedOrderItems}
            orderId={orderId}
            totalAmount={loadedOrder.TotalAmount}
          />
        </>
      )}
    </Box>
  );
};

export default OrderDetails;
