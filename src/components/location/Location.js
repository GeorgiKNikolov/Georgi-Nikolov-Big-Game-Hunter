import React from "react";
import GoogleMapReact from 'google-map-react';
import { useParams } from "react-router-dom";



 const Location = () =>{
  const {coordinates} = useParams();
  const [lat, lon] = coordinates.split(",")

    const defaultProps = {
    center: {
      lat: Number(lat),
      lng: Number(lon)
    },
    zoom: 11
  };

  
  return (
  
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBo_DNLxkf8JNyItZ3DcfSw7CCuHMAiqZ0" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        
      >
      
      </GoogleMapReact>
    </div>
  );
}
export default Location