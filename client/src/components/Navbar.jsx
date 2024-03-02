import { Link, Flex, Text, Spacer, Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <Flex p="10px" alignItems="center" bg="gray.700" fontSize="20px">
      <Image src="VVicon.png" height="50px" mr={5}/>
      <Text as='b'>Volunteer Village</Text>
      <Spacer />
      <Link as={RouterLink} to={"/"} mr={5}>
        Home
      </Link>
      <Link as={RouterLink} to={"/events"} mr={5}>
        Events
      </Link>
      <Link as={RouterLink} to={"/leaderboard"} mr={5}>
        Leaderboard
      </Link>
    </Flex>
  )
}