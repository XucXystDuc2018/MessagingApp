import "./online.css";

export default function Online({ onlineUser }) {
  const PublicFolder = import.meta.env.VITE_PUBLIC_FOLDER;

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          className="rightbarProfileImg"
          src={
            onlineUser?.profilePicture
              ? PublicFolder + onlineUser.profilePicture
              : PublicFolder + "person/noCover.png"
          }
          alt=""
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{onlineUser?.username}</span>
    </li>
  );
}
