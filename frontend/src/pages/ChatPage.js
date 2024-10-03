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
    // <div style={{ width: '100%' }}>
    //   {user && <Header />}
    //   <Box
    //     display={'flex'}
    //     justifyContent={'space-evenly'}
    //     w={'100%'}
    //     h={'91.5vh'}

    //   >
    //     {user && <MyChats fetchAgain={fetchAgain} />}

    //     {user && <ChatBox fetchAgain={fetchAgain}  setFetchAgain={setFetchAgain} />}


    //   </Box>
    // </div>
    <>
      {
        user ? (
          <div style={{ width: '100%' }}>
            <Header />
            <Box
              display={'flex'}
              justifyContent={'space-evenly'}
              w={'100%'}
              h={'91.5vh'}
            >
              <MyChats fetchAgain={fetchAgain} />
              <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            </Box>
          </div>
        ) : (
          <div style={{ width: '100%', height: '91.5vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h1>Please Login to Continue</h1>
          </div>
        )


      }
    </>
  )
}

export default ChatPage
