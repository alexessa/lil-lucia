import { Alert, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

import { useHttpClient } from "../../common/hooks/http-hook";
import ProductList from "./components/product-list";
import { Product } from "../../models/product";

const ProductComponent = () => {
  const [loadingProducts, setLoadingProducts] = useState<Product>();
  const { isLoading, error, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchParkingAreas = async () => {
      try {
        const responseData = await sendRequest(
          "https://ec2-54-80-72-110.compute-1.amazonaws.com:5000/api/products"
        );

        setLoadingProducts(responseData.products);
      } catch (e) {}
    };
    fetchParkingAreas();
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

  const placeDeletedHandler = (deletedPlaceId: any) => {
    setLoadingProducts((prevProducts) =>
      (prevProducts as any).filter(
        (p: Product) => p.ProductID !== deletedPlaceId
      )
    );
  };

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      {!isLoading && loadingProducts && (
        <ProductList
          data={loadingProducts}
          onDeletePlace={placeDeletedHandler}
        />
      )}
    </Box>
  );
};

export default ProductComponent;
