import "./friendOnline.css";
import Online from "../online/Online";

const FriendOnline = () => {
  return (
    <div>
      <ul className="friendOnlineList">
        <Online />
        <Online />
        <Online />
        <Online />
      </ul>
    </div>
  );
};

export default FriendOnline;
