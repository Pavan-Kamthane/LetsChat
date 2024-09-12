import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  // to store and show this chat in page we need useState
  const [chats, setChats] = useState([]);
  // const fetchChats = async () => {
  //   // const data  =  await axios.get("/api/chat") // whole data dete
  //   const { data } = await axios.get("http://127.0.0.1:5000/api/chat/api/chat"); // destructure  data // ya sathi pakage.json mde proxy link takav

  //   console.log(data);
  //   setChats(data);
  // };
  // what is useeffects :  it is a hook that allows us to run some code when the component is called first time

  useEffect(() => {
    // fetchChats();
  },);

  return (
    <div>
      {/* {chats.map((chat, index) => (
        <div key={index}>
          <h2>{chat.chatName}</h2>
        </div>
      ))} */}

      <h2>
        hiiiiiii
      </h2>
    </div>
  );
};

export default ChatPage;
