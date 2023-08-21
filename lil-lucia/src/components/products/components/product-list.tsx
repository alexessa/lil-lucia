import { Box, List, Typography } from "@mui/material";
import { Product } from "../../../models/product";
import ProductItem from "./product-item";

const ProductList = (props: any) => {
  if (props.data === undefined || props.data.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" sx={{ m: 1 }}>
          No Products Found
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <List>
        {props.data.map((prop: Product) => (
          <ProductItem
            key={prop.ProductID}
            data={prop}
            onDelete={props.onDeletePlace}
          />
        ))}
      </List>
    </>
  );
};

export default ProductList;
