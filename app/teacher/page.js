"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TeacherPage() {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    lecName: "",
    email: "",
    password: "",
    tel: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    const res = await axios.get("/api/teachers");
    setTeachers(res.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tel: formData.tel ? formData.tel.split(",").map((t) => t.trim()) : [],
    };
    if (editId) {
      await axios.put(`/api/teachers/${editId}`, payload);
      setEditId(null);
    } else {
      await axios.post("/api/teachers", payload);
    }
    setFormData({
      lecName: "",
      email: "",
      password: "",
      tel: "",
    });
    fetchTeachers();
  };

  const handleEdit = (teacher) => {
    setEditId(teacher._id);
    setFormData({
      lecName: teacher.lecName,
      email: teacher.email,
      password: teacher.password,
      tel: teacher.tel ? teacher.tel.join(", ") : "",
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/teachers/${id}`);
    fetchTeachers();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Teacher CRUD</h2>

      <Link href="/" className="btn btn-secondary mb-3">
        &larr; Back to Home
      </Link>

      <form onSubmit={handleSubmit} className="card p-4 mb-4">
        <input
          type="text"
          name="lecName"
          placeholder="Teacher Name"
          className="form-control mb-3"
          value={formData.lecName}
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
          type="text"
          name="tel"
          placeholder="Tel (comma separated)"
          className="form-control mb-3"
          value={formData.tel}
          onChange={handleChange}
        />
        <button className="btn btn-success">
          {editId ? "Update" : "Create"}
        </button>
      </form>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Teacher ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Tel</th>
            <th width="200">Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher.lecId}</td>
              <td>{teacher.lecName}</td>
              <td>{teacher.email}</td>
              <td>{teacher.tel ? teacher.tel.join(", ") : ""}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(teacher)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(teacher._id)}
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
