/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const urlsToUseAuth0 = [
	"https://api.volunteervillage.co",
	"http://localhost:8000",
];

const useInterceptor = () => {
	const navigate = useNavigate();
	const { getAccessTokenSilently, getAccessTokenWithPopup, loginWithRedirect } = useAuth0();

	function setInterceptors() {
		axios.interceptors.request.clear();
		axios.interceptors.request.use(async (config) => {
			if (!urlsToUseAuth0.some((url) => config.url && config.url.startsWith(url)))
				return config;

			const token = await getTokenSilently();
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		});

		axios.interceptors.response.clear();
		axios.interceptors.response.use(null, async (error) => {
			const originalRequest = error.config;

			// Check if the error was a 401 and the request wasn't a retry
			if (error.response?.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;

				// Try to get a new token
				const token = await getTokenSilently();
				if (token) {
					// Update the request header
					originalRequest.headers.Authorization = `Bearer ${token}`;

					// Retry the request
					return axios(originalRequest);
				}

				// No new token, attempt to initiate a popup for login
				try {
					const response = await getAccessTokenWithPopup();

					if (response.accessToken) {
						originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
						return axios(originalRequest);
					}
				} catch (popupError) {
					console.warn("Popup failed. Falling back to redirect");

					// If popup fails, redirect for login
					loginWithRedirect({
						appState: { returnTo: location.pathname },
						authorizationParams: {
							scope: "openid profile email",
						},
					});
				}
			}

			if (error.response?.status === 403) {
				navigate("/unauthorized");
				return Promise.reject(error);
			}

			const expectedError =
				error.response && error.response.status >= 400 && error.response.status < 500;

			if (!expectedError) {
				console.error("An unexpected error occurrred.");
			}

			return Promise.reject(error);
		});
	}

	const getTokenSilently = async () => {
		try {
			return await getAccessTokenSilently();
		} catch (error) {
			console.error("Failed to get token silently", error);
			return null;
		}
	};

	return setInterceptors;
};

export default useInterceptor;
