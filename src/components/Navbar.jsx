import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { Flex, Box, Heading, Text, Link } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Box className="nav" bgColor="#3da9db">
      <div className="nav__left">
        <Link as={RouterLink} to="/" data-testid="student-btn">
          Student Portal
        </Link>
      </div>
      <div className="nav__right">
        <Link as={RouterLink} to="/student" data-testid="student-page">
          All Student
        </Link>
        <Link as={RouterLink} to="/add" data-testid="add-page">
          Add Student
        </Link>
      </div>
    </Box>
  );
};

export default NavBar;
