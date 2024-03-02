import { Box, Table, Text, Thead, Tbody, Tr, Th, Td, Center } from "@chakra-ui/react";
import leaderboardData from '../leaderboard.json';

export default function Leaderboard() {
  return (
    <Box p="20px">
      <Center>
        <Text as="b" fontSize="3xl" textAlign="center" mb="20px" >Leaderboard</Text>
      </Center>
      <Center>
        <Table w="50vw" variant="simple" mx="auto">
          <Thead>
            <Tr>
              <Th textAlign="center">User ID</Th>
              <Th textAlign="center">Volunteer Count</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaderboardData.map((user, index) => (
              <Tr key={index}>
                <Td textAlign="center">{user.userId}</Td>
                <Td textAlign="center">{user.volunteerCount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Center>
    </Box>
  );
}