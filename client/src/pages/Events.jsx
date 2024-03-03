import { useState, useEffect } from "react";
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	Center,
	Box,
	Text,
	Divider,
	Tooltip,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import PostService from "../services/postService";
import VolunteerService from "../services/volunteerService";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import { format, compareAsc } from "date-fns";

const DTFORMAT="MMMM do h:m a"
const DATEFORMAT="MMM do"
const TIMEFORMAT="h:m a"

export default function Events() {
	const { user, isAuthenticated } = useAuth0();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedItemIndex, setSelectedItemIndex] = useState(null);
	const [postsData, setPostsData] = useState([]);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [isConfettiActive, setIsConfettiActive] = useState(false);
	const [width, height] = useWindowSize();

	useEffect(() => {
		const fetchPosts = async () => {
			const data = await PostService.getEvents();
			setPostsData(data);
		};

		fetchPosts();
	}, []);

	const handleItemClick = (index) => {
		setSelectedItemIndex(index);
		onOpen();
	};

	const handleSignUp = async () => {
		setButtonLoading(true);
		try {
			await VolunteerService.addVolunteer(postsData[selectedItemIndex].id);
			setIsConfettiActive(true);
			setTimeout(() => {
				setIsConfettiActive(false);
			}, 3000);
		} catch (error) {
			console.error(error);
		} finally {
      setButtonLoading(false);
    }
	};

	return (
		<Center>
			<TableContainer>
				<Table variant="simple" colorScheme="teal">
					<Thead bg="blue.900">
						<Tr>
							<Th textAlign="center">Company</Th>
							<Th textAlign="center">Start Date</Th>
							<Th textAlign="center">End Date</Th>
							<Th textAlign="center">Title</Th>
							<Th textAlign="center">City</Th>
							<Th textAlign="center">State</Th>
						</Tr>
					</Thead>

					<Tbody>
						{postsData.map((user, index) => {
							if (new Date(user.eventDateEnd).getTime() < new Date().getTime()) {
								return null;
							}
							return (
								<Tr
									key={index}
									onClick={() => handleItemClick(index)}
									_hover={{ backgroundColor: "blue.600" }}
									bg="gray.900"
								>
									<Td textAlign="center">{user.company.name}</Td>
									<Td textAlign="center">{format(new Date(user.eventDateStart), DTFORMAT)}</Td>
									<Td textAlign="center">{format(new Date(user.eventDateEnd), DTFORMAT)}</Td>
									<Td textAlign="center">{user.title}</Td>
									<Td textAlign="center">{user.address.city}</Td>
									<Td textAlign="center">{user.address.state}</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</TableContainer>
			{selectedItemIndex != null && (
				<Modal isOpen={isOpen} onClose={onClose} size="3xl">
					<ModalOverlay />
					<ModalContent>
						<ModalHeader style={{ textAlign: "center", fontSize: "24px" }}>
							<Text fontSize="2xl">{postsData[selectedItemIndex].title}</Text>
							<Text fontSize="md">By: {postsData[selectedItemIndex].company?.name}</Text>
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody style={{ textAlign: "center" }}>
							<Box style={{ textAlign: "center" }}>
								<Text style={{ fontSize: "20px" }}>
									{postsData[selectedItemIndex].description}
								</Text>
								<Divider orientation="horizontal" mt={2.5} />
								<Box style={{ display: "flex", justifyContent: "space-between" }}>
									<Box style={{ width: "50%", fontSize: "20px" }}>
										<Text style={{ fontSize: "21px" }}>
											<Icon as={MdLocationOn} />{" "}
											{postsData[selectedItemIndex].address.street},{" "}
											{postsData[selectedItemIndex].address.city},{" "}
											{postsData[selectedItemIndex].address.state},{" "}
                      {postsData[selectedItemIndex].address.zip}
										</Text>
									</Box>
									<Divider orientation="vertical" h="100px" mr="2" ml="2" />
									<Box style={{ width: "50%", fontSize: "21px" }}>
										<Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
											<CalendarIcon style={{ marginRight: "10px" }} />
											<Text>
                        {
                          format(new Date(postsData[selectedItemIndex].eventDateStart), DATEFORMAT)
                        }
											</Text>

											<TimeIcon
												style={{
													marginLeft: "10px",
													marginRight: "10px",
												}}
											/>
											<Text>
                        {
                          format(new Date(postsData[selectedItemIndex].eventDateStart), TIMEFORMAT)
                        }
											</Text>
										</Box>
										<Text>to</Text>
										<Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
											<CalendarIcon style={{ marginRight: "10px" }} />
											<Text>
                        {
                          format(new Date(postsData[selectedItemIndex].eventDateEnd), DATEFORMAT)
                        }
											</Text>
											<TimeIcon
												style={{
													marginLeft: "10px",
													marginRight: "10px",
												}}
											/>
											<Text>
                        {
                          format(new Date(postsData[selectedItemIndex].eventDateEnd), TIMEFORMAT)
                        }
											</Text>
										</Box>
									</Box>
								</Box>
							</Box>
						</ModalBody>
						<ModalFooter>
							<Button colorScheme="blue" mr={3} onClick={onClose}>
								Close
							</Button>
							<Tooltip
								textAlign="center"
								label="You cannot sign up for an event without signing in first"
								isDisabled={isAuthenticated}
							>
								{selectedItemIndex !== null &&
									!postsData[selectedItemIndex].userIsVolunteer && (
										<Button
											colorScheme="green"
											isLoading={buttonLoading}
											isDisabled={!isAuthenticated}
											onClick={handleSignUp}
										>
											Sign Up
										</Button>
									)}
							</Tooltip>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)}
			{isConfettiActive && <Confetti recycle={false} width={width} height={height} />}
		</Center>
	);
}
