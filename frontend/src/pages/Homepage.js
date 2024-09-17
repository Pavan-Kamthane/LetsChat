import React, { useEffect } from 'react'
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { useHistory } from 'react-router-dom'

const Homepage = () => {

  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        d='flex'
        justifyContent='center'
        p={3}
        bg={"white"}
        w={"100%"}
        m={"40px 0 15px 0"}
        borderRadius={"lg"}
        borderWidth={"1px"}
        textAlign={"center"}
      >
        <Text
          fontSize={"4xl"}
          color={"black"}
          fontFamily={"Work sans"}
        >
          LetsChat
        </Text>
      </Box>

      {/* login and signup box */}
      <Box
        bg={"white"}
        w={"100%"}
        p={4}
        borderRadius={"lg"} // lg means  large
        borderWidth={"1px"}
        color={"black"}
      >
        <Tabs variant='soft-rounded'
          colorScheme='yellow'
        >
          <TabList
            mb={'1em'} // mb means  margin bottom

          >
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Homepage
