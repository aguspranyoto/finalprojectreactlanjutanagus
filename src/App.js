import React from "react";
import Home from "./Routes/Home";
import AddStudent from "./Routes/AddStudent";
import Student from "./Routes/Student";
import EditStudent from "./Routes/EditStudent";
import NotFound from "./Routes/NotFound";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";

const App = () => {
  const location = useLocation();

  const isHome = location.pathname === "/";

  const isNotFound =
    location.pathname === "/" &&
    location.pathname === "/add" &&
    location.pathname === "/student" &&
    !location.pathname.startsWith("/student/");
  return (
    <>
      {!(isHome || isNotFound) && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="student" element={<Student />} />
        <Route path="/student/:id" element={<EditStudent />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {!isNotFound && <Footer />}
    </>
  );
};

export default App;
