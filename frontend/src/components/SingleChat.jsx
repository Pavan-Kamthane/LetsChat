import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, FormControl, IconButton, Input, Spinner, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./Complex/ProfileModal";
import UpdateGroupChatModal from "./Complex/UpdateGroupChatModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();

    const sendMessage = ()=>{}
    const typingHandler = () => {};
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
              <div>{/* msgs */}</div>
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
