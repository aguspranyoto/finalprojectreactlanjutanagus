// TODO: answer here
import { useNavigate, Link } from "react-router-dom";
import React from "react";
import { Button, Box, Heading, Text } from "@chakra-ui/react";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box className="home">
        <Box className="home__left">
          <Heading as="h4">Studen Independen</Heading>
          <Text as="h4">Kampus Merdeka</Text>
          <Text as="h5">by Ruangguru</Text>
        </Box>
        <Box className="home__right">
          <Text as="h3">Student Portal</Text>
          <Link to="/student">
            <Button data-testid="student-btn" className="add-btn">
              All student
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Home;
