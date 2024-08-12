import "./EditRoute.css"
import { createContext, useContext, useEffect, useState } from "react";
import { RouteContext } from "../../../context/RouteContext";
import { useParams, useNavigate } from "react-router-dom";
import * as routeService from "../../../services/routeService"
import { AuthContext } from "../../../context/AuthContext";

const EditRoute =  () => {
        const [currentRoute, setCurrentRoute] = useState({})    
        const {routeEdit} = createContext(RouteContext);
        const {user} = useContext(AuthContext);
        const {routeId}  = useParams();
        const navigate = useNavigate();

        

 
        useEffect(()=>{
            routeService.getOne(routeId)
                .then(route =>{
                setCurrentRoute(route)
                    });
            },[routeId]);

        const onSubmit = (e) => {
                e.preventDefault()
                const routeData = Object.fromEntries(new FormData(e.target));


                routeData['_id']=routeId;
                routeData['_ownerId']=user._id

                routeService.edit(routeId, routeData)
                .then(result => {
                    routeEdit(routeId, result);
                    navigate(`/routes-catalog/${result._id}`);

                });            
            };
    return( 
        <div className="edit-container">
        <h1>Edit Location</h1>
        <form onSubmit={onSubmit}>
          <label htmlFor="imgUrl">Image URL:</label>
          <input type="text" id="imgUrl" name="imgUrl" required="" defaultValue={currentRoute.imgUrl} />
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" required="" defaultValue={currentRoute.location} />
          <label htmlFor="latitude">Coordinates Latitude:</label>
          <input type="text" id="latitude" name="latitude" required="" defaultValue={currentRoute.latitude} />
          <label htmlFor="longitude">Coordinates Longitude:</label>
          <input type="text" id="longitude" name="longitude" required="" defaultValue={currentRoute.longitude} />
          <label htmlFor="game">Game:</label>
          <input type="text" id="game" name="game" required="" defaultValue={currentRoute.game} />
          <label htmlFor="description">Description:</label>
          <textarea type="text" id="description" name="description" required="" defaultValue={currentRoute.description} />
          <button type="submit">Edit</button>
        </form>
      </div>
    );
};

export default EditRoute;