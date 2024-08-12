import "./AddRoutes.css"
import * as routeService from "../../../services/routeService"
import { useContext, useState } from "react";
import { RouteContext } from "../../../context/RouteContext";
import { AuthContext } from "../../../context/AuthContext";


const AddRoutes = ()=> {
    const {addRouteHandler} = useContext(RouteContext);
    const {user} = useContext(AuthContext);
    const [error, setError] = useState({});
    const [field, setField] = useState({
    imgUrl: "",
    location: "",
    latitude: "",
    longitude: "",
    game:""
  });

  const onSubmit = (e) => {

          e.preventDefault();
          
          const routeData = Object.fromEntries(new FormData(e.target));

          routeData["_ownerId"] = user._id;
        
          routeService.create(routeData)
          .then(result => {
              addRouteHandler(result)
          })


  };

  const changeHandler = (e) => {
    setField(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };


  const inputRequire =  (e) => {
    setError(state => ({
      ...state,
       [e.target.name]: field[e.target.name] === ""
    }));
  
};


const decimalRequire =  (e) => {
  const decimalNumber = /^[+-]?\d*\.\d+$/; 
  setError(state => ({
    ...state,
     [e.target.name]: !decimalNumber.test(field[e.target.name])
  }));

};



    return(
<div className="form-container">
  <h1>Add Location</h1>
  <form onSubmit={onSubmit}>
    <label htmlFor="imgUrl">Image URL:</label>
    <input type="text" id="imgUrl" name="imgUrl" required="" value={field.imgUrl} onChange={changeHandler} onBlur={(e)=>inputRequire(e)} />
    {error.imgUrl && 
    <p className="form-error">Image is mandatory!</p>} 

    <label htmlFor="location">Location</label>
    <input type="text" id="location" name="location" required="" value={field.location} onChange={changeHandler} onBlur={(e)=>inputRequire(e)}/>
    {error.location && 
    <p className="form-error">Location is required!</p>}

    <label htmlFor="latitude">Coordinates Latitude:</label>
    <input type="text" id="latitude" name="latitude" required="" value={field.latitude} onChange={changeHandler} onBlur={(e)=>decimalRequire(e)}/>
    {error.latitude && 
    <p className="form-error">Latitude should be decimal number!</p>}

    <label htmlFor="longitude">Coordinates Longitude:</label>
    <input type="text" id="longitude" name="longitude" required="" value={field.longitude} onChange={changeHandler} onBlur={(e)=>decimalRequire(e)}/>
    {error.longitude && 
    <p className="form-error">Longitude should be decimal number!</p>}

    <label htmlFor="game">Game:</label>
    <input type="text" id="game" name="game" required="" value={field.game} onChange={changeHandler} onBlur={(e)=>inputRequire(e)}  />
    {error.game &&
    <p className="form-error">Game is required!</p>}
    
    <label htmlFor="description">Description:</label>
    <textarea type="text" id="description" name="description" required="" />
    <button type="submit">Post</button>
  </form>
</div>
    );
};

export default AddRoutes