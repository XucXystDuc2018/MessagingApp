import FriendList from "../../components/friendList/FriendList";
import FriendOnline from "../../components/friendOnline/FriendOnline";
import MessageBoard from "../../components/messageBoard/MessageBoard";
import Topbar from "../../components/topbar/Topbar";
import "./home.css";

export default function Home() {
  return (
    <>
      <div className="homeContainer">
        <Topbar />
        <div className="messengerContainer">
          <div className="chatMenu">
            <input placeholder="Search for friends" className="chatMenuInput" />
            <FriendList />
          </div>
          <MessageBoard />
          <FriendOnline />
        </div>
      </div>
    </>
  );
}
