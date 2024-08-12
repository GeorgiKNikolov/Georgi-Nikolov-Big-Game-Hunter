import { useContext, useState } from "react"
import { TrophyContext } from "../../../context/TrophyContext"
import { AuthContext } from "../../../context/AuthContext"
import "./AddTrophy.css"
import * as trophyService from "../../../services/trophyService"


const AddTrophy = () => {
  const { addTrophyHandler } =useContext(TrophyContext);
  const {user} = useContext(AuthContext);
  const [error, setError] = useState({});
  const [field, setField] = useState({
  imgUrl: "",
  location: "",
  medal: "",
  price: "",
  contact:"",
  description: ""
});

  const onSubmit = (e) => {
      e.preventDefault();
      const trophyData = Object.fromEntries(new FormData(e.target));
      
      trophyData["_ownerId"] = user._id;

      trophyService.create(trophyData)
      .then(result =>{
         addTrophyHandler(result)
      
      });

     
  };

  const inputRequire =  (e) => {
    setError(state => ({
      ...state,
       [e.target.name]: field[e.target.name] === ""
    }));
  
};


  
  const changeHandler = (e) => {
    setField(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));

  };



    return(
        
    <div className="container">
    <form className="trophy-form" onSubmit={onSubmit}>
    <h1>Add Trophy</h1>
    <label htmlFor="imgUrl">Image</label>
    <input type="text" id="imgUrl" name="imgUrl" required="" value={field.imgUrl} onChange={changeHandler} onBlur={(e)=>inputRequire(e)}  />
    {error.imgUrl && 
    <p className="form-error">Image is mandatory!</p>}

    <label htmlFor="location">Location</label>
    <input type="text" id="location" name="location" required="" value={field.location} onChange={changeHandler} onBlur={(e)=>inputRequire(e)}/>
    {error.location && 
    <p className="form-error">Location is required!</p>}
    

    <label htmlFor="medal">Medal</label>
    <select id="medal" name="medal" required="">
      <option value="gold">Gold</option>
      <option value="silver">Silver</option>
      <option value="bronze">Bronze</option>
      <option value="world_record">World Record</option>
    </select>
    
    
    <label htmlFor="description">Description</label>
    <textarea type="text" id="description" name="description" required="" value={field.description} onChange={changeHandler} onBlur={(e)=>inputRequire(e)} />
    {error.description && 
    <p className="form-error">You should say something about trophy!</p>}
    

    <label htmlFor="price">Price</label>
    <input type="number" id="price" name="price" required="" value={field.price} onChange={changeHandler} onBlur={(e)=>inputRequire(e)}/>
    {error.price && 
    <p className="form-error">Price is required!</p>}

    <label htmlFor="contact">Contact</label>
    <input type="text" id="contact" name="contact" required="" value={field.contact} onChange={changeHandler} onBlur={(e)=>inputRequire(e)}/>
    {error.contact && 
    <p className="form-error">Contact is required!</p>}

    <button type="submit">Save</button>
  </form>
</div>
      
    );
};

export default AddTrophy