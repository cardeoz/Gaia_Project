import { gql } from '@apollo/client';

export const GET_USER=gql`
 {
    userList {
      id
      nombre
      correo
    }
  }
  `