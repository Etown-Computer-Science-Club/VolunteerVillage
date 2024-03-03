import { useState, useEffect } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, TableContainer,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure,
  Button,
  Center
} from '@chakra-ui/react';
import PostService from '../services/postService';
import VolunteerService from '../services/volunteerService';

export default function MyEvents() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const [attendees, setAttendees] = useState([]);
  const [postsData, setPostsData] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const data = await PostService.getEvents();
      setPostsData(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchAttendees = async () => {
      if (selectedItemIndex === null) {
        return;
      }
      const data = await VolunteerService.getAttendees(postsData[selectedItemIndex].id);
      setAttendees(data);
    };
    fetchAttendees();
  }, [selectedItemIndex]);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
    onOpen();
  }

  const handleDelete = () => {
    console.log('Deleting event');
  }
  const handleConfirm = async(index) => {
    try {
      await VolunteerService.confirmAttendee(postsData[selectedItemIndex].id, attendees[index].userId);
      setAttendees(prevAttendees => {
        const newAttendees = [...prevAttendees];
        newAttendees.splice(index, 1);
        return newAttendees;
      });
    } catch (error) {
      console.error('Failed to confirm attendee:', error);
    }
  }
  const handleDeleteAttendee = (index) => {
    console.log('Deleting attendee');
  }

  return (
    <Center>
        <TableContainer w="75vw">
        <Table variant='simple' colorScheme='teal'>
          <Thead bg="blue.900">
            <Tr>
              <Th textAlign="center">End Date</Th>
              <Th textAlign="center">Title</Th>
              <Th textAlign="center">City</Th>
              <Th textAlign="center">State</Th>
            </Tr>
          </Thead>

          <Tbody>
          {postsData.map((user, index) => (
              <Tr key={index} onClick={() => handleItemClick(index)} _hover={{ backgroundColor: 'blue.600' }} bg="gray.900">
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
        <ModalContent  >
          <ModalHeader>Attendees</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <TableContainer>
            <Table variant='simple' colorScheme='teal'>
              <Thead bg="blue.900">
                <Tr>
                  <Th textAlign="center">Name</Th>
                  <Th textAlign="center">Confirm</Th>
                  <Th textAlign="center">Delete</Th>
                </Tr>
              </Thead>

              <Tbody>
                {attendees.map((user, index) => {
                  if(user.isConfirmed) {
                    return null;
                  }
                  return (
                    <Tr key={index} onClick={() => handleItemClick(index)} _hover={{ backgroundColor: 'blue.600' }} bg="gray.900">
                      <Td textAlign="center">{user.name}</Td>
                      <Td textAlign="center"><Button colorScheme="green" onClick={() => handleConfirm(index)}>Confirm</Button></Td>
                      <Td textAlign="center"><Button colorScheme='red' onClick={() => handleDeleteAttendee(index)}>Delete</Button></Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
            
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='red' onClick={handleDelete}>Delete Event</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  )
}