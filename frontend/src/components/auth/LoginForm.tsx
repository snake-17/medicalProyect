import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        login(data.token);

        navigate("/");
      } else {
        setError(data.error || data.message || "Something went wrong");
      }
    } catch {
      setError("Connection error with server");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="card-title text-center mb-4">Sign in</h3>
      {error && <div className="alert alert-danger p-2">{error}</div>}

      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          className="form-control"
          placeholder="user@mail.com"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          className="form-control"
          id="exampleInputPassword1"
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
      <p>
        don't have an account yet? <Link to="/register">Sign up</Link>
      </p>
    </form>
  );
}
export default LoginForm;
