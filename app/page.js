import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: "url('https://mut.ac.th/about-us/')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="container mt-5">
        <h1 className="text-center mb-5">School Management System</h1>

        <div className="row">
          <div className="col-md-4">
            <div className="card p-4 text-center">
              <h3>Student Management</h3>
              <Link href="/student" className="btn btn-primary mt-3">
                Manage Students
              </Link>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 text-center">
              <h3>Teacher Management</h3>
              <Link href="/teacher" className="btn btn-success mt-3">
                Manage Teachers
              </Link>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 text-center">
              <h3>Project Management</h3>
              <Link href="/project" className="btn btn-warning mt-3">
                Manage Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
