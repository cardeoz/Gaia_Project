import React from "react";
import "../bootstrap.css";
import "../style.css";
import { useMutation, useQuery } from "@apollo/client";
import { SIGN_IN } from "../graphql/Mutations";
import { useState } from "react";

const Login = () => {
  const [correo, setCorreo] = useState(null);
  const [password, setPassword] = useState(null);

  const [signIn, { data, error, loading }] = useMutation(SIGN_IN);

  if (loading) {
    console.log("loading");
  }

  if (error) {
    console.log("Error al ingresar, por favor intente de nuevo");
  }

  if (data) {
    console.log(data)
    const {token}=data.signIn
    localStorage.setItem('token',token);
  }

  const handleFormulario = async (e) => {
    e.preventDefault();
    signIn({ variables: { correo, password } });
    
  };

  return (
    <>
      <div className="w-100 vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="card w-25 p-4">
          <h4>Gaia Project</h4>
          <form className="pt-5" onSubmit={handleFormulario} method="post">
            <label htmlFor="email">Correo Electronico</label>
            <input
              required="required"
              className="form-control"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              id="email"
              type="email"
              placeholder="ingresa email"
            />
            <label className="text-align-start pt-3" htmlFor="password">
              Contraseña
            </label>
            <input
              required="required"
              className="form-control"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ingresa una contraseña"
            />
            <input
              className="btn btn-info form-control my-3"
              onclick=""
              value="Ingresar"
              type="submit"
            />
          </form>
          <span>
            <p>
              No tienes una Cuenta <a href="">Registrate</a>
            </p>
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
