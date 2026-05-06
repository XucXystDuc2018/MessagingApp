import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const { user: currentUser } = useContext(AuthContext);
  const PublicFolder = import.meta.env.VITE_PUBLIC_FOLDER;
  const [userProfile, setUserProfile] = useState({});
  const {userId} = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await axios.get(`/api/v1/profiles/${userId}`);
      setUserProfile(res.data.user);
    };
    fetchUserProfile();
  }, [userId]);

  return (
    <>
      {currentUser ? <Topbar /> : <div></div>}
      <div className="profile">
        <div className="profileCoverContainer">
          <div className="profileCover">
            <img
              className="profileCoverImg"
              src={
                  userProfile.coverPicture
                    ? PublicFolder + userProfile.coverPicture
                    : PublicFolder + "person/noCover.png"
                }
              alt=""
            />
            <img
              className="profileUserImg"
              src={
                  userProfile.profilePicture
                    ? PublicFolder + userProfile.profilePicture
                    : PublicFolder + "person/noAvatar.png"
                }
              alt=""
            />
          </div>
        </div>

        <div className="profileInfo">
          <h4 className="profileInfoName">{userProfile.username}</h4>
          <span className="profileInfoDesc">{userProfile.description}</span>
        </div>
      </div>
    </>
  );
}
