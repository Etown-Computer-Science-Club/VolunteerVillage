import { Link, Flex, Text, Spacer, Image, Avatar, Menu, MenuButton, MenuList, Button, Center, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Logout from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";

export default function Navbar() {
	const { user, isAuthenticated } = useAuth0();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex p="10px" alignItems="center" bg="gray.700" fontSize="20px">
			<Image src="VVicon.png" height="50px" mr={5} />
			<Text as="b">Volunteer Village</Text>
			<Spacer />
			<Link as={RouterLink} to={"/"} mr={5}>
				Home
			</Link>
			<Link as={RouterLink} to={"/leaderboard"} mr={5}>
				Leaderboard
			</Link>
			{!isAuthenticated && (
			<Link as={RouterLink} to={"/events"} mr={5}>
				Events
			</Link>
			)}
			{isAuthenticated && (
				<Menu >
					<MenuButton fontSize="20px" mr={5} as={Button} variant='link' rightIcon={<ChevronDownIcon />}>
						Events
					</MenuButton>
					<MenuList>
						<VStack fontSize="15px">
						<Link as={RouterLink} to={"/events"} >
							All Events
						</Link>
						<Link as={RouterLink} to={"/myevents"}>
							My Events
						</Link>
						<Link as={RouterLink} to={"/create"} >
							Add Event
						</Link>
						</VStack>
					</MenuList>
				</Menu>
			)}
			
			
			{!isAuthenticated && <Login />}
			{!isAuthenticated && <Signup />}
			{isAuthenticated && (

				
				<Menu>
					<MenuButton as={Button} variant='ghost' rightIcon={<ChevronDownIcon />}>
						<Avatar size="sm" src={user.picture} name={user.name} />
					</MenuButton>
					<MenuList>
            <Flex direction="column" gap={2}>
              <Center>
			  <Button onClick={onOpen}>
				<Avatar size="sm" src={user.picture} name={user.name} />
				</Button>
				<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>User Details</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
					<Profile />
					</ModalBody>
				</ModalContent>
				</Modal>
              </Center>
              <Text fontSize="15px" textAlign="center"> {user.email}</Text>
              <Center pt="5px">
                  <Logout />
              </Center>
            </Flex>
					</MenuList>
				</Menu>
			)}
		</Flex>
	);
}
