import Message from "../message/Message";
import "./messageBoard.css";

const MessageBoard = () => {
  return (
    <div className="messageBoardContainer">
      <div className="chatBoxWrapper">
        <div className="chatBoxTop">
          <Message />
          <Message own="true" />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </div>
        <div className="chatBoxBottom">
          <textarea
            className="chatMessageInput"
            placeholder="write something..."
          ></textarea>
          <button className="chatSubmitButton">Send</button>
        </div>
      </div>
    </div>
  );
};

export default MessageBoard;
