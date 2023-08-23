import { Alert, Box, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { useHttpClient } from "../../common/hooks/http-hook";
import OrderList from "./components/order-list";
import { Order } from "../../models/order";
import { AuthContext } from "../../common/context/authentication-context";

const OrdersComponent = () => {
  const auth = useContext(AuthContext);
  const [loadedOrders, setLoadedOrders] = useState<Order>();
  const { isLoading, error, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const responseData = await sendRequest(
          `https://ec2-54-80-72-110.compute-1.amazonaws.com:5000/api/orders/user/${auth.user.UserID}`
        );

        setLoadedOrders(responseData.orders);
      } catch (e) {}
    };
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
      {!isLoading && loadedOrders && <OrderList data={loadedOrders} />}
    </Box>
  );
};

export default OrdersComponent;
