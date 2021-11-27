const { ApolloServer, gql } = require('apollo-server');
const dotenv = require("dotenv")
const { MongoClient, ObjectId } = require('mongodb');
dotenv.config();
const { DB_URI, DB_NAME, JWT_SECRET } = process.env;
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

//Verificación de Autenticación Por Token
const getToken = (user) => jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30 days' }); //almacenando token desde el user id y la libreria jsonwebtoken

//Creación de Metodo getUserFromToken para las mutaciones que lo requieren
const getUserFromToken = async (token, db) => {
  if (!token) { return "null 1" }
  const tokenData = jwt.verify(token, JWT_SECRET); //funcion de la libreria jsonwebtoken
  if (!tokenData?.id) {
    return null;
  }
  return await db.collection('user').findOne({ _id: ObjectId(tokenData.id) });  //busca el usuario con el _id igual al que reresa el ObjectId
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
    createProject: async (root, { input}, { db, user }) => {
      if (!user) {
        console.log("no está autenticado, inicia sesión")
      }
      const newProject = {
        ...input,
        createdAt: new Date().toISOString(),
        userIds: [user._id],
        userNames: [user.nombre]
      }
      const result = await db.collection("projects").insertOne(newProject);
      return newProject;

    },
    updateUser: async (_, { id, input }, { db, user }) => {
      if (!user) { console.log("No esta autenticado, por favor inicie sesión.") }

      const result = await db.collection("user")
        .updateOne({
          _id: ObjectId(id)
        }, {
          $set: { correo: input.correo,
            password: input.password,
            rol: input.rol,
            estado: input.estado }
        }
        )
      return await db.collection("user").findOne({ _id: ObjectId(id) });
    },
    updateProject: async (_, { id, input }, { db, user }) => {
      if (!user) { console.log("No esta autenticado, por favor inicie sesión.") }

      const result = await db.collection("projects")
        .updateOne({
          _id: ObjectId(id)
        }, {
          $set: { title: input.title,
            objGenerales: input.objGenerales,
            objEspecicos: input.objEspecicos,
            prespuesto: input.prespuesto,
            fechain: input.fechain,
            fechafi: input.fechafi,
            estado: input.estado }
        }
        )
      return await db.collection("projects").findOne({ _id: ObjectId(id) });
    },
    delateUser: async (_, { id }, { db, user }) => {
      if (!user) { console.log("No esta autenticado, por favor inicie sesión.") }

      await db.collection("user").deleteOne({ _id: ObjectId(id) });
      return await db.collection('user').find().toArray();

    },
    delateProject: async (_, { id }, { db, user }) => {
      if (!user) { console.log("No esta autenticado, por favor inicie sesión.") }

      await db.collection("projects").deleteOne({ _id: ObjectId(id) });

      return await db.collection('projects').find().toArray();;
    },

    addUserToProject: async(_, {projectId , userId}, {db,user}) =>{
      if(!user){console.log("No esta autenticado, por favor inicie sesión.")}  //Solo usuarios correctamente logueados lo pueden hacer
      const project= await db.collection("projects").findOne({_id:ObjectId(projectId)});
      const usuario= await db.collection("user").findOne({_id:ObjectId(userId)});
    
      if(!project){
        return null; //Cambiar respuesta a su gusto
      }
     
      if(project.userIds.find((dbId) => dbId.toString()=== userId.toString())){
        return project;  //Evitamos duplicidad 
      }
      await db.collection("projects")
              .updateOne({  //buscaproyecto a actualizar
              _id:ObjectId(projectId)
            }, { 
              $push: {
                userIds: ObjectId(userId),  //empuja el objectid(userId) al arreglo userIds
                userName:usuario.nombre,  //empuja el nombre del usuario al arreglo usernames
              }
            })  
            project.userIds.push(ObjectId(userId))  //Confirmación
            project.userName.push(usuario.nombre)  //confirmación
            return project;
    },

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
  
  type Mutation{
    signUp(input:SignUpInput):AuthUser!
    signIn(input:SignInInput):AuthUser!

    createProject(input:createProject):Project!
    updateUser(id:ID!,input: updateUser):user!
    updateProject(id:ID!,input: updateProject):Project!
    addUserToProject(projectId:ID!, userId: ID!):Project!
    delateUser(id:ID!):[user]!
    delateProject(id:ID!):[Project]!
  }

  input SignUpInput{
    correo: String!
    identificacion: String!
    nombre: String!
    password: String!
    rol: String!
    estado: String
  }

  input updateUser{
    correo: String
    password: String
    rol: String
    estado: String
  }

  input updateProject{
    title: String
    objGenerales: String
    objEspecicos: String
    prespuesto: String
    fechain: String
    fechafi: String
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

  input createProject{
    title: String!
    objGenerales: String!
    objEspecicos: String!
    prespuesto: String!
    fechain: String!
    fechafi: String!
    estado: String

  }

  type Project{
    id: ID!
    title: String!
    objGenerales: String!
    objEspecicos: String!
    prespuesto: String!
    fechain: String!
    fechafi: String!
    users:[user!]!
    createdAt: String!
    estado: String
    progress: Float!
    todos:[Avances!]!
  }
  `;
