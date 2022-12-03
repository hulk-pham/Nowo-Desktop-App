import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/app.css';
import HomePage from './pages/home/Home.page';
import { ChakraProvider } from '@chakra-ui/react';

export default function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
