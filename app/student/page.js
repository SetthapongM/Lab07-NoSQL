"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudentPage() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    stdId: "",
    stdName: "",
    email: "",
    password: "",
    gpa: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get("/api/students");
    setStudents(res.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`/api/students/${editId}`, formData);
      setEditId(null);
    } else {
      await axios.post("/api/students", formData);
    }
    setFormData({
      stdId: "",
      stdName: "",
      email: "",
      password: "",
      gpa: "",
    });
    fetchStudents();
  };

  const handleEdit = (student) => {
    setEditId(student._id);
    setFormData({
      stdId: student.stdId,
      stdName: student.stdName,
      email: student.email,
      password: student.password,
      gpa: student.gpa,
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/students/${id}`);
    fetchStudents();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Student CRUD</h2>

      <Link href="/" className="btn btn-secondary mb-3">
        &larr; Back to Home
      </Link>

      <form onSubmit={handleSubmit} className="card p-4 mb-4">
        <input
          type="text"
          name="stdId"
          placeholder="Student ID"
          className="form-control mb-3"
          value={formData.stdId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="stdName"
          placeholder="Student Name"
          className="form-control mb-3"
          value={formData.stdName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-3"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="number"
          name="gpa"
          placeholder="GPA"
          className="form-control mb-3"
          value={formData.gpa}
          onChange={handleChange}
        />
        <button className="btn btn-primary">
          {editId ? "Update" : "Create"}
        </button>
      </form>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>GPA</th>
            <th width="200">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.stdId}</td>
              <td>{student.stdName}</td>
              <td>{student.email}</td>
              <td>{student.gpa}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(student._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
