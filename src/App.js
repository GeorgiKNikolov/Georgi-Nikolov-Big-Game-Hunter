import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/home/Home.js";
import Login from "./components/login/Login.js";
import Register from "./components/register/Register.js";
import AddRoutes from "./components/routs/add/AddRoutes.js";
import RoutesCatalog from "./components/routs/catalog/RoutesCatalog.js";
import EditRoute from "./components/routs/edit/EditRoute.js";
import AddTrophy from "./components/trophy/add/AddTrophy.js";
import TrophyCatalog from "./components/trophy/catalog/TrophyCatalog.js";
import Navigation from "./components/navigation/Navigation.js";
import RouteDetails from "./components/routs/details/RouteDetails.js";
import * as routeService from "./services/routeService.js"
import * as trophyService from "./services/trophyService.js"
import TrophyDetails from "./components/trophy/details/TrophyDetails.js";
import { AuthProvider } from "./context/AuthContext.js";
import { TrophyContext } from "./context/TrophyContext.js";
import { RouteContext } from "./context/RouteContext.js";
import Logout from "./components/logout/Logout.js";
import EditTrophy from "./components/trophy/edit/EditTrophy.js";
import RouteGuard from "./components/routeguard/RouteGuard.js";
import Weather from "./components/weather/Weather.js";
import Location from "./components/location/Location.js";




function App() {
  const [routes, setRoutes] = useState([]);
  const [trophys, setTrophys] = useState([]);
  const navigate = useNavigate();  



  const addTrophyHandler = (trophyData) =>{ 
      setTrophys(state => ([
        ...state,
        trophyData
      ])
      );
      navigate("/trophy-catalog");
  };

  const addRouteHandler = (routeData) => {
        setRoutes(state => ([
          ...state,
          routeData
        ])
      );
        navigate("/routes-catalog");
  };

  const routeEdit = (routeId, routeData) => {
    setRoutes(state => state.map(x => x._id === routeId ? routeData: x));
   
  };

  const routeRemove = (routeId) => {
    setRoutes(state => state.filter(x => x._id !== routeId));
  };

  const trophyEdit = (trophyId, trophyData) => {
    setTrophys(state => state.map(x => x._id === trophyId ? trophyData: x));
  };

  const trophyRemove = (trophyId)=>{
    setTrophys(state => state.filter(x => x._id !== trophyId))
  };

  useEffect(()=>{
      routeService.getAll()
      .then(result=>{
          setRoutes(result);
      });
  },[]);

  
   useEffect(()=>{
       trophyService.getAll()
        .then(result=>{
			setTrophys(result);
		});
},[]);

  return (
    <AuthProvider >
    <TrophyContext.Provider value={{trophys, addTrophyHandler, trophyEdit, trophyRemove}}>
    <RouteContext.Provider value={{routes, addRouteHandler, routeEdit ,routeRemove}}>
    <div className="App">

    <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/weather" element={<Weather/>}/>
        <Route path="/location/:coordinates" element={<Location/>}/>
        <Route path="/add-trophy" element={<RouteGuard><AddTrophy/></RouteGuard> }/>
        <Route path="/trophy-catalog" element={<RouteGuard><TrophyCatalog trophys={trophys}/></RouteGuard>  } />
        <Route path="/trophy-catalog/:trophyId" element={<TrophyDetails trophys={trophys}/>}/>
        <Route path="/trophy-catalog/:trophyId/edit" element={<EditTrophy/>}/>
        <Route path="/add-routes" element={<RouteGuard><AddRoutes/></RouteGuard> } />
        <Route path="/routes-catalog" element={<RouteGuard> <RoutesCatalog routes={routes} /></RouteGuard> } />
        <Route path="/routes-catalog/:routeId" element={<RouteDetails routes={routes} />}/>
        <Route path="/routes-catalog/:routeId/edit" element={<EditRoute/>} />
      </Routes>

    </div>
    </RouteContext.Provider> 
    </TrophyContext.Provider>
    </AuthProvider>
  );
};


export default App;
