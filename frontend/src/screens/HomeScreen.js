import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { getProducts } from "../actions/productActions";
import { ProductsLoader } from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(getProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link className="btn btn-sm btn-light my-3 rounded rounded-lg" to="/">
          Go back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Row>
          {["a", "b", "c"].map((item) => (
            <Col key={item} sm={12} md={6} lg={4} xl={3}>
              <ProductsLoader />
            </Col>
          ))}
        </Row>
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
