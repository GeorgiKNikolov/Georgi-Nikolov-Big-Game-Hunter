import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const RouteGuard = ({children}) => {
    const {user} =useContext(AuthContext);

        if(!user.email){
            return <Navigate to={"/login"} replace/>
        };

        return (
            <>
            {children}
            </>
        )

};

export default RouteGuard;