
import TrophyItem from "./TrophyItem/TrophyItem.js";

const TrophyCatalog = ({trophys}) => {
  return (
    <div className="catalog">
		{Object.entries(trophys).map(t => <TrophyItem key={t._id} trophy={t} />)}
    </div>
  );
};

export default TrophyCatalog;
