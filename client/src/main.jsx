import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
	brand: {
		darkblue: "#0A2240",
		midblue: "#004B98",
		lightblue: "#3DB5E6",
		grey: "#C8C8C8",
		green: "#61BF1A",
		red: "#E1261C",
	},
};

const theme = extendTheme({
	config: {
		initialColorMode: "dark",
		useSystemColorMode: false,
	},
	colors,
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<Router>
				<Auth0Provider
					domain="henhacks24.us.auth0.com"
					clientId="lmybOgHn2Xn3v37otNsIYEIcWQCUWZI8"
					authorizationParams={{
            audience: "https://henhacks24.us.auth0.com/api/v2/",
            scope: "openid profile email"
					}}
				>
					<App />
				</Auth0Provider>
			</Router>
		</ChakraProvider>
	</React.StrictMode>
);
