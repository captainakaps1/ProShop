import {
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Placeholder,
  Row,
} from "react-bootstrap";

export const ProductsLoader = () => {
  return (
    <Card className="my-3 p-3 rounded">
      <Placeholder as="span" animation="glow">
        <Placeholder style={{ minHeight: "15.5rem" }} xs={12} />
      </Placeholder>

      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={4} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
};

export const ProductDetailLoader = () => {
  return (
    <Row>
      <Col md={5}>
        <Placeholder as="span" animation="glow">
          <Placeholder style={{ minHeight: "15.5rem" }} xs={12} />
        </Placeholder>
      </Col>
      <Col md={4}>
        <ListGroup variant="flush">
          <ListGroupItem>
            <Placeholder as="h3" animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
          </ListGroupItem>
          <ListGroupItem>
            <Placeholder as="span" animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} />
            </Placeholder>
          </ListGroupItem>
          <ListGroupItem>
            <Placeholder as="h3" animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
          </ListGroupItem>
          <ListGroupItem>
            <Placeholder as="h3" animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
          </ListGroupItem>
        </ListGroup>
      </Col>
      <Col md={3}>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <Placeholder as="h3" animation="glow">
                    <Placeholder xs={12} />
                  </Placeholder>
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>Status:</Col>
                <Col>
                  <Placeholder as="h3" animation="glow">
                    <Placeholder xs={12} />
                  </Placeholder>
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Button
                style={{ width: "100%" }}
                className="btn-block"
                type="button"
                disabled={true}
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
