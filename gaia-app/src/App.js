// import './App.css';
import Login from './components/Login';
import Nav from './components/Nav';
import { Registro } from './components/Registro';
import Usuarios from './components/Usuarios';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <Registro></Registro>
      <Login></Login>
      <Usuarios></Usuarios>
    </div>
  );
}

export default App;
