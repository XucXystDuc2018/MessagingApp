import Message from "../message/Message";
import "./messageBoard.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

const MessageBoard = ({ currentChat, setOnlineUsersHandle }) => {
  const {
    user: { user: userInfo, token },
  } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userInfo.userId);
    socket.current.on("getUsers", (users) => {
      setOnlineUsersHandle(users); //[{userId, socketId}]
    });
  }, [userInfo]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/api/v1/messages/" + currentChat?._id, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data.messages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, [currentChat, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage) {
      const message = {
        conversationId: currentChat._id,
        sender: userInfo.userId,
        text: newMessage,
      };

      const receiverId = currentChat.members.find(
        (member) => member !== userInfo.userId,
      );
      socket.current.emit("sendMessage", {
        senderId: userInfo.userId,
        receiverId,
        text: newMessage,
      });

      try {
        //post new message to db
        const res = await axios.post("/api/v1/messages/", message, {
          headers: { Authorization: `Bearer ${token}` },
        });
        //set messages state in the frontend
        setMessages([...messages, res.data.newMessage]);
        setNewMessage("");
      } catch (error) {
        console.log(error);
      }
    } else return;
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messageBoardContainer">
      <div className="chatBoxWrapper">
        {currentChat ? (
          <>
            <div className="chatBoxTop">
              {messages.map((mes) => (
                <div ref={scrollRef}>
                  <Message message={mes} own={mes.sender === userInfo.userId} />
                </div>
              ))}
            </div>
            <div className="chatBoxBottom">
              <textarea
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                className="chatMessageInput"
                placeholder="write something..."
              ></textarea>
              <button className="chatSubmitButton" onClick={handleSubmit}>
                Send
              </button>
            </div>
          </>
        ) : (
          <span className="noConversationText">
            Select a conversation to start chatting
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageBoard;
