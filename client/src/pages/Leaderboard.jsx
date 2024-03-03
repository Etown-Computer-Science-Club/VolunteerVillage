import { useState, useEffect } from "react";
import { Box, Table, Text, Thead, Tbody, Tr, Th, Td, Center } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import LeaderboardService from '../services/leaderboardService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await LeaderboardService.getTop10();
      setLeaderboardData(data);
    };

    fetchLeaderboard();
  }, []);

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Top Volunteers',
      },
    },
    
  };
  const data = {
    labels: leaderboardData.map(user => user.name),
    datasets: [
      {
        label: 'Volunteer Count',
        data: leaderboardData.map(user => user.volunteerCount),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };
  return (
    <Box p="20px">
      <Center>
        <Text as="b" fontSize="3xl" textAlign="center" mb="20px" >Leaderboard</Text>
      </Center>
      <Center>
        <Box w="50vw" h="50vh">
          <Bar options={options} data={data}  />
        </Box>
      </Center>
      
      <Center>
        <Table w="50vw" variant="simple" mx="auto">
          <Thead>
            <Tr>
              <Th textAlign="center">Name</Th>
              <Th textAlign="center">Volunteer Count</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaderboardData.map((user, index) => (
              <Tr key={index}>
                <Td textAlign="center">{user.name}</Td>
                <Td textAlign="center">{user.volunteerCount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Center>
    </Box>
  );
}