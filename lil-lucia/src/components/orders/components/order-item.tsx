import {
  Button,
  Card,
  CardActions,
  CardContent,
  ListItem,
  Typography,
} from "@mui/material";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../../common/context/authentication-context";
import { pink } from "@mui/material/colors";
import { FormatCurrency } from "../../../util/reusable-functions";
import { Order } from "../../../models/order";

const OrderItem = (prop: any) => {
  const auth = useContext(AuthContext);
  const order: Order = prop.data;

  return (
    <>
      <ListItem>
        <Card sx={{ height: 180, width: 300, justifyItems: "center" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Order ID: {order.OrderID}
            </Typography>
            <Typography variant="subtitle2" color="text.primary">
              {auth.user.FirstName} {auth.user.LastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {FormatCurrency(order.TotalAmount)}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Link to={`/orders/${order.OrderID}`} className="all-unset">
              <Button size="small" sx={{ color: pink[400] }}>
                <RemoveRedEyeOutlined /> &nbsp; Order Details
              </Button>
            </Link>
          </CardActions>
        </Card>
      </ListItem>
    </>
  );
};

export default OrderItem;
