// TODO: answer here

import { useNavigate } from "react-router-dom";
import React from "react";
import { Button, Box, Heading } from "@chakra-ui/react";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box className="error">
      <Heading as="h1"> 404|Not Found</Heading>
      <Button to="/" onClick={handleBack} className="edit-btn">
        Take Me Back
      </Button>
    </Box>
  );
};

export default NotFound;
