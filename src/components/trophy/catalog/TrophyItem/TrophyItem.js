import "./Trophy.css"
import { Link } from "react-router-dom"

const TrophyItem = ({trophy})=>{
      
const  second = trophy[1]

    return(
         <div className="item">
        <h2>Trophy</h2>
        <img src={second.imgUrl} alt="#"/>
        <p><strong>Medal:</strong> {second.medal}</p>
        <p><strong>Description:</strong> {second.description}</p>
        <Link to={`/trophy-catalog/${second._id}`} className="details-button" >Details</Link>
        </div>
    )
        
}

export default TrophyItem