const { ApolloServer, gql } = require('apollo-server');
const dotenv = require("dotenv")
const { MongoClient, ObjectId } = require('mongodb');
dotenv.config();
const { DB_URI, DB_NAME, JWT_SECRET } = process.env;
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const getToken = (user) => jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '30 days' });
const getUserFromToken = async (token, db) => {
  // if (!token) { return "ok" }
  const tokenData = jwt.verify(token, JWT_SECRET);
  return await db.collection("user").findOne({ _id: ObjectId(tokenData.id) });
}


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    userList: async (_, __, { db }) => {
      return await db.collection('user').find().toArray();
    },
    projectList: async (_, __, { db }) => {
      return await db.collection('projects').find().toArray();
    },
  },
  //Mutationes
  Mutation: {
    signUp: async (root, { input }, { db }) => {
      const hashedPassword = bcrypt.hashSync(input.password)
      const newUser = {
        ...input,
        password: hashedPassword,
      }
      const result = await db.collection("user").insertOne(newUser);
      //Funcion asincrona que puede recibir 3 argumentos y regresa un objeto
      return {
        user: newUser,
        token: getToken(newUser),
      }
    },
    signIn: async (root, { input }, { db }) => {
      const user = await db.collection("user").findOne({ correo: input.correo })
      const IsPasswordCorrect = user && bcrypt.compareSync(input.password, user.password)

      if (!user || !IsPasswordCorrect) {
        throw new Error("credenciales incorrectas")
      }
      return {
        user,
        token: getToken(user),
      }
    },
    createProject: async (root, { title }, { db, user }) => {
      if (!user) {
        console.log("no está autenticado, inicia sesión")
      }
      const newProject = {
        title,
        createdAt: new Date().toISOString(),
        userIds: [user._id]
      }
      const result = await db.collection("projects").insertOne(newProject);
      return newProject;

    },
    updateUser: async (_, { id, estado }, { db, user }) => {
      if (!user) { console.log("No esta autenticado, por favor inicie sesión.") }

      const result = await db.collection("user")
        .updateOne({
          _id: ObjectId(id)
        }, {
          $set: { estado }
        }
        )
      return await db.collection("user").findOne({ _id: ObjectId(id) });
    },
    delateUser: async (_, { id}, { db, user }) => {
      if (!user) { console.log("No esta autenticado, por favor inicie sesión.") }

     await db.collection("user").delateOne({ _id: ObjectId(id) });

      return true
    }

  },

  //inmutable
  user: {
    id: (root) => {
      return root._id;
    }
  },
  Project: {
    id: (root) => {
      return root._id;
    },
    progress: () => 30,

    users: async ({ userIds }, _, { db }) => Promise.all(
      userIds.map((userId) => (
        db.collection('user').findOne({ _id: userId }))
      )
    ),
  },
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const start = async () => {
  const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db(DB_NAME)


  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const user = await getUserFromToken(req.headers.authorization, db);
      console.log(user)
      return {
        db,
        user,
      }
    }
  })

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}
start();


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`

  type Query{
      userList:[user!]!
      projectList:[Project!]!
  }
  
  type user{
      id: ID!
      correo: String!
      identificacion: String!
      nombre: String!
      password: String!
      rol: String!
      estado: String
  } 
  
  type proyectos{
      id: ID!
      nombre: String!
      objGenerales: String!
      objEspecicos: String!
      prespuesto: String!
      fechain: String!
      fechafi: String!
      user:[user!]!
  }
  
  type Mutation{
    signUp(input:SignUpInput):AuthUser!
    signIn(input:SignInInput):AuthUser!

    createProject(title:String!):Project!
    updateUser(id:ID!, estado:String!):user!
    delateUser(id:ID!):Boolean!
  }

  input SignUpInput{
    correo: String!
    identificacion: String!
    nombre: String!
    password: String!
    rol: String!
    estado: String
  }

  input SignInInput{
    correo: String!
    password: String!
  }

  type AuthUser{
      user:user!
      token: String!
  }

  type Avances{
    id: ID!
    content: String!
    isCompleted: Boolean!
    project:Project!
  }

  type Project{
    id: ID!
    createdAt: String!
    title: String!
    progress: Float!
    users: [user!]!
    todos:[Avances!]!
  }


  `;
