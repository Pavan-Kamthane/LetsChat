import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isSameSender } from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
    const { user } = ChatState(); 
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {
                (isSameSender(messages,m,i,user._id))
            }
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
