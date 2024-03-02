import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

const Login = () => {
	const { loginWithRedirect } = useAuth0();

	return (
		<Button
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
