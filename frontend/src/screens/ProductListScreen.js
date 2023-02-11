import React, { useEffect } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "../actions/productActions";
import { OrderDetailsLoader } from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { PRODUCT_ADMIN_CREATE_RESET } from "../constants/productConstants";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const pageNumber = params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, products, error, page, pages } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productAdminDelete = useSelector((state) => state.productAdminDelete);
  const { success } = productAdminDelete;

  const productAdminCreate = useSelector((state) => state.productAdminCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    product: createdProduct,
  } = productAdminCreate;

  const deleteHandler = (id) => {
    if (!window.confirm("Are you sure?")) return;
    dispatch(deleteProduct(id));
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  useEffect(() => {
    dispatch({
      type: PRODUCT_ADMIN_CREATE_RESET,
    });

    if (!userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(getProducts("", pageNumber));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    success,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Product</h1>
        </Col>
        <Col className="text-right" style={{ display: "contents" }}>
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {errorCreate && <Message varient="danger">{errorCreate}</Message>}
      {loading ? (
        <OrderDetailsLoader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table bordered striped responsive hover className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
