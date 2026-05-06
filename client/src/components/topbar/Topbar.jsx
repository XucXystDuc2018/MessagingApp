import "./topbar.css";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faMessage } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export default function Topbar() {
  const {
    user: userInfo,
    dispatch,
  } = useContext(AuthContext);
  const PublicFolder = import.meta.env.VITE_PUBLIC_FOLDER;
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span className="logo">Maering</span>
        </Link>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <FontAwesomeIcon icon={faUserGroup} />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <FontAwesomeIcon icon={faMessage} />
            <span className="topbarIconBadge">2</span>
          </div>
        </div>
        <Link to={`/profile/${userInfo.userId}`}>
          <img
            alt=""
            className="topbarImg"
            src={
              userInfo.profilePicture
                ? PublicFolder + userInfo.profilePicture
                : PublicFolder + "person/noAvatar.png"
            }
          />
        </Link>
        <button className="logoutBtn" onClick={handleLogoutClick}>
          Log out
        </button>
      </div>
    </div>
  );
}
