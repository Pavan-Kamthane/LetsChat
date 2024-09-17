import { Box, Button, Tooltip } from '@chakra-ui/react';
import { SearchIcon } from "@chakra-ui/icons";
import React, { useState } from 'react'


const Header = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
  return (
    <Box>
      <Tooltip label="Search user to chat" hasArrow placement="bottom">
        <Button 
            variant={'ghost'}
            // color={'black'}
        >
          <SearchIcon /> 
        </Button>
      </Tooltip>
    </Box>
  );
}

export default Header
