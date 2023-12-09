import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router";
import { ApplicationContext } from "../Provider/ApplicationContext";

import { Container, Grid, Typography, Button, Box } from "@mui/material";

const ProductPage = () => {
  const { title } = useParams();
  const { cycles, addToCart} = useContext(ApplicationContext);

  const product = cycles.find((cycle) => cycle.productName === title);

  const images = [
    { id: 1, url: "https://contents.mediadecathlon.com/p2563201/8ef26012c7fe024e92e8a6d8c75e1271/p2563201.jpg?format=auto&quality=70&f=300x0" },
    { id: 2, url: "https://contents.mediadecathlon.com/p2563201/8ef26012c7fe024e92e8a6d8c75e1271/p2563201.jpg?format=auto&quality=70&f=300x0" },
  ];


  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            {images.map((image) => (
              <SwiperSlide key={image.id}>
                <img src={image.url} alt={product.title} style={{ width: "100%" }} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Typography variant="h4">{product.productName}</Typography>

            <Typography variant="body2" mt={2}>
              {product.productDescription}
            </Typography>

            <Box display="flex" alignItems="center" mt={2}>
              <Typography variant="body2">Color:</Typography>
              {product.colors.map((color) => (
                <Button
                  key={color}
                  variant="contained"
                  sx={{ ml: 2, backgroundColor: color, color: "white" }}
                >
                  {color}
                </Button>
              ))}
            </Box>

            <Typography variant="body2" mt={2}>
              Brand: {product.brandDetails.brand}
            </Typography>

            <Button variant="contained" color="primary" size="large" mt={4} onClick={()=>{addToCart(product)}}>
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;
