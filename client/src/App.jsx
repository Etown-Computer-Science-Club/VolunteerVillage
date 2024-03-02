import './App.css'
import { Routes, Route} from "react-router-dom";
import { Flex } from '@chakra-ui/react';

// Components
import Footer from './components/Footer';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Events from './pages/Events';
import Leaderboard from './pages/Leaderboard';
import Create from './pages/Create';

export default function App() {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Navbar />
      <Flex flex="1" direction="column" p="10px" pb="40px">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/events" element={<Events/>} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
          <Route path="/create" element={<Create/>} />
        </Routes>
      </Flex>
      <Footer />
    </Flex>
  )
}
