import React from "react";
import "../style.css";
import "../bootstrap.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table,Button,Container,Modal,ModalHeader,
} from "reactstrap"

const data = [
  { id: 1000000, Nombres: " Carlos Alberto ",Apellidos: " Reales ", Correo: "delcarpioreales@gmail.com",Rol: "Administrador",  Estado: " Autorizado "},
  { id: 2000000, Nombres: " Luisa María ",Apellidos: " Acevedo Quintero",Correo: "luisa.acevedo94@gmail.com",Rol: "Líder",  Estado:"Autorizado" },
  { id: 3000000, Nombres: " Camila",    Apellidos: "Zapata López",Correo: "camila04@gmail.com", Rol: "Administrador",   Estado:"Autorizado" },
  { id: 4000000, Nombres: " Laura ",   Apellidos: " Nmmmmmm ", Correo: "laura0359@gmail.com",Rol: "Estudiante",   Estado:"Autorizado"},
  { id: 5000000, Nombres: " Catherin ",Apellidos: " Londoño Ramirez ",Correo: "ktrin0828@gmail.com",Rol: "Líder", Estado:"Autorizado"},
  { id: 6000000, Nombres: " Otro ",    Apellidos: " NNN ", Correo: "nnnnnnnnnnnn@gmail.com",Rol: "Administtrador",    Estado:"Autorizado",},
];

class Usuarios extends React.Component{
state={
  data:data,

  
  };

  render(){
    return(
    <>
    <Container>
      <br />
      
    <Button color="info">Agregar Usuario</Button>
    <br  /><br  />
    <Table>
      <thead><tr><th>ID</th>
      <th>Nombres</th>
      <th>Apellidos</th>
      <th>Rol</th>
      <th>Correo</th>
      <th>Estado</th>
      <th>Acciones</th></tr></thead>
      <tbody>
        {this.state.data.map((elemento)=>(
            
          <tr>
            <td>{elemento.id }</td>
            <td>{elemento.Nombres }</td>
            <td>{elemento.Apellidos }</td>
            <td>{elemento.Rol }</td>
            <td>{elemento.Correo }</td>
            <td>{elemento.Estado }</td>
            <td><Button color="info">Editar</Button>{"   "}
            <Button color= "danger">Eliminar</Button></td>
            </tr>

        ))}      
        </tbody>
    </Table>
     </Container>

     

  </>
  )
    
}
}

export default Usuarios;
