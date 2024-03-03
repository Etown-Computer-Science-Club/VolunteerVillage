import { useState, useEffect } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, TableContainer,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure,
  Button,
  Center
} from '@chakra-ui/react';
import { useAuth0 } from "@auth0/auth0-react";
import PostService from '../services/postService';
import VolunteerService from '../services/volunteerService';

export default function Events() {
  const { user, isAuthenticated } = useAuth0();

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await PostService.getEvents();
      setPostsData(data);
    };

    fetchPosts();
  }, []);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
    onOpen();
  }
  
  const handleSignUp = async() => {
    await VolunteerService.addVolunteer(postsData[selectedItemIndex].id);
  }

  return (
    <Center>
        <TableContainer >
        <Table variant='simple' colorScheme='teal'>
          <Thead bg="blue.900">
            <Tr>
              <Th textAlign="center">Company</Th>
              <Th textAlign="center">Start Date</Th>
              <Th textAlign="center">End Date</Th>
              <Th textAlign="center">Title</Th>
              <Th textAlign="center">City</Th>
              <Th textAlign="center">State</Th>
            </Tr>
          </Thead>

          <Tbody>
          {postsData.map((user, index) => (
              <Tr key={index} onClick={() => handleItemClick(index)} _hover={{ backgroundColor: 'blue.600' }} bg="gray.900">
                <Td textAlign="center">{user.company.name}</Td>
                <Td textAlign="center">{user.eventDateStart}</Td>
                <Td textAlign="center">{user.eventDateEnd}</Td>
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
            {(isAuthenticated && selectedItemIndex !== null && !postsData[selectedItemIndex].userIsVolunteer)&& <Button colorScheme='green' onClick={handleSignUp}>Sign Up</Button>}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  )
}