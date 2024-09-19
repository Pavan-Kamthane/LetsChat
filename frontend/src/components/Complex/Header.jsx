import {
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";

const Header = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { user } = ChatState();
  return (
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
        >
          <SearchIcon />
          <Text display={{ base: "none", md: "flex" }} px={4}>
            Search User
          </Text>
        </Button>
      </Tooltip>

      <Text fontSize={"2xl"} fontFamily={"Works snas"}>
        चर्चा (Charcha)
      </Text>

      <div>
        <Menu>
          <MenuButton p={1}>
            <BellIcon fontSize={"2xl"} m={1} />
          </MenuButton>
          {/* <MenuList></MenuList> */}
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
            <MenuItem color={"black"} bg={"white"}>
              My Profile
            </MenuItem>
            {/* <Divider bg={'black'} /> */}
            <MenuDivider bg={"black"} />
            <MenuItem color={"black"} bg={"white"}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Box>
  );
};

export default Header;
