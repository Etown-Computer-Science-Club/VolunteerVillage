import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

const Login = ({ color }) => {
	const { loginWithRedirect } = useAuth0();

	return (
		<Button mr={5} colorScheme={color}
			onClick={() =>
				loginWithRedirect({
					appState: { returnTo: location.pathname },
					authorizationParams: {
						scope: "openid profile email",
					},
				})
			}
		>
			Login
		</Button>
	);
};

export default Login;
