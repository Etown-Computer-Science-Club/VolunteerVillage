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
            {selectedItemIndex !== null && 
                <div style={{textAlign: 'center' }}>
                  <p style={{ fontSize: '20px'}}>Title</p>
                  <p style={{ fontSize: '24px', border: '5px outset green', borderRadius: '5px'}}>
                  {
                    postsData[selectedItemIndex].title.trim().split(' ').map((word, index, array) =>
                    (index !== array.length - 1 || !word.endsWith('.')) ? 
                    word.charAt(0).toUpperCase() + word.slice(1) : 
                    ''
                    ).join(' ')}
                  </p>
                  <p style={{ fontSize: '20px', border: '5px outset blue', borderRadius: '5px'}}>{postsData[selectedItemIndex].description}</p>
                  <p style={{ fontSize: '20px', border: '5px inset blue', borderRadius: '5px'}}>{postsData[selectedItemIndex].company.name}</p>
                  <p style={{ fontSize: '20px', border: '5px inset blue', borderRadius: '5px'}}>
                    <AtSignIcon /> {postsData[selectedItemIndex].address.zip}, {postsData[selectedItemIndex].address.street}, {postsData[selectedItemIndex].address.city}, {postsData[selectedItemIndex].address.state}
                  </p>
                  <p style={{ fontSize: '20px', border: '5px outset blue', borderRadius: '5px'}}>
                  <div>
                    <CalendarIcon />
                    <span style={{ marginRight: '5px' }}>
                      {postsData[selectedItemIndex].eventDateStart.split('T')[0]}
                    </span>
                    <br />
                    <TimeIcon />
                    <span>
                      {postsData[selectedItemIndex].eventDateStart.split('T')[1]}
                    </span>
                  </div>
                  <ChevronDownIcon /><ChevronDownIcon /><ChevronDownIcon />{/* Add a line break between start and end dates */}
                  <div> {/* Wrap the end date and time with a div */}
                    <CalendarIcon />
                    <span style={{ marginRight: '5px' }}>
                      {postsData[selectedItemIndex].eventDateEnd.split('T')[0]}
                    </span>
                    <br />
                    <TimeIcon />
                    <span>
                      {postsData[selectedItemIndex].eventDateEnd.split('T')[1]}
                    </span>
                  </div>
                </p>
                </div>
            }
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