import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import MainComponent from './components';

const App: React.FC = () => {
    return <ChakraProvider>
        <MainComponent />
    </ChakraProvider>
};

export default App;
