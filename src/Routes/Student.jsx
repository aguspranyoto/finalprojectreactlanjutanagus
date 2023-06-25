import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Heading,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Button,
  Tfoot,
  TableCaption,
} from "@chakra-ui/react";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      const res = await fetch("http://localhost:3001/student");
      const data = await res.json();
      setStudents(data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data: ", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/student/${id}`, {
        method: "DELETE",
      });
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.log("Error deleting student: ", error);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredStudents =
    filter === "All"
      ? students
      : students.filter((student) => student.faculty === filter);

  return (
    <>
      <Box className="header">
        <div className="header__left">
          <Link data-testid="home-page">
            <h2> All Student</h2>
          </Link>
        </div>
        <div className="header__right">
          <select
            data-testid="filter"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
            <option value="Fakultas Ilmu Sosial dan Politik">
              Fakultas Ilmu Sosial dan Politik
            </option>
            <option value="Fakultas Teknik">Fakultas Teknik</option>
            <option value="Fakultas Teknologi Informasi dan Sains">
              Fakultas Teknologi Informasi dan Sains
            </option>
          </select>
        </div>
      </Box>
      <Box className="container-card">
        <Box className="table-container">
          {loading ? (
            <p>Loading ...</p>
          ) : (
            <Table id="table-student">
              <Thead>
                <Tr>
                  <Th>Fullname</Th>
                  <Th>Birth Date</Th>
                  <Th>Gender</Th>
                  <Th>Faculty</Th>
                  <Th>Program Study</Th>
                  <Th>Option</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredStudents.map((student, index) => (
                  <Tr key={student.id} className="student-data-row">
                    <Td>
                      <Link
                        as={RouterLink}
                        to={`${student.id}`}
                        style={{ cursor: "pointer" }}
                      >
                        {student.fullname}
                      </Link>
                    </Td>
                    <Td>{student.birthDate}</Td>
                    <Td>{student.gender}</Td>
                    <Td>{student.faculty}</Td>
                    <Td>{student.programStudy}</Td>
                    <Td>
                      <Button
                        type="button"
                        className="delete-btn"
                        onClick={() => handleDelete(student.id)}
                        data-testid={`delete-${student.id}`}
                        id="del-btn"
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot className="test-tfoot"></Tfoot>
              <TableCaption>Agus Pranyoto</TableCaption>
            </Table>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Student;
