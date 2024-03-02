import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    darkblue: '#0A2240',
    midblue: '#004B98',
    lightblue: '#3DB5E6',
    grey: '#C8C8C8',
    green: '#61BF1A',
    red: '#E1261C',
  },
  colors,
}

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
)
