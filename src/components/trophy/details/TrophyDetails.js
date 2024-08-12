import { useNavigate, useParams } from "react-router-dom"
import "./TrophyDetails.css"
import { Link } from "react-router-dom";
import * as trophyService from "../../../services/trophyService"
import { createContext, useContext } from "react";
import { TrophyContext } from "../../../context/TrophyContext";
import { AuthContext } from "../../../context/AuthContext";


const TrophyDetails = ({trophys})=> {
    const {trophyId} = useParams();
    const navigate = useNavigate();
    const {trophyRemove} = createContext(TrophyContext);
    const {user} = useContext(AuthContext);

    const trophy = Object.values(trophys).find(t => t._id === trophyId);

    const isOwner = trophy._ownerId === user._id

    const trophDeleteHandle = () => {
     const confirmation = window.confirm("Do you want to delete this trophy??")
      if(confirmation){
        trophyService.remove(trophyId)
        .then(()=>{
          trophyRemove(trophyId);
           navigate("/trophy-catalog")
        })
        
      }

    }

    return(
        <div className="form-container">
    <h2>Trophy</h2>
    <div>
      <img src={trophy.imgUrl} alt="Trophy" />
    </div>
    <div>
      <span>
        <strong>Location:</strong>
      </span>
      <p>{trophy.location}</p>
    </div>
    <div>
      <span>
        <strong>Medal:</strong>
      </span>
      <p>{trophy.medal}</p>
    </div>
    <div>
      <span>
        <strong>Description:</strong>
      </span>
      <p>{trophy.description}</p>
    </div>
    <div>
      <span>
        <strong>Price:</strong>
      </span>
      <p>{trophy.price} €</p>
    </div>
    <div>
      <span>
        <strong>Contact:</strong>
      </span>
      <p>{trophy.contact}</p>
    </div>
    { isOwner &&
      <div>
       <Link to={`/trophy-catalog/${trophy._id}/edit`} className="details-button" >Edit</Link>
        <button onClick={trophDeleteHandle}>Delete</button>
      </div>}
  </div>
    ); 
};

export default TrophyDetails;