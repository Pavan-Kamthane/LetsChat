import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react'

const ChatBox = () => {
  const {seletedChat}=ChatState()
  return (
    <Box
      display={{
        base: seletedChat? 'flex':'none',
        md: 'flex',
      }}

      w={{
        base: '100%',
        md: '65%',
      }}

      alignItems={'center'}
      flexDir={'column'}
      p={3}
      bg={'white'}
      borderRadius={'lg'}
      borderWidth={'1px'} 
      m={2}
    >
      Single Chat
    </Box>
  )
}

export default ChatBox
