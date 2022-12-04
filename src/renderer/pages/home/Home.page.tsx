import { DeleteIcon } from '@chakra-ui/icons';
import {
    Box,
    Button, Heading,
    Input,
    ListItem,
    Text,
    UnorderedList
} from '@chakra-ui/react';
import { useState } from 'react';
import useWordlistStore from 'renderer/store/wordlist.store';
import { Word } from 'renderer/types/Word.type';

let id = 1;
const HomePage = () => {
  const [words, fetchAndAddWord, removeWord] = useWordlistStore((state: any) => [
    state.words,
    state.fetchAndAdd,
    state.removeWord,
  ]);
  const [newWord, setNewWord] = useState('');
  const handleChange = (event: any) => setNewWord(event.target.value);
  const handleEnter = (event: any) => {
    if (event.key === 'Enter') {
      if (newWord) {
        handleAddWord();
      }
    }
  };
  const handleAddWord = () => {
    fetchAndAddWord(newWord, id++);
    setNewWord('');
  };

  return (
    <Box
      h="100vh"
      w="100vw"
      p="4rem"
      display="flex"
      flexDirection={'column'}
      alignItems="center"
    >
      <Heading as="h1" size="xl" noOfLines={1} mb="4rem">
        Welcome to Nowo
      </Heading>
      <div className="Hello">
        <Heading as="h3" size="md">
          <span role="img" aria-label="books">
            📚
          </span>
          List words
        </Heading>
        <Box mt="1rem" display="flex">
          <Input
            value={newWord}
            onChange={handleChange}
            onKeyDown={handleEnter}
          ></Input>
          <Button onClick={handleAddWord} ml="1rem" disabled={!newWord}>
            Add
          </Button>
        </Box>

        <UnorderedList mt="1rem" w="80vw">
          {(words as Word[]).map((word) => (
            <ListItem>
              <Box display="flex" alignItems="center">
                <Box>
                  <Text fontSize="sm" fontWeight="bold">
                    {word.text}
                  </Text>
                  <Text fontSize="sm">
                    {word.engDefine}
                  </Text>
                </Box>
                <Button
                  size="xs"
                  colorScheme="teal"
                  variant="ghost"
                  ml="0.5"
                  onClick={() => removeWord(word.id)}
                >
                  <DeleteIcon />
                </Button>
              </Box>
            </ListItem>
          ))}
        </UnorderedList>
      </div>
    </Box>
  );
};

export default HomePage;
