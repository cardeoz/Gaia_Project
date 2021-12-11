import React from "react";
import "../style.css";
import "../bootstrap.css";
import { useState } from 'react';
import {GET_USER} from '../graphql/Query'
import { useMutation, gql,useQuery } from '@apollo/client';
  

export const Registro = () => {
  
  // const SignUpScreen =() => {
  // const [correo, setCorreo]=useState("")
  // const [nombre, setNombre]=useState("")
  // const [identificacion, setIdentificacion]=useState("")
  // const [password, setPassword]=useState("")
  // const [rol, setRol] = useState("");

  // const [signUp, {data, error, loading }] = useQuery(GET_USER);
  
    // const [signUp, { data, error, loading }] = useMutation(SIGN_UP_MUTATION);
    // if (error) {
    //   alert('Error registrandose, por favor intente de nuevo')
    // }
  
    
  
    // if (data) {
    //   console.log(data)
    // }
  
    // const onSubmit = () =>{
    //   signUp({variables: {correo,identificacion, nombre,password,rol}})
    // }
    const  {  loading,error,data }= useQuery(GET_USER);
  console.log(data)
  

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
              value="Registrar"
              type="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
}

