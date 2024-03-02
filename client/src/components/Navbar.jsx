import { Link, Flex, Text, Spacer, Image, Avatar } from "@chakra-ui/react";
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
			{isAuthenticated && <Logout />}
			{isAuthenticated && (
				<Flex gap={2}>
					<Avatar size="sm" src={user.picture} name={user.name} />
					<p>{user.name}</p>
					<p>{user.email}</p>
				</Flex>
			)}
		</Flex>
	);
}
