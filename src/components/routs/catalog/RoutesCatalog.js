import "./RoutesCatalog.css";

import RouteItem from "./RouteItem.js/RouteItem.js";

const RoutesCatalog = ({routes}) => {


  return (
    <div className="catalog">
      {Object.entries(routes).map(r => <RouteItem key={r._id} route={r} />)}
    </div>
  
  );
};

export default RoutesCatalog;
