import "./RouteItem.css"
import { Link } from "react-router-dom"

const RouteItem = ({route}) => {
    const  second = route[1]

    return (
        <div className="item">
        <h2>Hunting area</h2>
          <p>
            <img src={second.imgUrl} alt="#"/>
            {/* <strong>Image:</strong> Your Image Here */}
          </p>
          <p>
            <strong>Location:</strong> {second.location}
          </p>
          <p>
            <strong>Games:</strong> {second.game}
          </p>
          <Link to={`/routes-catalog/${second._id}`} className="details-button" >Details</Link>
      
          {/* <button className="btn" onClick="seeLocation()">
            See Location
          </button>
          <button className="btn" onClick="makeReservation()">
            Make Reservation
          </button> */}
      </div>
    )
}


export default RouteItem