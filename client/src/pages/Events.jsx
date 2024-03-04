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
	Spinner,
	Box,
	Text,
	Divider,
	Tooltip,
	useToast,
	Select,
	Input,
	Flex,
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

const DTFORMAT = "MMMM do h:mm a";
const DATEFORMAT = "MMM do";
const TIMEFORMAT = "h:mm a";

export default function Events() {
	const { isAuthenticated } = useAuth0();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedItem, setSelectedItem] = useState(null);
	const [postsData, setPostsData] = useState([]);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [isConfettiActive, setIsConfettiActive] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [width, height] = useWindowSize();

	// Add state variables for the sort option and postal code input
	const [sortOption, setSortOption] = useState("date");
	const [postalCodeInput, setPostalCodeInput] = useState("");

	// Add a function to handle the change of the sort option
	const handleSortOptionChange = (e) => {
		setSortOption(e.target.value);
	};

	// Add a function to handle the change of the postal code input
	const handlePostalCodeInputChange = (e) => {
		setPostalCodeInput(e.target.value);
	};

	useEffect(() => {
		const fetchPosts = async () => {
			setIsFetching(true);
			try {
				const data = await PostService.getEvents();
				setPostsData(data);
			} catch (error) {
				toast({
					title: "Error",
					description: "Failed to fetch events.",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			} finally {
				setIsFetching(false);
			}
		};

		fetchPosts();
	}, []);

	const handleItemClick = (item) => {
		setSelectedItem(item);
		onOpen();
	};

	const handleSignUp = async () => {
		setButtonLoading(true);
		try {
			await VolunteerService.addVolunteer(selectedItem.id);
			setIsConfettiActive(true);
			toast({
				title: "Success",
				description: "Signed up for a new event!",
				status: "info",
				duration: 3000,
				isClosable: true,
			});
			setTimeout(() => {
				setIsConfettiActive(false);
			}, 3000);
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to sign up, you might already be signed up.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		} finally {
			setButtonLoading(false);
		}
	};

	const filterEvents = () => {
		let filtered = [...postsData];

		if (postalCodeInput) {
			filtered = filtered.filter((event) => event.address.zip === postalCodeInput);
		}

		switch (sortOption) {
			case "date":
				filtered.sort((a, b) =>
					compareAsc(new Date(a.eventDateStart), new Date(b.eventDateStart))
				);
				break;
			case "postalCode":
				filtered.sort((a, b) => a.address.zip.localeCompare(b.address.zip));
				break;
			default:
				break;
		}

		return filtered;
	};

	if (isFetching) {
		return (
			<Center height="100vh">
				<Box>
					<Text fontSize="3xl" mb="20px">
						Fetching data...
					</Text>
					<Center>
						<Spinner size={"xl"} />
					</Center>
				</Box>
			</Center>
		);
	} else {
		return (
			<Box>
				<Center mb="20px">
					<Flex w="75vw">
						<Select w="25vw" value={sortOption} onChange={handleSortOptionChange}>
							<option value="date">Sort by Date</option>
							<option value="postalCode">Sort by Postal Code</option>
						</Select>
						<Input
							value={postalCodeInput}
							onChange={handlePostalCodeInputChange}
							placeholder="Enter Postal Code"
						/>
					</Flex>
				</Center>
				<Center>
					<TableContainer>
						<Table variant="simple" colorScheme="teal">
							<Thead bg="blue.900">
								<Tr>
									<Th textAlign="center">Host</Th>
									<Th textAlign="center">Start Date</Th>
									<Th textAlign="center">End Date</Th>
									<Th textAlign="center">Title</Th>
									<Th textAlign="center">City</Th>
									<Th textAlign="center">State</Th>
								</Tr>
							</Thead>

							<Tbody>
								{filterEvents().map((event, index) => {
									if (
										new Date(event.eventDateEnd).getTime() < new Date().getTime()
									) {
										return null;
									}
									return (
										<Tr
											key={index}
											onClick={() => handleItemClick(event)}
											_hover={{ backgroundColor: "blue.600" }}
											bg="gray.900"
										>
											<Td textAlign="center">{event.company.name}</Td>
											<Td textAlign="center">
												{format(new Date(event.eventDateStart), DTFORMAT)}
											</Td>
											<Td textAlign="center">
												{format(new Date(event.eventDateEnd), DTFORMAT)}
											</Td>
											<Td textAlign="center">{event.title}</Td>
											<Td textAlign="center">{event.address.city}</Td>
											<Td textAlign="center">{event.address.state}</Td>
										</Tr>
									);
								})}
							</Tbody>
						</Table>
					</TableContainer>
					{selectedItem != null && (
						<Modal isOpen={isOpen} onClose={onClose} size="3xl">
							<ModalOverlay />
							<ModalContent>
								<ModalHeader style={{ textAlign: "center", fontSize: "24px" }}>
									<Text fontSize="2xl">{selectedItem.title}</Text>
									<Text fontSize="md">
										By: {selectedItem.company?.name}
									</Text>
								</ModalHeader>
								<ModalCloseButton />
								<ModalBody style={{ textAlign: "center" }}>
									<Box style={{ textAlign: "center" }}>
										<Text style={{ fontSize: "20px" }}>
											{selectedItem.description}
										</Text>
										<Divider orientation="horizontal" mt={2.5} />
										<Box
											style={{
												display: "flex",
												justifyContent: "space-between",
											}}
										>
											<Box style={{ width: "50%", fontSize: "20px" }}>
												<Text style={{ fontSize: "21px" }}>
													<Icon as={MdLocationOn} />{" "}
													{selectedItem.address.street},{" "}
													{selectedItem.address.city},{" "}
													{selectedItem.address.state},{" "}
													{selectedItem.address.zip}
												</Text>
											</Box>
											<Divider
												orientation="vertical"
												h="100px"
												mr="2"
												ml="2"
											/>
											<Box style={{ width: "50%", fontSize: "21px" }}>
												<Box
													style={{
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
													}}
												>
													<CalendarIcon style={{ marginRight: "10px" }} />
													<Text>
														{format(
															new Date(
																selectedItem.eventDateStart
															),
															DATEFORMAT
														)}
													</Text>

													<TimeIcon
														style={{
															marginLeft: "10px",
															marginRight: "10px",
														}}
													/>
													<Text>
														{format(
															new Date(
																selectedItem.eventDateStart
															),
															TIMEFORMAT
														)}
													</Text>
												</Box>
												<Text>to</Text>
												<Box
													style={{
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
													}}
												>
													<CalendarIcon style={{ marginRight: "10px" }} />
													<Text>
														{format(
															new Date(
																selectedItem.eventDateEnd
															),
															DATEFORMAT
														)}
													</Text>
													<TimeIcon
														style={{
															marginLeft: "10px",
															marginRight: "10px",
														}}
													/>
													<Text>
														{format(
															new Date(
																selectedItem.eventDateEnd
															),
															TIMEFORMAT
														)}
													</Text>
												</Box>
											</Box>
										</Box>
									</Box>
								</ModalBody>
								<ModalFooter>
									<Button colorScheme="gray" mr={3} onClick={onClose}>
										Close
									</Button>
									<Tooltip
										textAlign="center"
										label="You cannot sign up for an event without signing in first"
										isDisabled={isAuthenticated}
									>
										{selectedItem !== null &&
										!selectedItem.userIsVolunteer ? (
											<Button
												colorScheme="blue"
												isLoading={buttonLoading}
												isDisabled={!isAuthenticated}
												onClick={handleSignUp}
											>
												Sign Up
											</Button>
										) : (
											<></>
										)}
									</Tooltip>
								</ModalFooter>
							</ModalContent>
						</Modal>
					)}
					{isConfettiActive && <Confetti recycle={false} width={width} height={height} />}
				</Center>
			</Box>
		);
	}
}
