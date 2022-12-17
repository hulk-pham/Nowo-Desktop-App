import { DeleteIcon, Icon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  Input,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiCamera, FiVolume2 } from 'react-icons/fi';
import List from 'renderer/components/libs/List.comp';
import useWordlistStore from 'renderer/store/wordlist.store';
import { Word } from 'renderer/types/Word.type';

let id = 1;
const HomePage = () => {
  const [words, fetchAndAddWord, removeWord] = useWordlistStore((state) => [
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

  const onSnipClick = async () => {
    // const { desktopCapturer }: any = window.require('electron');
    const { ipcRenderer, shell } = window.require('electron');
    const { screen, getCurrentWindow } = window.require('@electron/remote');

    console.log('screen', screen);

    const desktopCapturer = {
      getSources: (opts: any) =>
        ipcRenderer.invoke('DESKTOP_CAPTURER_GET_SOURCES', opts),
    };

    const path = window.require('path');
    const os = window.require('os');
    const fs = window.require('fs');
    const win = getCurrentWindow();
    const windowRect = win.getBounds();

    win.hide();

    const screenSize = screen.getPrimaryDisplay().workAreaSize;
    const maxDimension = Math.max(screenSize.width, screenSize.height);

    // const screenSize = screen.getPrimaryDisplay().workAreaSize;

    // const maxDimension = Math.max(screenSize.width, screenSize.height);

    try {
      const sources = await desktopCapturer.getSources({
        types: ['screen'],
        thumbnailSize: {
          width: maxDimension * window.devicePixelRatio,
          height: maxDimension * window.devicePixelRatio,
        },
      });
      const entireScreenSource = sources.find(
        (source: any) => source.name === 'Entire screen'
      );

      if (entireScreenSource) {
        const outputPath = path.join(os.tmpdir(), 'screenshot.png');
        const image = entireScreenSource.thumbnail
          .resize({
            width: screenSize.width,
            height: screenSize.height,
          })
          .crop(windowRect)
          .toPNG();

        fs.writeFile(outputPath, image, (err: any) => {
          win.show();

          if (err) return console.error(err);
          shell.openExternal(`file://${outputPath}`);
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddWord = () => {
    fetchAndAddWord(newWord, id++);
    setNewWord('');
  };

  const playAudio = (word: Word) => {
    if (word.audio) {
      var audio = new Audio(word.audio);
      audio.play();
    }
  };

  return (
    <Box
      h="100vh"
      w="100vw"
      p="4rem"
      display="flex"
      flexDirection={'column'}
      alignItems="center"
      bg="white"
    >
      <Heading as="h1" size="xl" noOfLines={1} mb="4rem" bgColor={'white'}>
        Welcome to Nowo
      </Heading>
      <div className="Home">
        <Heading
          as="h3"
          size="md"
          display="flex"
          justifyContent="space-between"
        >
          <span role="img" aria-label="books">
            📚 List words
          </span>
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
          <List
            data={words}
            renderFunc={(word) => (
              <ListItem key={word.id}>
                <Box display="flex" alignItems="center">
                  <Box>
                    <Text fontSize="sm" fontWeight="bold">
                      <Text display="inline">{word.text}</Text>
                      <Text display="inline" ml="4">
                        {word.phonetic}
                      </Text>
                      <Button
                        display="inline-block"
                        size="xs"
                        colorScheme="teal"
                        variant="ghost"
                        ml="0.5"
                        onClick={() => {
                          playAudio(word);
                        }}
                      >
                        <Icon as={FiVolume2} />
                      </Button>
                    </Text>
                    <Text fontSize="sm">{word.engDefine}</Text>
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
            )}
          />
        </UnorderedList>
      </div>
    </Box>
  );
};

export default HomePage;
