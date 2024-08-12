import "./EditTrophy.css"
import { createContext, useContext, useEffect, useState,  } from "react"
import { TrophyContext } from "../../../context/TrophyContext"
import { useNavigate, useParams } from "react-router-dom";
import * as trophyService from "../../../services/trophyService"
import { AuthContext } from "../../../context/AuthContext";


const EditTrophy = () => {
      const [currentTrophy, setCurrentTrophy]= useState({});
      const {trophyEdit} = createContext(TrophyContext);
      const {user} = useContext(AuthContext);
      const {trophyId} = useParams();
      const navigate = useNavigate();


      useEffect(()=>{
          trophyService.getOne(trophyId)
          .then(trophy => {
            setCurrentTrophy(trophy);
          });
      },[trophyId]);

    const onSubmit = (e) =>{
          e.preventDefault();

          const data = Object.fromEntries(new FormData(e.target));

           data['_id']=trophyId;
           data['_ownerId']=user._id

          trophyService.edit(trophyId,data)
          .then(result => {
            trophyEdit(trophyId, result)
            navigate(`/trophy-catalog/${result._id}`)
          });

    };

    return(
        <div className="container">
     <form className="trophy-form" onSubmit={onSubmit}>
    <h1>Add Trophy</h1>
    <label htmlFor="imgUrl">Image</label>
    <input type="text" id="imgUrl" name="imgUrl" required="" defaultValue={currentTrophy.imgUrl} />

    <label htmlFor="location">Location</label>
    <input type="text" id="location" name="location" required="" defaultValue={currentTrophy.location} />

    <label htmlFor="medal">Medal</label>
    <select id="medal" name="medal" required="" defaultValue={currentTrophy.medal}>
      <option value="gold">Gold</option>
      <option value="silver">Silver</option>
      <option value="bronze">Bronze</option>
      <option value="world_record">World Record</option>
    </select>
    
    <label htmlFor="description">Description</label>
    <textarea type="text" id="description" name="description" required="" defaultValue={currentTrophy.description} />

    <label htmlFor="price">Price</label>
    <input type="number" id="price" name="price" required="" defaultValue={currentTrophy.price} />

    <label htmlFor="contact">Contact</label>
    <input type="text" id="contact" name="contact" required="" defaultValue={currentTrophy.contact} />

    <button type="submit">Edit</button>
  </form>
</div>
    );
};
export default EditTrophy