import "./topbar.css";
import { Link } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup, faMessage } from '@fortawesome/free-solid-svg-icons'

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to={'/'} style={{ textDecoration: "none" }}>
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
        <Link to={`/profile/vam`}>
          <img
            alt=""
            className="topbarImg"
            src="https://images.pexels.com/photos/19983298/pexels-photo-19983298.jpeg"
          />
        </Link>
      </div>
    </div>
  );
}
