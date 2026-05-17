"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    termYear: "",
    lecId: "",
    stdId: "",
    projectName: "",
    projectImage: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await axios.get("/api/projects");
    setProjects(res.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termYear || !formData.lecId || !formData.stdId || !formData.projectName) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    const payload = {
      ...formData,
      lecId: formData.lecId ? formData.lecId.split(",").map((v) => v.trim()) : [],
      stdId: formData.stdId ? formData.stdId.split(",").map((v) => v.trim()) : [],
    };

    if (editId) {
      await axios.put(`/api/projects/${editId}`, payload);
      setEditId(null);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Project updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      await axios.post("/api/projects", payload);
      Swal.fire({
        icon: "success",
        title: "Created!",
        text: "Project created successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    }

    setFormData({
      termYear: "",
      lecId: "",
      stdId: "",
      projectName: "",
      projectImage: "",
    });
    fetchProjects();
  };

  const handleEdit = (project) => {
    setEditId(project._id);
    setFormData({
      termYear: project.termYear,
      lecId: project.lecId ? project.lecId.join(", ") : "",
      stdId: project.stdId ? project.stdId.join(", ") : "",
      projectName: project.projectName,
      projectImage: project.projectImage || "",
    });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await axios.delete(`/api/projects/${id}`);
      fetchProjects();
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Project has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Project CRUD</h2>

      <Link href="/" className="btn btn-secondary mb-3">
        &larr; Back to Home
      </Link>

      <form onSubmit={handleSubmit} className="card p-4 mb-4">
        <input
          type="text"
          name="termYear"
          placeholder="Term/Year (e.g. 1/2568)"
          className="form-control mb-3"
          value={formData.termYear}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lecId"
          placeholder="Lecturer ID (comma separated)"
          className="form-control mb-3"
          value={formData.lecId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="stdId"
          placeholder="Student ID (comma separated)"
          className="form-control mb-3"
          value={formData.stdId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          className="form-control mb-3"
          value={formData.projectName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="projectImage"
          placeholder="Project Image URL (optional)"
          className="form-control mb-3"
          value={formData.projectImage}
          onChange={handleChange}
        />
        <button className="btn btn-primary">
          {editId ? "Update" : "Create"}
        </button>
      </form>

      <div className="row row-cols-1 row-cols-md-4 g-3">
        {projects.map((project) => (
          <div className="col" key={project._id}>
            <div className="card h-100">
              {project.projectImage ? (
                <img
                  src={project.projectImage}
                  alt={project.projectName}
                  className="card-img-top"
                  style={{ height: "160px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="card-img-top bg-secondary d-flex align-items-center justify-content-center"
                  style={{ height: "160px", color: "#fff", fontSize: "14px" }}
                >
                  No Image
                </div>
              )}
              <div className="card-body">
                <h6 className="card-title fw-bold">{project.projectName}</h6>
                <p className="card-text mb-1" style={{ fontSize: "13px" }}>
                  <strong>Term/Year:</strong> {project.termYear}
                </p>
                <p className="card-text mb-1" style={{ fontSize: "13px" }}>
                  <strong>Lecturer:</strong>{" "}
                  {project.lecId ? project.lecId.join(", ") : "-"}
                </p>
                <p className="card-text mb-2" style={{ fontSize: "13px" }}>
                  <strong>Students:</strong>{" "}
                  {project.stdId ? project.stdId.join(", ") : "-"}
                </p>
              </div>
              <div className="card-footer d-flex gap-2">
                <button
                  className="btn btn-warning btn-sm flex-fill"
                  onClick={() => handleEdit(project)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm flex-fill"
                  onClick={() => handleDelete(project._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
