import { useEffect, useState } from "react";
import "./closeFriend.css";
import axios from "axios";

export default function CloseFriend({ members, currentUser }) {
  const PublicFolder = import.meta.env.VITE_PUBLIC_FOLDER;
  const [user, setUser] = useState({});

  useEffect(() => {
    const friendId = members.find((m) => m !== currentUser.userId);
    const getUser = async () => {
      try {
        const res = await axios.get("/api/v1/profiles/" + friendId);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, members]);
  return (
    <li className="sidebarFriend">
      <img
        className="sidebarFriendImg"
        alt=""
        src={
          user.profilePicture
            ? PublicFolder + user.profilePicture
            : PublicFolder + "person/noCover.png"
        }
      />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
