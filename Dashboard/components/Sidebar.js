import { NavLink } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'

const Sidebar = () => {
    return (
    <div className="sidebar bg-light">
        <ul>
            <li>
                <NavLink to="/" exact className='text-dark rounded py-2 w-100 d-inline-block px-3' activeClassName="active"><FaIcons.FaHome className='me-2'/>Inicio</NavLink>
            </li>
            <li>
                <NavLink to="/Register" exact className='text-dark rounded py-2 w-100 d-inline-block px-3' activeClassName="active"><FaIcons.FaUserPlus className='me-2'/>Registro</NavLink>
            </li>
            <li>
                <NavLink to="/Login" exact className='text-dark rounded py-2 w-100 d-inline-block px-3' activeClassName="active"><FaIcons.FaUserCheck className='me-2'/>Loguin</NavLink>                
            </li>
            <li>
                <NavLink to="/Admin" exact className='text-dark rounded py-2 w-100 d-inline-block px-3' activeClassName="active"><FaIcons.FaStore className='me-2'/>Admin</NavLink>                
            </li>
        </ul>
    </div>
    )
}
export default Sidebar;