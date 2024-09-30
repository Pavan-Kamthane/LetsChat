import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./Complex/ProfileModal";
import UpdateGroupChatModal from "./Complex/UpdateGroupChatModal";
import axios from "axios";
import "./style.css";
import ScrollableChat from "./ScrollableChat";
import  io from 'socket.io-client';


const ENDPOINT = "http://localhost:5000";
var socket,selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const toast = useToast();
  const [socketConnected, setSocketConnected] = useState(false);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );

      console.log(data);

      setMessages(data);
      setLoading(false);

      socket.emit('join chat',selectedChat._id)
    } catch (error) {
      toast({
        title: "Error fetching messages",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const data = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data);

        setMessages([...messages, data.data]);
      } catch (error) {
        toast({
          title: "Error Occured",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };


  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('setup',user)
    socket.compress('connection',()=> setSocketConnected(true))
  }, []);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // typing indicator logic
  };
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w={"100%"}
            fontFamily={"Works sans"}
            display={"flex"}
            justifyContent={{ base: "space-between" }}
            alignItems={"center"}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat(null)}
            />

            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-end"}
            p={3}
            // faintwhite
            bg={"#684a14"}
            w={"100%"}
            h={"100%"}
            borderRadius={"lg"}
            overflowY={"hidden"}
          >
            {loading ? (
              <Spinner
                size={"xl"}
                h={20}
                w={20}
                alignSelf={"center"}
                margin={"auto"}
                color="white"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                variant="filled"
                bg="#fff"
                placeholder="Enter a message"
                _placeholder={{ color: "#000" }} // Set the placeholder color to black
                color="#000" // Set the text color to black
                _hover={{
                  bg: "#fff", // Maintain white background on hover
                  borderColor: "#999", // Change border color on hover
                }}
                _focus={{
                  outline: "none", // Remove default outline on focus
                  borderColor: "#684a14", // Set the border color on focus
                  boxShadow: "0 0 5px #684a14", // Add shadow on focus
                }}
                border="1px solid #ccc" // Set default border
                borderRadius="8px" // Add rounded corners
                p={3} // Add padding
                fontSize="16px" // Set font size
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
        >
          <Text fontSize={"3xl"} pb={3} fontFamily={"Works sans"}>
            Click on user or Group to start chat
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
