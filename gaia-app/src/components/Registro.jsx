import React from "react";
import "../style.css";
import "../bootstrap.css";
import { useState } from "react";
import {SIGN_UP} from "../graphql/Mutations"
import { useMutation, useQuery } from "@apollo/client";

export const Registro = () => {

  // const result = useQuery(GET_USER);
  // console.log(result);

  const [correo, setCorreo]=useState(null)
  const [nombre, setNombre]=useState(null)
  const [identificacion, setIdentificacion]=useState(null)
  const [password, setPassword]=useState(null)
  const [cpassword, setCpassword]=useState(null)
  const [rol, setRol] = useState(null);

  const validacionCampos = () => {

    if (nombre === '' || correo === '' || identificacion === '' || rol === '' || password === '') {
        return {
            state: false,
            mensaje: 'Tiene que llenar todos los campos'
        }
    }
    if(password.length < 6){
        return {
            state: false,
            mensaje: 'La contraseña debe tener mínimo 6 caracteres.'
        }
    }
    if(password.value !== cpassword.value){
      return {
          state: false,
          mensaje: 'Las contraseñas no coinciden.'
      }
    }
    return {
        state: true,
        mensaje: 'Se ha registrado con exito.'
    }
}

  const [signUp, {data, error, loading }] = useMutation(SIGN_UP);

  if (loading) {
    console.log("loading")
  }

  if (error) {
    alert('Error registrandose, por favor intente de nuevo')
  }

  if (data) {
    console.log(data)
  }

  const handleFormulario = async (e) => {
    e.preventDefault();
    const status = validacionCampos(); 
    console.log(status);
    if (status.state) {
        alert("El usuario se registro correctamente")
    } else {
        console.log(status.mensaje);
    }
    const estado="pendiente"
    signUp({variables:  {correo,identificacion,nombre,password,rol,estado}})
  }

  
  

  return (
    <>
      <div className="w-100 vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="card w-50 p-3">
          <h4>Registro</h4>
          <form className="formulario" onSubmit={handleFormulario} method="post">
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input
                required="required"
                value={nombre}
                onChange={e=>setNombre(e.target.value)}
                className="form-control"
                id="nombre"
                type="text"
                placeholder="Ingresa tu nombre"
              />
            </div>
            <div>
              <label htmlFor="identificacion">Identificación</label>
              <input
                required="required"
                className="form-control"
                id="identificacion"
                type="number"
                value={identificacion}
                onChange={e=>setIdentificacion(e.target.value)}
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
                value={correo}
                onChange={e=>setCorreo(e.target.value)}
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
                value={password}
                onChange={e=>setPassword(e.target.value)}
                placeholder="ingresa una contraseña"
              />
            </div>
            <div>
              <label htmlFor="Cpassword">Confirmar Contraseña</label>
              <input
                required="required"
                className="form-control"
                value={cpassword}
                onChange={e=>setCpassword(e.target.value)}
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
                value={rol}
                onChange={e=>setRol(e.target.value)}
              />
              <datalist id="rol">
                <option value="lider" />
                <option value="Estudiante" />
                <option value="Administrador" />
              </datalist>
            </div>

            <input
              className="btn btn-info mt-3 form-control"
              value="Registrar"
              type="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};
