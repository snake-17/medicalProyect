import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.error || data.message || "Something went wrong");
      }
    } catch {
      setError("Connection error with the server");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="card-title text-center mb-4">Sign up</h3>

      {error && <div className="alert alert-danger p-2">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Juan Pérez"
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="user@email.com"
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-flex justify-content-between mt-4">
        <Link to="/" className="btn btn-secondary">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Confirm
        </button>
      </div>

      <p className="mt-3 text-center">
        Do you already have an account? <Link to="/login">Sign in</Link>
      </p>
    </form>
  );
}

export default RegisterForm;
