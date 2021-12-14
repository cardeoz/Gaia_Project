import { BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import './App.scss';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <Router>      
      <div className="flex">
       <Sidebar/>
       <div className="content w-100">
         <Navbar />
         <Route path="/" exact={true} component={Home} />
         <Route path="/Register" exact={true} component={Register} />
         <Route path="/Login" exact={true} component={Login} />
         <Route path="/Admin" exact={true} component={Admin} />
       </div>
      </div>              
    </Router>
  );
}

export default App;
