import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import { Box, useDisclosure, Button, Center } from '@chakra-ui/react';
import postsData from '../posts.json';

export default function Events() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
    onOpen();
  }

  return (
    <Center>
        <TableContainer w="50vw">
        <Table variant='simple' colorScheme='teal'>
          <Thead>
            <Tr>
              <Th textAlign="center">Company</Th>
              <Th textAlign="center">Event Date</Th>
              <Th textAlign="center">Event Title</Th>
              <Th textAlign="center">City</Th>
              <Th textAlign="center">State</Th>
            </Tr>
          </Thead>

          <Tbody>
          {postsData.map((user, index) => (
              <Tr key={index} onClick={() => handleItemClick(index)} _hover={{ backgroundColor: 'blue.600' }}>
                <Td textAlign="center">{user.company.name}</Td>
                <Td textAlign="center">{user.eventDate}</Td>
                <Td textAlign="center">{user.title}</Td>
                <Td textAlign="center">{user.address.city}</Td>
                <Td textAlign="center">{user.address.state}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Event Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedItemIndex !== null && postsData[selectedItemIndex].description}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Sign Up</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  )
}