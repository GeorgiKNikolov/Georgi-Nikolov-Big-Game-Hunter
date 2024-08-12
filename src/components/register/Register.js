import "./Register.css"
import * as authService from "../../services/authService.js"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState({})
  const [field, setField] = useState({
    username: "",
    password: ""
  })
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (e)=> {
      e.preventDefault();

      const formData = new FormData(e.target);

      const email = formData.get("username")
      const password = formData.get("password");
      const confirmPassword = formData.get("confirm-password")

      if(password !== confirmPassword){
        alert("password doesn't mutch")
        return
      };

      authService.register(email,password)
      .then(userData => {
        userLogin(userData);
        navigate("/");
      });

  };


  const changeHandler = (e) => {
    setField(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const minLength =  (e, number) => {
      setError(state => ({
        ...state,
         [e.target.name]: field[e.target.name].length < number
      }));
    
  };

  const email = (e, symbol) => {
      setError(state => ({
        ...state,
         [e.target.name]: !field[e.target.name].includes(symbol)
      }));
    
  };

  const isValid = !Object.entries(error).some(x => x);


    return(
        <>
        <div className="container">
  <form className="register-form" onSubmit={onSubmit}>
    <h2>Register</h2>
    <label htmlFor="username">Username</label>
    <input type="text" id="username" name="username" required="" value={field.username} onChange={changeHandler} onBlur={(e)=> email(e, '@')} />
    {error.username && 
    <p className="form-error">username should be email</p>
    }
    
    <label htmlFor="password">Password</label>
    <input type="password" id="password" name="password" required=""  value={field.password} onChange={changeHandler} onBlur={(e)=> minLength(e, 5)} />
    {error.password && 
    <p className="form-error">Password should be at least 5 symbols</p> }
    <label htmlFor="confirm-password">Confirm Password</label>
    <input
      type="password"
      id="confirm-password"
      name="confirm-password"
      required=""
    />
    <button type="submit" disabled={!!isValid}>Register</button>
  </form>
</div>
        </>
    )
}

export default Register
