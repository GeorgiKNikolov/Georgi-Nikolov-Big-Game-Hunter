
import { useNavigate, useParams } from "react-router-dom"
import"./RouteDetails.css"
import { Link } from "react-router-dom"
import * as routeService from "../../../services/routeService"
import { createContext, useContext } from "react"
import { RouteContext } from "../../../context/RouteContext"
import { AuthContext } from "../../../context/AuthContext"


const RouteDetails = ({routes}) =>{
  
const {routeId} = useParams();
const navigate = useNavigate();
const {routeRemove} = createContext(RouteContext);
const {user} = useContext(AuthContext)



const route = Object.values(routes).find(r => r._id === routeId)

const isOwner = route._ownerId === user._id

const routeDeleteHandler = () => {
  const confirmation = window.confirm("Do you want to delete this location ??")
  if(confirmation){
    routeService.remove(routeId)
    .then(()=>{
      routeRemove(routeId);
      navigate("/routes-catalog");
    });
  };
};


const coordinates = [route.latitude, route.longitude]



    return(
      <div className="form-container">
      <h2>Hunting Area</h2>
      <div>
        <img src={route.imgUrl} alt="#"/>
      </div>
      <div>
        <span>
          <strong>Location:</strong>
        </span>
        <p>{route.location}</p>
      </div>
      <div>
        <span>
          <strong>Game:</strong>
        </span>
        <p>{route.game}</p>
      </div>
      <div>
        <span>
          <strong>Description:</strong>
        </span>
        <p>{route.description}</p>
      </div>
      <div>
        <span>
          <strong>Coordinates:</strong>
        </span>
        <p>Latitude: {route.latitude} </p>
        <p>Longitude: {route.longitude}</p>
      </div>
      {isOwner && 
      <div>
      <Link to={`/routes-catalog/${route._id}/edit`} className="details-button" >Edit</Link>
      <button onClick={routeDeleteHandler}>Delete</button> 
      </div>
      }
      <Link to={`/location/${coordinates}`} className="details-button" >Find Location</Link>
    </div>
    );
         
};

export default RouteDetails;