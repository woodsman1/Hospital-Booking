import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ authenticated }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
            XyZ Hospital
        </Link>

        <div className="navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="" className="nav-link">
                Home
              </Link>
            </li>
            {!authenticated ? (
              <>
                <li className="nav-item active">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item active">
                  <Link to="/sign-up" className="nav-link">
                    SignUp
                  </Link>
                </li>
              </>
            ) : (
              <>
              <li className="nav-item active">
                  <Link to="/your-bookings" className="nav-link">
                    Booked Slot's 
                  </Link>
                </li>

                <li className="nav-item active">
                  <span className="nav-link">
                    Welcome, '{localStorage.getItem("username")}'
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;