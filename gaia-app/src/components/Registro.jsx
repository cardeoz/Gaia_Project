import React from "react";
import "../style.css";
import "../bootstrap.css";

export const Registro = () => {
  return (
    <>
      <div className="w-100 vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="card w-50 p-3">
          <h4>Registro</h4>
          <form className="formulario" action="" method="post">
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input
                required="required"
                className="form-control"
                id="nombre"
                type="text"
                placeholder="Ingresa tu nombre"
              />
            </div>
            <div>
              <label htmlFor="apellidos">Apellidos</label>
              <input
                required="required"
                className="form-control"
                id="apellidos"
                type="text"
                placeholder="Ingresa tus apellidos"
              />
            </div>
            <div>
              <label htmlFor="identificacion">Identificación</label>
              <input
                required="required"
                className="form-control"
                id="identificacion"
                type="number"
                placeholder="Numero de Identificación"
              />
            </div>

            <div>
              <label className="" htmlFor="email">
                Correo Electronico
              </label>
              <input
                required="required"
                className="form-control"
                id="email"
                type="email"
                placeholder="Ingresa tu email"
              />
            </div>

            <div>
              <label htmlFor="password">Contraseña</label>
              <input
                required="required"
                className="form-control"
                id="password"
                type="password"
                placeholder="ingresa una contraseña"
              />
            </div>
            <div>
              <label htmlFor="Cpassword">Confirmar Contraseña</label>
              <input
                required="required"
                className="form-control"
                id="Cpassword"
                type="password"
                placeholder="Repite tu contraseña"
              />
            </div>
            <div>
              <label htmlFor="rol">Rol</label>
              <input
                required="required"
                className="form-control"
                list="rol"
                placeholder="Selecciona un rol"
              />
              <datalist id="rol">
                <option value="lider" />
                <option value="Estudiante" />
                <option value="Administrador" />
              </datalist>
            </div>

            <input
              className="btn btn-info mt-3 form-control"
              onclick="getData()"
              value="Registrar"
              type="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};
