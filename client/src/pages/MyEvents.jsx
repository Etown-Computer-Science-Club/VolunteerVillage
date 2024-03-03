import { useState, useEffect } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, TableContainer,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure,
  Button,
  Center,
  Tooltip,
  useToast
} from '@chakra-ui/react';
import PostService from '../services/postService';
import VolunteerService from '../services/volunteerService';

export default function MyEvents() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const toast = useToast();
  const [attendees, setAttendees] = useState([]);
  const [postsData, setPostsData] = useState([]);

  const handleClose = () => {
    setAttendees([]);
    onClose(); 
  }
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await PostService.getMyEvents();
        setPostsData(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch events.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
  
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchAttendees = async () => {
      if (selectedItemIndex == null) {
        return;
      }
      try {
        const data = await VolunteerService.getAttendees(postsData[selectedItemIndex].id);
        setAttendees(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch attendees.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
  
    fetchAttendees();
  }, [selectedItemIndex]);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
    onOpen();
  }

  const handleDelete = async() => {
    try{
      await PostService.deleteEvent(postsData[selectedItemIndex].id);
      handleClose();
      const data = await PostService.getMyEvents();
      setPostsData(data);
    } catch (error){
      toast({
        title: "Error",
        description: "Failed to delete event.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
    toast({
      title: "Error",
      description: "Failed to confirm attendee.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
}
const handleDeleteAttendee = async(index) => {
  try {
    await VolunteerService.deleteAttendee(postsData[selectedItemIndex].id, attendees[index].userId);
    setAttendees(prevAttendees => {
      return prevAttendees.filter((attendee, i) => i !== index);
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to delete attendee.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
}

  return (
    <Center>
        <TableContainer >
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
      <Modal isOpen={isOpen} onClose={handleClose} size="3xl">
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
                    <Tr key={index} _hover={{ backgroundColor: 'blue.600' }} bg="gray.900">
                      <Td textAlign="center">{user.name}</Td>
                      <Td textAlign="center"><Button colorScheme="blue" onClick={() => handleConfirm(index)}>Confirm</Button></Td>
                      <Td textAlign="center"><Button colorScheme='red' onClick={() => handleDeleteAttendee(index)}>Delete</Button></Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
            
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={handleClose}>
              Close
            </Button>

            <Tooltip textAlign="center" label="You cannot delete an event with confirmed attendees" isDisabled={!attendees.some(attendee => attendee.isConfirmed)}>
              <Button colorScheme='red' onClick={handleDelete} isDisabled={attendees.some(attendee => attendee.isConfirmed)}>
                Delete Event
              </Button>
            </Tooltip>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  )
}