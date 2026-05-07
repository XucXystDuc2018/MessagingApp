import FriendList from "../../components/friendList/FriendList";
import FriendOnline from "../../components/friendOnline/FriendOnline";
import MessageBoard from "../../components/messageBoard/MessageBoard";
import Topbar from "../../components/topbar/Topbar";
import "./home.css";
import { useState } from "react";

export default function Home() {
  const [currentChat, setCurrentChat] = useState(null);
  
  return (
    <>
      <div className="homeContainer">
        <Topbar />
        <div className="messengerContainer">
          <div className="chatMenu">
            <input placeholder="Search for friends" className="chatMenuInput" />
            <FriendList setCurrentChatHandle={setCurrentChat}/>
          </div>
          <MessageBoard currentChat={currentChat}/>
          <FriendOnline />
        </div>
      </div>
    </>
  );
}
