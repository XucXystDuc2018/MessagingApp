import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router";

export default function Profile() {
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const [user, setUser] = useState({});
  // const username = useParams().username;

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await axios.get(`/users?username=${username}`);
  //     setUser(res.data);
  //   };
  //   fetchUser();
  // }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="https://images.pexels.com/photos/37217406/pexels-photo-37217406.jpeg"
                alt=""
              />
              <img
                className="profileUserImg"
                src="https://images.pexels.com/photos/19983298/pexels-photo-19983298.jpeg"
                alt=""
              />
            </div>
            </div>
        </div>
        <div className="profileInfo">
              <h4 className="profileInfoName">username</h4>
              <span className="profileInfoDesc">I love chicken</span>
            </div>
      </div>
    </>
  );
}
