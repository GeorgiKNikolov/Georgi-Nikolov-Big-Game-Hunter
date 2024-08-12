import * as request from "./requester";



export const getWeather = (city)=> {
  return  request.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)
}