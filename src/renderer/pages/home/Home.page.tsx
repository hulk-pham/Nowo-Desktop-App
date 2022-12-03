import { Box, Flex, Heading } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Box
      w="100vw"
      h="100vh"
      display="flex"
      flexDirection={'column'}
      alignItems="center"
      justifyContent="center"
    >
      <Heading as="h1" size="4xl" noOfLines={1}>
        Welcom to Nowo
      </Heading>
      <div className="Hello">
        <Heading as="h3" size="lg">
          <a href="#" target="_blank" rel="noreferrer">
            <span role="img" aria-label="books">
              📚
            </span>
            An Desktop App
          </a>
        </Heading>
      </div>
    </Box>
  );
};

export default HomePage;
