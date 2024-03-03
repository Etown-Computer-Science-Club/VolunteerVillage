import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

const Signup = ({color,}) => {
	const { loginWithRedirect } = useAuth0();

	return (
		<Button mr={5} colorScheme={color}
			onClick={() =>
				loginWithRedirect({
					screen_hint: "signup",
					appState: { returnTo: location.pathname },
					authorizationParams: {
						scope: "openid profile email",
					},
				})
			}
		>
			Signup
		</Button>
	);
};

export default Signup;
