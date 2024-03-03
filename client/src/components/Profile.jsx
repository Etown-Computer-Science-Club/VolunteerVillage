import { useEffect, useState } from "react";
import { VStack, FormControl, FormLabel, Input, Button, useToast, Box, Center } from "@chakra-ui/react";
import ProfileService from "../services/profileService";

const Profile = () => {
	const [name, setName] = useState("");
	const [profilePicture, setProfilePicture] = useState(null);
	const toast = useToast();

	useEffect(() => {
		async function getProfileData() {
			const result = await ProfileService.getProfile();
			setName(result.name);
			setProfilePicture(result.profilePicture);
		}

		getProfileData();
	}, []);

	const handleNameChange = (e) => setName(e.target.value);

	const handleProfilePictureChange = (e) => setProfilePicture(e.target.files[0]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		await ProfileService.updateProfile(name, profilePicture);

		toast({
			title: "Profile updated.",
			description: "We've updated your profile details.",
			status: "success",
			duration: 5000,
			isClosable: true,
		});
	};

	return (
		<VStack as="form" onSubmit={handleSubmit} spacing={4} align="flex-start">
			<Center>
				<Box w="100%">
					<FormControl>
						<FormLabel htmlFor="name">Name</FormLabel>
						<Input id="name" type="text" value={name} onChange={handleNameChange} />
					</FormControl>

					<FormControl>
						<FormLabel htmlFor="profile-picture">Profile Picture</FormLabel>
						<Input
							id="profile-picture"
							type="file"
							onChange={handleProfilePictureChange}
							accept="image/*"
						/>
					</FormControl>

					<Button colorScheme="blue" onClick={handleSubmit}>
						Update Profile
					</Button>
				</Box>
			</Center>
		</VStack>
	);
};

export default Profile;
