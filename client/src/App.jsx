import './App.css'
import { Routes, Route} from "react-router-dom";
import { Flex, Center, Spinner } from '@chakra-ui/react';
import { useState } from 'react';

// Components
import Footer from './components/Footer';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Events from './pages/Events';
import Leaderboard from './pages/Leaderboard';
import Create from './pages/Create';
import MyEvents from './pages/MyEvents';
import useInterceptor from './shared/hooks/useInterceptor';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Profile from './components/Profile';

export default function App() {
  const [ isLoading, setIsLoading ] = useState(true);
  const { isLoading: isAuthLoading } = useAuth0();
  const setInterceptors = useInterceptor();
  
  useEffect(() => {
    if (!isAuthLoading) {
      setInterceptors();
      setIsLoading(false);
    }
  }, [isAuthLoading, setInterceptors])

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner size={"xl"}/>
      </Center>
    );
  }

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Navbar />
      <Flex flex="1" direction="column" p="10px" pb="40px">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/events" element={<Events/>} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/myevents" element={<MyEvents/>} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Flex>
      <Footer />
    </Flex>
  )
}
