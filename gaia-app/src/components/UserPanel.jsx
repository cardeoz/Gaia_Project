import React, { useState } from 'react'
import { Modal } from 'reactstrap';
import { RegProyecto } from './RegProyecto'
// import { Proyectos } from './Proyectos'
// import { Usuarios } from './Usuarios'
import { NavLink } from 'react-router-dom'

export const VendorPanel = () => {

    const [rp, setRp] = useState(false)
    const [lp, setLp] = useState(false)
    const [lu, setLu] = useState(false)

    const handleIterfazRp = () => {
        setRp(true)
    }

    const handleIterfazLp = () => {
        setLp(true)
    }
    const handleIterfazLu = () => {
        setLu(true)
    }

    const closeInterfaz = () => {
        setRp(false)
        setLp(false)
        setLu(false)
    }
    
    return (
        <>
            <div className="d-flex bg-transparent fixed-top">
                <div className="fixed-top d-flex bg-dark">
                    <div className="container m-0 p-0 w-25 d-flex justify-content-start align-items-center">
                        <a className="btn btn-dark form-control my-2"  data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            Menu
                        </a>
                    </div>
                    <div className="text-light d-flex w-75 justify-content-end my-2">
                        <a className="navbar-brand text-light ps-3" href="/user">GAIA APP</a>
                    </div>
                </div>
                <div className="w-25 bg-dark">
                    <div className="collapse pt-5" id="collapseExample" >
                        <div className="accordion bg-dark" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Proyectos
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body px-0">
                                        <a onClick={handleIterfazRp} className="dropdown-item disabled">Registrar Proyecto</a>
                                        <a onClick={handleIterfazLp} className="dropdown-item disabled">Listado de Productos</a>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Usuarios
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                    <div className="accordion-body px-0">
                                        <a onClick={handleIterfazLu} className="dropdown-item disabled">Listado usuarios</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-dark">
                            {<NavLink
                                className="btn btn-outline-light form-control"
                                onClick={}
                                to="/home" >
                                Cerrar Sesion
                            </NavLink>}
                        </div>
                    </div>
                </div>
            </div>
            <Modal className='modal-lg' isOpen={rp}>
                <div className='d-flex p-3 justify-content-end'>
                    <button className='btn btn-light btn-close' onClick={closeInterfaz}></button>
                </div>
                <RegProyecto />
            </Modal>

            <Modal className='modal-xl' isOpen={bp}>
                <div className='d-flex p-3 justify-content-end'>
                    <button className='btn btn-light btn-close' onClick={closeInterfaz}></button>
                </div>
                <Proyectos />
            </Modal>
            <Modal className='modal-lg' isOpen={lu}>
                <div className='d-flex bg-light justify-content-end'>
                    <button className='btn btn-light btn-close' onClick={closeInterfaz}></button>
                </div>
                <Usuarios />
            </Modal>
        </>
    )
}


