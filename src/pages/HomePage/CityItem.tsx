import {
  faCity,
  faGlobe,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PATH } from "../../routes/path";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../redux/slices/hook";
import { setInfoLocationRoom } from "../../redux/slices/roomBasedOnLocationSlice";
import { setLocalStorage } from "../../util";

interface CityItemProp {
  location: any;
}

const CityItem: React.FC<CityItemProp> = ({ location }) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const detailLocationPath = PATH.LOCATION + `/${location.id}`;

  const handleSaveLocation = (locationId: number) => {
    navigate(detailLocationPath);
    dispatch(setInfoLocationRoom(location));
    setLocalStorage("location", location);
  };

  return (
    <div
      className="cursor-pointer"
      onClick={() => handleSaveLocation(location.id)}
      // to={detailLocationPath}
    >
      <div className="h-40 sm:h-80">
        <img
          src={location.hinhAnh}
          alt="air-bnb"
          className="h-full w-full transition duration-1000 ease-in-out hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-4 font-bold text-red-700">
          <FontAwesomeIcon icon={faCity} />
          <p className="text-[1.2vw] text-xl">
            {`Khu Du Lịch ${location.tenViTri}`}
          </p>
        </div>
        <div className="flex items-center gap-4 font-medium text-blue-600">
          <FontAwesomeIcon icon={faLocationDot} />
          <p className="text-[1.2vw] text-xl">
            {`Khu Du Lịch ${location.tinhThanh}`}
          </p>
        </div>
        <div className="flex items-center gap-4 font-medium text-black">
          <FontAwesomeIcon icon={faGlobe} />
          <p className="text-[1.2vw] text-xl">
            {`Khu Du Lịch ${location.quocGia}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CityItem;
