import React from "react";
import "../style.css";
import "../bootstrap.css";
import { useState } from "react";
import { CREAR_PROYECTO } from "../graphql/Mutations";
import { useMutation } from "@apollo/client";

export const RegProyecto = () => {
  const [title, setTitle] = useState("");
  const [objGenerales, setObjGenerales] = useState("");
  const [objEspecificos, setObjEspecificos] = useState("");
  const [presupuesto, setPresupuesto] = useState("");
  const [fechaini, setFechaInicio] = useState("");
  const [fechafi, setFechaFinal] = useState("");
  
  const validacionCampos = () => {
    if (
      title === "" ||
      objGenerales === "" ||
      objEspecificos === "" ||
      presupuesto === "" ||
      fechaini === "" ||
      fechafi === ""
    ) {
      return false;
    }
    return true;
  };

  const [createProject, { data, error, loading }] = useMutation(CREAR_PROYECTO);

  if (loading) {
    console.log("loading");
  }

  if (error) {
    alert("Error al registrar, por favor intente de nuevo");
  }

  if (data) {
    console.log(data);
  }

  const handleFormulario = (e) => {
    e.preventDefault();
    if (validacionCampos()) {
      const estado = "pendiente";
      createProject({
        variables: { title, objGenerales, objEspecificos, fechaini, fechafi, presupuesto, estado },
      });
      alert("El proyecto se registro correctamente");
    } else {
      alert("¡Debe llenar todos los campos!");
    }
  };

  return (
    <>
      <div className="container-fluid bg-light">
        <main className="container">
          <h1 className="titulo text-center">Registro de productos</h1>
          <form onSubmit={handleFormulario} method="POST">
            <div className="w-100 d-flex pt-3">
              <div className="w-50 pe-3 form-group">
                <label className="form-label fw-bold" htmlFor="titulo">
                  Titulo
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Ingrese titulo del proyecto"
                  value={title}
                  id="titulo"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="w-50 ps-3">
                <label className="form-label col-8 fw-bold" htmlFor="presupusto">
                  Presupuesto
                </label>
                <input
                  className="form-control"
                  type="number"
                  value={presupuesto}
                  placeholder="Ingrese el presupuesto"
                  id="presupuesto"
                  onChange={(e) => {
                    setPresupuesto(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="w-100 pt-3 d-flex">
              <div className="w-50 pe-3">
                <label className="form-label fw-bold" htmlFor="og">
                  Objetivos Generales
                </label>
                <div className="w-100">
                  <textarea
                    className="form-control"
                    value={objGenerales}
                    id="og"
                    onChange={(e) => {
                      setObjGenerales(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="w-50 pe-3">
                <label className="form-label fw-bold" htmlFor="oe">
                  Objetivos Especificos
                </label>
                <div className="w-100">
                  <textarea
                    className="form-control"
                    value={objEspecificos}
                    id="oe"
                    onChange={(e) => {
                      setObjEspecificos(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="w-100 pt-3 d-flex">
              <div className="w-50 pe-3">
                <label className="form-label fw-bold" htmlFor="dateReg">
                  Fecha de Inicio
                </label>
                <input
                  className="form-control"
                  type="date"
                  id="dateReg"
                  value={fechaini}
                  onChange={(e) => {
                    setFechaInicio(e.target.value);
                  }}
                />
              </div>
              <div className="w-50 ps-3">
                <label className="form-label fw-bold" htmlFor="fechafi">
                  Fecha de Final
                </label>
                <input
                  className="form-control"
                  type="date"
                  placeholder="Ingrese fecha de venta"
                  id="fechafi"
                  value={fechafi}
                  onChange={(e) => {
                    setFechaFinal(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="text-center pt-3 pb-3 ">
              <button className="btn btn-dark btn-lg">Registrar</button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};
