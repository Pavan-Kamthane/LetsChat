import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Toast,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../User/UserListItem";
import { Spinner } from "@chakra-ui/spinner";
import { getSender } from "../../config/ChatLogics";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";


const Header = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();

  const toast = useToast();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"white"}
        color={"black"}
        p={"spx 10px"}
        borderWidth={"5px"}
      >
        <Tooltip label="Search user to chat" hasArrow placement="bottom">
          <Button
            variant={"ghost"}
            color={"black"}
            // w={'100%'}
            onClick={onOpen}
          >
            <SearchIcon />
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize={"2xl"} fontFamily={"Works snas"} fontWeight={"bold"}>
          चर्चा (Charcha)
        </Text>

        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge 
                count = {notification.length}
                effect = {Effect.SCALE}
              />
              <BellIcon fontSize={"2xl"} m={1} />
            </MenuButton>
            <MenuList color={"white"} bg={"black"}>
              {!notification.length && (
                <MenuItem bg={"black"}> No notifications</MenuItem>
              )}
              {notification.map((notif) => (
                <MenuItem key={notif._id} bg={"black"} onClick={()=>{
                  setSelectedChat(notif.chat)
                  setNotification(notification.filter((n)=> n!== notif))
                }}>
                  <Text color={"orange"} fontWeight={'bold'}>
                    {notif.chat.isGroupChat
                      ? `New message in ${notif.chat.chatName}`
                      : `New message from  ${getSender(user,notif.chat.users)}`}
                  </Text>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              color={"black"}
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              <Avatar
                size={"sm"}
                cursor={"pointer"}
                name={user.name}
                src={user.pic}
              />
            </MenuButton>

            <MenuList bg={"white"}>
              <ProfileModal user={user}>
                <MenuItem bg={"white"} _hover={"white"}>
                  My Profile
                </MenuItem>
              </ProfileModal>
              {/* <Divider bg={'black'} /> */}
              <MenuDivider bg={"black"} />
              <MenuItem
                color={"black"}
                bg={"white"}
                _hover={"white"}
                onClick={logoutHandler}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen} bg="white">
        <DrawerOverlay />
        <DrawerContent
        //  bg={"white"} color={"black"}
        >
          <DrawerHeader
            borderBottomWidth={"1px"}
            textTransform={"uppercase"}
            fontSize={"l"}
          >
            Search चर्चा (Charcha) Users
          </DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>

            {/* my ocde */}
            {/* {loading ? (
                <ChatLoading/>
              ):(
                searchResult?.map((user) =>{
                  <UserListItem
                    key=  {user._id}
                    user={user}
                     handleFunction={() => accessChat(user._id)}
                  />
                })
              )
            } */}

            {/* copied code */}
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
