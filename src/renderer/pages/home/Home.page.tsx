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
        <a href="#" target="_blank" rel="noreferrer">
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a href="#" target="_blank" rel="noreferrer">
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </Box>
  );
};

export default HomePage;
