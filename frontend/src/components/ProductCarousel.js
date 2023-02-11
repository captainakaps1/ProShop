import React, { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getTopRatedProducts } from "../actions/productActions";
import Message from "./Message";
import { ProductsLoader } from "./Loader";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, products, error } = productTopRated;

  useEffect(() => {
    dispatch(getTopRatedProducts());
  }, [dispatch]);
  return loading ? (
    <ProductsLoader />
  ) : error ? (
    <Message varient="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
