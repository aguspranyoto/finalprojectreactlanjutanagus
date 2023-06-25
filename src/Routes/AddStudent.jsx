// TODO: answer here
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Input, Button, Select } from "@chakra-ui/react";

const AddStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    profilePicture: "",
    address: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    programStudy: "",
  });

  useEffect(() => {
    fetch("http://localhost:3001/student/")
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProfilePictureChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      profilePicture: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      fullname,
      profilePicture,
      address,
      phoneNumber,
      birthDate,
      gender,
      programStudy,
    } = formData;

    const faculty = getFacultyByProgramStudy(programStudy);

    const newStudent = {
      fullname,
      profilePicture,
      address,
      phoneNumber,
      birthDate,
      gender,
      faculty,
      programStudy,
    };

    fetch("http://localhost:3001/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success: ", data);
        navigate("/student");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFacultyByProgramStudy = (programStudy) => {
    let faculty = "";
    switch (programStudy) {
      case "Ekonomi":
      case "Manajemen":
      case "Akuntansi":
        faculty = "Fakultas Ekonomi";
        break;
      case "Administrasi Publik":
      case "Administrasi Bisnis":
      case "Hubungan Internasional":
        faculty = "Fakultas Ilmu Sosial dan Politik";
        break;
      case "Teknik Sipil":
      case "Arsitektur":
        faculty = "Fakultas Teknik";
        break;
      case "Matematika":
      case "Fisika":
      case "Informatika":
        faculty = "Fakultas Teknologi Informasi dan Sains";
        break;
      default:
        faculty = "";
        break;
    }
    return faculty;
  };

  return (
    <>
      <Box className="container-card-add">
        <form
          id="form-student"
          className="form-student"
          onSubmit={handleSubmit}
        >
          <div className="fullname">
            <label htmlFor="fullname">
              Fullname
              <Input
                id="input-name"
                type="text"
                name="fullname"
                data-testid="name"
                value={formData.fullname}
                placeholder="John Doe"
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="profile-picture">
            <label htmlFor="profile-picture">
              Profile Picture
              <Input
                id="input-profile-picture"
                type="text"
                name="profilePicture"
                data-testid="profilePicture"
                placeholder="https://placehold.com/image.jpg"
                value={formData.profilePicture}
                onChange={handleProfilePictureChange}
                required
              />
            </label>
          </div>

          <div className="address">
            <label htmlFor="address">
              Address
              <Input
                id="input-address"
                type="text"
                name="address"
                data-testid="address"
                placeholder="City, Country"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="phoneNumber">
            <label htmlFor="phoneNumber">
              Phone Number
              <Input
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                data-testid="phoneNumber"
                placeholder="+628XXXXXXXX"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="birth">
            <label htmlFor="input-date">
              Birth Date
              <Input
                id="input-date"
                type="date"
                name="birthDate"
                data-testid="date"
                value={formData.birthDate}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="gender">
            <label htmlFor="input-gender">Gender</label>
            <Select
              id="input-gender"
              name="gender"
              data-testid="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Choose your Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
          </div>

          <div className="prody">
            <label htmlFor="input-prody">
              Program Study
              <Select
                id="input-prody"
                name="programStudy"
                data-testid="prody"
                value={formData.programStudy}
                onChange={handleChange}
                required
              >
                <option value="">Choose your Program Study</option>
                <option value="Ekonomi">Ekonomi</option>
                <option value="Manajemen">Manajemen</option>
                <option value="Akuntansi">Akuntansi</option>
                <option value="Administrasi Publik">Administrasi Publik</option>
                <option value="Administrasi Bisnis">Administrasi Bisnis</option>
                <option value="Hubungan Internasional">
                  Hubungan Internasional
                </option>
                <option value="Teknik Sipil">Teknik Sipil</option>
                <option value="Arsitektur">Arsitektur</option>
                <option value="Matematika">Matematika</option>
                <option value="Fisika">Fisika</option>
                <option value="Informatika">Informatika</option>
              </Select>
            </label>
          </div>

          <Box>
            <Button
              className="add-btn"
              id="add-btn"
              type="submit"
              data-testid="add-btn"
            >
              Add Student
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddStudent;
