import "./online.css";

export default function Online({user}) {
  //const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" 
        /*src={PF+user.profilePicture}*/ 
        src="https://images.pexels.com/photos/12291885/pexels-photo-12291885.jpeg"
        alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">username</span>
    </li>
  );
}
