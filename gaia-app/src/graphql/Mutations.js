import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation singUp(
    $correo: String!
    $identificacion: String!
    $nombre: String!
    $password: String!
    $rol: String!
    $estado: String!
  ) {
    signUp(
      input: {
        correo: $correo
        password: $password
        nombre: $nombre
        identificacion: $identificacion
        rol: $rol
        estado: $estado
      }
    ) {
      token
      user {
        id
        nombre
      }
    }
  }
`;

export const SIGN_IN = gql`
mutation signIn($correo: String!,$password: String!) {
    signIn(input:{correo:$correo,password:$password})
    {
      token
      user{
          nombre
      }
    }
  }`;
