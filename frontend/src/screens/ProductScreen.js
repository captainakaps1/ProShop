import React, { useEffect, useState } from "react";
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Ratings from "../components/Ratings";
import axios from 'axios';

const ProductScreen = ({ match }) => {
  const params = useParams();
  const [product, setProduct] = useState({})

  useEffect(() =>{
    const fetchProduct = async () => { 
      const { data } = await axios.get(`/api/product/${params.id}`);

      setProduct(data)
    }
    fetchProduct();
  },[params])
  return (
    <>
      <Link className="btn btn-sm btn-dark my-3 rounded rounded-lg" to="/">
        Go back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3 >
            </ListGroupItem>
            <ListGroupItem>
              <Ratings value={product.rating} text={`${product.numReviews} reviews`}/>
            </ListGroupItem>
            <ListGroupItem>
              Price: ${product.price}
            </ListGroupItem>
            <ListGroupItem>
              Description: {product.description}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>
                  Price:
                  </Col>
                  <Col>
                  <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                  Status:
                  </Col>
                  <Col>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button style={{ width: '100%'}} className="btn-block" type="button" disabled={product.countInStock === 0}>Add to Cart</Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
