import "./Login.css"
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";


const Login =  () => {
  const {userLogin} = useContext(AuthContext)
const navigate = useNavigate();


const onSubmit = (e) =>{
  e.preventDefault();

  const {email, password} = Object.fromEntries(new FormData(e.target))

  login(email, password)
  .then(userData => {
    userLogin(userData)
    navigate("/")
  })
  .catch(()=>{
    // navigate("/404") to do page for 404 
  })
  

}

return(
    <>
     <div className="container">
    <form className="login-form" onSubmit={onSubmit}>
      <h2>Login</h2>
      <label htmlFor="email">Email</label>
      <input type="text" id="email" name="email" required="" />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" required="" />
      <button type="submit">Login</button>
    </form>
  </div>
    
    </>
)
}

export default Login;