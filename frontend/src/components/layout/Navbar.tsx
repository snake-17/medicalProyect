import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Appointments
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>

            {user ? (
              <>
                <NavLink className="nav-link" to="/appointments">
                  My Appointments
                </NavLink>
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
                <button
                  className="nav-link btn btn-link border-0 text-start"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
