// import './App.css';
import Login from './components/Login';
import Nav from './components/Nav';
import { Registro } from './components/Registro';
import { RegProyecto } from './components/RegProyecto';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <Registro></Registro>
      <Login></Login>
      <RegProyecto></RegProyecto>
    </div>
  );
}

export default App;
