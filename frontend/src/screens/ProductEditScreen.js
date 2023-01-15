import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductDetails, updateProduct } from "../actions/productActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import { PRODUCT_ADMIN_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, product } = productDetails;

  const productAdminUpdate = useSelector((state) => state.productAdminUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success,
  } = productAdminUpdate;

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_ADMIN_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product?.name || product?._id !== id) {
        dispatch(getProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setImage(product.image);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [product, dispatch, id, navigate, success]);

  return (
    <>
      <Link
        className="btn btn-sm btn-dark my-3 rounded rounded-lg"
        to="/admin/productlist"
      >
        Go back
      </Link>
      <FormContainer>
        <h1>Edit Product Info</h1>

        {error && <Message varient="danger">{error}</Message>}
        {errorUpdate && <Message varient="danger">{errorUpdate}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mt-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="price" className="mt-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="image" className="mt-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="brand" className="mt-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="countInStock" className="mt-3">
            <Form.Label>CountInStock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            className="mt-3"
            type="submit"
            variant="primary"
            disabled={loadingUpdate}
          >
            Update{" "}
            {loadingUpdate && (
              <Spinner animation="border" variant="light" size="sm" />
            )}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
