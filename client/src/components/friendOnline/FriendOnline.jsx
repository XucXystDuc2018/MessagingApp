import "./friendOnline.css";
import Online from "../online/Online";
import { useState, useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const FriendOnline = ({ onlineUsers }) => {
  const {
    user: { user: userInfo, token },
  } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        `/api/v1/profiles/${userInfo.userId}/friends`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setFriends(res.data.friendList);
    };
    getFriends();
  }, [userInfo.userId, token]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((friend) => {
        let onlineUserIds = onlineUsers.map((onlineUser) => onlineUser.userId);
        return onlineUserIds.includes(friend._id);
      }),
    );
  }, [friends, onlineUsers]);
  return (
    <div>
      <ul className="friendOnlineList">
        {onlineFriends.map((online) => (
          <Online key={online._id} onlineUser={online} />
        ))}
      </ul>
    </div>
  );
};

export default FriendOnline;
