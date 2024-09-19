import { Avatar, Button, Image, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <Avatar
          display={"flex"}
          onClick={onOpen}
          cursor={"pointer"}
          size={"sm"}
          m={1}
        />
      )}

      <Modal size={'lg'} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h={'410px'}>
          <ModalHeader
            display={"flex"}
            justifyContent={"center"}
            fontSize={"3xl"}
            fontFamily={"Works sans"}
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody 
            display={'flex'}
            flexDir={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={'10px'}
          >
            {user.pic ? (
              <Image
                src={user.pic}
                alt={user.name}
                borderRadius={"full"}
                boxSize={"150px"}
              />
            ) : (
              <Avatar borderRadius={"full"} boxSize={"150px"} />
            )}
            <Text fontSize={"xl"}>Email: {user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
