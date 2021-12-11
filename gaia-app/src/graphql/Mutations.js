import { gql } from '@apollo/client';

const SIGN_UP_MUTATION= gql`
mutation singUp($correo: String!,
  $identificacion: String!,
  $nombre: String!,
  $password: String!,
  $rol: String!){
    signUp( input: {
correo:$correo,
password:$password,
nombre:$nombre,
identificacion:$identificacion,
rol:$rol
}) {
token
user {
  id
  nombre
}
}
}
`;