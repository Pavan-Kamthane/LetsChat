import React, { useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react'
import Header from '../components/Complex/Header'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'

const ChatPage = () => {
  const { user } = ChatState()
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div style={{ width: '100%' }}>
      {user && <Header />}
      <Box
        display={'flex'}
        justifyContent={'space-evenly'}
        w={'100%'}
        h={'91.5vh'}

      >
        {user && <MyChats fetchAgain={fetchAgain} />}

        {user && <ChatBox fetchAgain={fetchAgain}  setFetchAgain={setFetchAgain} />}


      </Box>
    </div>
  )
}

export default ChatPage
