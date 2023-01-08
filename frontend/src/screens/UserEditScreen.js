import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserDetails, updateUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import { USER_ADMIN_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userAdminUpdate = useSelector((state) => state.userAdminUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success,
  } = userAdminUpdate;

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateUser({
        _id: id,
        name,
        email,
        isAdmin,
      })
    );
  };

  useEffect(() => {
    if (success) {
      dispatch({
        type: USER_ADMIN_UPDATE_RESET,
      });

      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, dispatch, id, success, navigate]);

  return (
    <>
      <Link
        className="btn btn-sm btn-dark my-3 rounded rounded-lg"
        to="/admin/userlist"
      >
        Go back
      </Link>
      <FormContainer>
        <h1>Edit User Info</h1>

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
          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="isadmin" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
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

export default UserEditScreen;
