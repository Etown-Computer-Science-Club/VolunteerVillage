import { Link, Flex, Text, Spacer, Image, Avatar, Menu, MenuButton, MenuList, MenuItem, Button, Center, ButtonGroup } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Logout from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
	const { user, isAuthenticated } = useAuth0();

	return (
		<Flex p="10px" alignItems="center" bg="gray.700" fontSize="20px">
			<Image src="VVicon.png" height="50px" mr={5} />
			<Text as="b">Volunteer Village</Text>
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
			{!isAuthenticated && <Login />}
			{!isAuthenticated && <Signup />}
			{isAuthenticated && (

				
				<Menu>
					<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
						<Avatar size="sm" src={user.picture} name={user.name} />
					</MenuButton>
					<MenuList>
						<Center>
							<Avatar size="lg" src={user.picture} name={user.name} />
						</Center>
						<Text fontSize="15px" textAlign="center"> {user.name}</Text>
						<Text fontSize="15px" textAlign="center"> {user.email}</Text>
						<Center pt="5px">
							<ButtonGroup>
								<Button as={RouterLink} to={"/myevents"}>My Events</Button>
								<Logout />
							</ButtonGroup>
						</Center>
					</MenuList>
				</Menu>
			)}
		</Flex>
	);
}
