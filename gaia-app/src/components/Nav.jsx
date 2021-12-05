import React from "react";
import "../bootstrap.css";
import "../style.css";

const Nav = () => {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-info fixed-top">
          <div className="container-fluid d-flex">
            <a className="navbar-brand" href="#">
              Gaia Project
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#">
                    Inicio
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Nosotros
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Investigación
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Ingresar
                  </a>
                </li>
              </ul>
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="tendré suerte"
                  aria-label="Search"
                />
                <button className="btn btn-info" type="submit">
                  Buscar
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Nav;
