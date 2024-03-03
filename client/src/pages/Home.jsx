import {Button, Flex, HStack, Image, Spacer, Text, useMediaQuery } from '@chakra-ui/react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
	const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [isLargeScreen] = useMediaQuery("(min-width: 1200px)");

  return (
    <Flex w="100%" h="100%">
      <Spacer />
      {isLargeScreen && <Image src="lefthome.png" h="80vh" style={{ opacity: 0.75 }}/>}
      <Spacer />
      <Flex direction="column" alignItems="center" w="500px" h="75%">
        <Image src="VVicon.png" h="50vh" w="50vh"/>
        <Text as="b" fontSize="3xl" textAlign="center" mt="-10">Volunteer Village</Text>
        <Text fontSize="xl" textAlign="center">
          Get assistance from community members in running your event. 
          Create an account now to get connected with the larger community.
        </Text>
        {isAuthenticated ? (
          <Button colorScheme="teal" size="lg" mt="10" onClick={() => navigate("/events")}>Sign up Now!</Button>
        ) : (
          <HStack mt="10">
            <Login color={"teal"}/>
            <Signup color={"teal"}/>
          </HStack>
        )
        }
        
        
      </Flex>
      <Spacer />
      {isLargeScreen && <Image src="righthome.png" h="80vh" style={{ opacity: 0.75 }}/>}
      <Spacer />
    </Flex>
  );
}