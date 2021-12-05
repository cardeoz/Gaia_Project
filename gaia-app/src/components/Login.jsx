import React from "react";
import "../bootstrap.css";
import "../style.css";


const Login = () => {
  return (
    <>
      <div className="w-100 vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="card w-25 p-4">
          <h4>Gaia Project</h4>
          <form className="pt-5" action="" method="post">
            <label htmlFor="email">
              Correo Electronico
            </label>
            <input
              required="required"
              className="form-control"
              id="email"
              type="email"
              placeholder="ingresa email"
            />
            <label className="text-align-start pt-3" htmlFor="password">Contraseña</label>
            <input
              required="required"
              className="form-control"
              id="password"
              type="password"
              placeholder="ingresa una contraseña"
            />
            <input
              className="btn btn-info form-control my-3"
              onclick="getData()"
              value="Ingresar"
              type="submit"
            />
          </form>
          <span><p>No tienes una Cuenta <a href="">Registrate</a></p></span>
          
        </div>
      </div>
    </>
  );
};

export default Login;
