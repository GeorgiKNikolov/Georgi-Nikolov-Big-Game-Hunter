import { Link } from "react-router-dom"
import { useContext } from "react"

import { AuthContext } from "../../context/AuthContext"

import "./Navigation.css"


const Navigation = () => {

  const { user } = useContext(AuthContext)


    return(
        <nav style={{backgroundColor: "black"}}>
          
            {user.email ?
     <ul>
      {user.email && <span style={{color: "white"}}>{user.email}</span>} 
            <li>
              <Link to="/routes-catalog">Routes</Link>
            </li>
            <li>
              <Link to="/trophy-catalog">Trophy</Link>
            </li>
            <li>
            <Link to="/weather">Weather</Link>
           </li>
           <li>
           <Link to="/add-trophy">Add Trophy</Link>
          </li>
           <li>
               <Link to="/add-routes">Add Routes</Link>
          </li>
           <li>
               <Link to="/logout">Logout</Link>
           </li> 
           <li>
              <Link to="/">Home</Link>
            </li>
         
     </ul> 
 : 
      <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
         
    </ul>
            }
      
        </nav>
    )
}

export default Navigation