import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/`);
    }
  };
  return (
    <Form onSubmit={submitHandler} className="d-flex mt-1">
      <FormControl
        type="text"
        name="search"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></FormControl>
      <Button className="p-2" variant="outline-success" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
