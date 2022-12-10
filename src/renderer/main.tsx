import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import useGlobalToast from './hooks/useGlobalToast.hook';
import HomePage from './pages/home/Home.page';
import './styles/app.css';

export default function App() {
  useGlobalToast()
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
