import { useContext, useEffect, useState } from "react";
import CloseFriend from "../closeFriend/CloseFriend";
import "./friendList.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
const FriendList = ({ setCurrentChatHandle }) => {
  const {
    user: { user: userInfo, token },
  } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(
          "/api/v1/conversations/" + userInfo.userId,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setConversations(res.data.conversation);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, [userInfo.userId, token]);
  return (
    <ul className="friendList">
      {loading ? (
        <span className="loading-spinner"></span>
      ) : (
        conversations.map((con) => (
          <div onClick={() => setCurrentChatHandle(con)}>
            <CloseFriend
              key={con._id}
              members={con.members}
              currentUser={userInfo}
            />
          </div>
        ))
      )}
    </ul>
  );
};

export default FriendList;
