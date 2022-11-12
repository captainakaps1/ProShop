import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  ListGroupItem,
  FormControl,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Ratings from "../components/Ratings";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import { ProductDetailLoader } from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  useEffect(() => {
    dispatch(listProductDetails(params.id));
  }, [params, dispatch]);

  return (
    <>
      <Link className="btn btn-sm btn-dark my-3 rounded rounded-lg" to="/">
        Go back
      </Link>
      {loading ? (
        <ProductDetailLoader />
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <ProductDetails product={product} />
      )}
    </>
  );
};

const ProductDetails = ({ product = {} }) => {
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const addToCart = () => {
    navigate(`/cart/${product._id}?qty=${qty}`);
  };
  return (
    <Row>
      <Col md={5}>
        <Image src={product.image} alt={product.name} fluid />
      </Col>
      <Col md={4}>
        <ListGroup variant="flush">
          <ListGroupItem>
            <h3>{product.name}</h3>
          </ListGroupItem>
          <ListGroupItem>
            <Ratings
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </ListGroupItem>
          <ListGroupItem>Price: ${product.price}</ListGroupItem>
          <ListGroupItem>Description: {product.description}</ListGroupItem>
        </ListGroup>
      </Col>
      <Col md={3}>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <strong>${product.price}</strong>
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>Status:</Col>
                <Col>
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </Col>
              </Row>
            </ListGroupItem>
            {product.countInStock > 0 && (
              <ListGroupItem>
                <Row>
                  <Col>Qty:</Col>
                  <Col>
                    <FormControl
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </FormControl>
                  </Col>
                </Row>
              </ListGroupItem>
            )}
            <ListGroupItem>
              <Button
                onClick={addToCart}
                style={{ width: "100%" }}
                className="btn-block"
                type="button"
                disabled={product.countInStock === 0}
              >
                Add to Cart
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};
export default ProductScreen;
